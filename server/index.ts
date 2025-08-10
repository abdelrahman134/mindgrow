import express, { type Request, Response, NextFunction, RequestHandler } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import 'dotenv/config';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import { pool } from './db';

const app = express();

// Raw body logging middleware (must be before bodyParser)
app.use((req, res, next) => {
  const chunks: Buffer[] = [];
  
  // Only process if there's a body
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next();
  }
  
  // Capture request body chunks
  req.on('data', (chunk: Buffer) => chunks.push(chunk));
  
  // Log raw request body before JSON parsing
  req.on('end', () => {
    if (chunks.length > 0) {
      try {
        const rawBody = Buffer.concat(chunks).toString('utf8');
        console.log('=== RAW REQUEST BODY ===');
        console.log(rawBody);
        console.log('========================');
        (req as any).rawBody = rawBody;
      } catch (error) {
        console.error('Error processing raw body:', error);
      }
    }
  });
  
  // Continue processing
  next();
});

// Custom JSON parser to handle double-stringified JSON
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD' || !req.is('application/json')) {
    return next();
  }

  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    try {
      // First, try to parse the raw data
      req.body = JSON.parse(data);
    } catch (e) {
      try {
        // If that fails, try parsing it as a string that might be double-encoded
        if (data.startsWith('"') && data.endsWith('"')) {
          const unescaped = data.slice(1, -1).replace(/\\"/g, '"');
          req.body = JSON.parse(unescaped);
        } else {
          throw new Error('Invalid JSON');
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        return res.status(400).json({ 
          message: 'Invalid JSON format',
          error: parseError instanceof Error ? parseError.message : 'Unknown error'
        });
      }
    }
    next();
  });
});

// Configure URL-encoded parser for form data
app.use(express.urlencoded({ extended: false }));

// Session middleware (for email/password auth)
const PgStore = connectPg(session);
app.set('trust proxy', 1);
app.use(session({
  store: new PgStore({
    pool,
    tableName: 'sessions',
    createTableIfMissing: false
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: app.get('env') !== 'development',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  console.log('Starting server initialization...');
  
  try {
    console.log('Registering routes...');
    const server = await registerRoutes(app);
    console.log('Routes registered successfully');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error('Error in request handler:', { status, message, stack: err.stack });
      res.status(status).json({ message });
    });

    // Set up Vite in development mode
    if (app.get("env") === "development") {
      console.log('Setting up Vite in development mode...');
      await setupVite(app, server);
      console.log('Vite setup complete');
    } else {
      console.log('Setting up static file serving...');
      serveStatic(app);
    }

    // Start the server
    const port = 3000;
    console.log(`Starting server on port ${port}...`);
    
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      console.log(`Server is now listening on http://localhost:${port}`);
      log(`serving on port ${port}`);
    });

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      console.error('Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please close the other application or use a different port.`);
      }
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
