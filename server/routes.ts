
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema,
  insertContentItemSchema,
  insertTeamMemberSchema,
  insertHeaderSettingsSchema,
  insertFooterSettingsSchema 
} from "@shared/schema";
import bcrypt from 'bcrypt';

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint to verify server is running updated code
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'Routes without authentication - v2'
    });
  });

  // Auth session endpoints (email/password)
  app.get('/api/auth/user', async (req: any, res) => {
    if (req.session?.user) {
      return res.json({ id: req.session.user.id, email: req.session.user.email });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  });

  app.post('/api/login', async (req: any, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const user = await storage.getAuthUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const ok = await bcrypt.compare(password, (user as any).password);
      if (!ok) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.session.user = { id: (user as any).id, email: (user as any).username };
      return res.json({ success: true });
    } catch (e) {
      console.error('Login error:', e);
      return res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/logout', (req: any, res) => {
    req.session?.destroy(() => {
      res.json({ success: true });
    });
  });
  app.get('/api/logout', (req: any, res) => {
    req.session?.destroy(() => {
      res.json({ success: true });
    });
  });

  // Bootstrap: create first user if none exists
  app.post('/api/setup/first-user', async (req: any, res) => {
    try {
      const existing = await storage.listAuthUsers();
      if (existing.length > 0) {
        return res.status(400).json({ message: 'Users already exist' });
      }
      // Optional production guard via secret
      if (app.get('env') !== 'development') {
        const provided = req.body?.secret;
        const expected = process.env.SETUP_SECRET;
        if (!expected || provided !== expected) {
          return res.status(403).json({ message: 'Forbidden' });
        }
      }
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      const hash = await bcrypt.hash(password, 10);
      const created = await storage.createAuthUser(email, hash);
      return res.json({ id: created.id, email: created.email });
    } catch (e) {
      console.error('Bootstrap create user error:', e);
      return res.status(500).json({ message: 'Failed to create first user' });
    }
  });

  const requireAuth = (req: any, res: any, next: any) => {
    if (req.session?.user) return next();
    return res.status(401).json({ message: 'Unauthorized' });
  };

  // ===== PUBLIC ROUTES =====
  
  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      console.log('Contact submission received:', req.body);
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        console.log('Validation failed:', validation.error.errors);
        return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
      }

      const submission = await storage.createContactSubmission(validation.data);
      console.log('Contact submission created:', submission.id);
      res.json({ message: "Thank you for your message! We will contact you soon.", id: submission.id });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ 
        message: "Failed to submit message",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // ===== ADMIN ROUTES (No longer protected) =====
  // Protect admin routes
  // app.use('/api/admin', requireAuth);

  // Contact submissions management
  app.get('/api/admin/contacts', async (req, res) => {
    try {
      console.log('Fetching all contact submissions');
      const submissions = await storage.getAllContactSubmissions();
      console.log(`Found ${submissions.length} contact submissions`);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        message: "Failed to fetch submissions",
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      });
    }
  });

  app.get('/api/admin/contacts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`Fetching contact submission ${id}`);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }
      
      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        console.log(`Contact submission ${id} not found`);
        return res.status(404).json({ message: "Submission not found" });
      }
      
      console.log(`Contact submission ${id} found`);
      res.json(submission);
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({ 
        message: "Failed to fetch submission",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch('/api/admin/contacts/:id/read', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`Marking contact ${id} as read`);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }
      
      await storage.markContactAsRead(id);
      res.json({ message: "Marked as read" });
    } catch (error) {
      console.error("Error marking as read:", error);
      res.status(500).json({ 
        message: "Failed to update",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch('/api/admin/contacts/:id/reply', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { notes } = req.body;
      console.log(`Marking contact ${id} as replied with notes:`, notes);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }
      
      await storage.markContactAsReplied(id, notes);
      res.json({ message: "Marked as replied" });
    } catch (error) {
      console.error("Error marking as replied:", error);
      res.status(500).json({ 
        message: "Failed to update",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.delete('/api/admin/contacts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      console.log(`Deleting contact submission ${id}`);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }
      
      await storage.deleteContactSubmission(id);
      res.json({ message: "Submission deleted" });
    } catch (error) {
      console.error("Error deleting submission:", error);
      res.status(500).json({ 
        message: "Failed to delete",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Content management
  app.get('/api/admin/content', async (req, res) => {
    try {
      console.log("=== Content API Debug ===");
      console.log("Query params:", req.query);
      console.log("Page filter:", req.query.page);
      
      const { page } = req.query;
      
      if (page) {
        console.log(`Fetching content items for page: ${page}`);
        const items = await storage.getContentItemsByPage(page as string);
        console.log(`Found ${items.length} content items for page ${page}`);
        res.json(items);
      } else {
        console.log("Fetching all content items");
        const items = await storage.getAllContentItems();
        console.log(`Found ${items.length} total content items`);
        res.json(items);
      }
    } catch (error) {
      console.error("=== Content API Error ===");
      console.error("Error details:", error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      res.status(500).json({ 
        message: "Failed to fetch content",
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      });
    }
  });

  app.post('/api/admin/content', async (req, res) => {
    try {
      console.log('Creating content item:', req.body);
      const validation = insertContentItemSchema.safeParse(req.body);
      if (!validation.success) {
        console.log('Content validation failed:', validation.error.errors);
        return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
      }

      const item = await storage.createContentItem(validation.data);
      console.log('Content item created:', item.id);
      res.json(item);
    } catch (error) {
      console.error("Error creating content item:", error);
      res.status(500).json({ 
        message: "Failed to create content",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });


  app.delete('/api/admin/content/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid content ID" });
      }
      
      console.log(`Deleting content item ${id}`);
      await storage.deleteContentItem(id);
      res.json({ message: "Content deleted" });
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).json({ 
        message: "Failed to delete",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Public team endpoint for website display
  app.get('/api/team', async (req, res) => {
    try {
      console.log('Fetching team members (public endpoint)');
      const members = await storage.getAllTeamMembers();
      console.log(`Found ${members.length} active team members`);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ 
        message: "Failed to fetch team",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Team management
  app.get('/api/admin/team', async (req, res) => {
    try {
      console.log('Fetching team members (admin endpoint)');
      const members = await storage.getAllTeamMembers();
      console.log(`Found ${members.length} team members`);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ 
        message: "Failed to fetch team",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/admin/team', async (req, res) => {
    try {
      console.log('Creating team member:', req.body);
      const validation = insertTeamMemberSchema.safeParse(req.body);
      if (!validation.success) {
        console.log('Team member validation failed:', validation.error.errors);
        return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
      }

      const member = await storage.createTeamMember(validation.data);
      console.log('Team member created:', member.id);
      res.json(member);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(500).json({ 
        message: "Failed to create team member",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Update content item by ID
  app.patch('/api/admin/content/:id', async (req, res) => {
    console.log('=== PATCH /api/admin/content/:id ===');
    
    // Parse and validate ID first
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      console.error('Invalid content ID:', req.params.id);
      return res.status(400).json({ 
        success: false,
        message: "Invalid content ID",
        details: { id: req.params.id }
      });
    }

    // Log request details for debugging
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    
    // Get the raw body that was captured by our middleware
    const rawBody = (req as any).rawBody;
    console.log('Raw body type:', typeof rawBody);
    console.log('Raw body:', rawBody);
    console.log('Parsed body type:', typeof req.body);
    console.log('Parsed body:', JSON.stringify(req.body, null, 2));
    
    try {
      // Initialize updateData as an empty object
      let updateData: Record<string, any> = {};
      
      // Helper function to safely parse JSON, including double-stringified JSON
      const safeJsonParse = (str: string, depth = 0): any => {
        if (depth > 2) return str; // Prevent infinite recursion
        
        // If input is not a string, return as is
        if (typeof str !== 'string') return str;
        
        try {
          // First try to parse as JSON
          const parsed = JSON.parse(str);
          // If the parsed result is a string, it might be double-stringified
          if (typeof parsed === 'string') {
            return safeJsonParse(parsed, depth + 1);
          }
          return parsed;
        } catch (e) {
          // If parsing fails, try to clean up the string and try again
          if (depth === 0) {
            let cleanString = str.trim();
            // Remove surrounding quotes if present
            if (cleanString.startsWith('"') && cleanString.endsWith('"')) {
              cleanString = cleanString.slice(1, -1);
              // Unescape any escaped quotes
              cleanString = cleanString.replace(/\\"/g, '"');
              const result = safeJsonParse(cleanString, depth + 1);
              if (result !== cleanString) return result; // Only return if we made progress
            }
          }
          console.error('JSON parse error at depth', depth, ':', e);
          return str; // Return original string if we can't parse it
        }
      };
      
      // Handle different body formats
      if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        // Case 1: Body is already parsed by express.json()
        console.log('Using parsed request body from express.json()');
        updateData = { ...req.body };
      } else if (typeof rawBody === 'string' && rawBody.trim() !== '') {
        // Case 2: Raw body is a string that needs parsing
        console.log('Processing raw body as string');
        const parsed = safeJsonParse(rawBody);
        if (parsed && typeof parsed === 'object') {
          updateData = parsed;
        } else {
          // Try one more time with direct parsing
          try {
            const directParse = JSON.parse(rawBody);
            if (directParse && typeof directParse === 'object') {
              updateData = directParse;
            } else {
              throw new Error('Parsed value is not an object');
            }
          } catch (parseError) {
            console.error('Failed to parse request body as JSON:', parseError);
            return res.status(400).json({
              success: false,
              message: 'Invalid JSON in request body',
              details: {
                rawBody: rawBody.substring(0, 200) + (rawBody.length > 200 ? '...' : ''),
                parseError: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
              }
            });
          }
        }
      } else if (typeof rawBody === 'object' && rawBody !== null) {
        // Case 3: Raw body is already an object
        console.log('Using raw body as object');
        updateData = { ...rawBody };
      }
      
      // If we still don't have data, return an error
      if (Object.keys(updateData).length === 0) {
        console.error('No valid data found in request body');
        return res.status(400).json({
          success: false,
          message: 'No valid data found in request body',
          details: {
            rawBodyType: typeof rawBody,
            parsedBodyType: req.body ? typeof req.body : 'undefined',
            rawBodySample: typeof rawBody === 'string' ? rawBody.substring(0, 200) : 'Not a string'
          }
        });
      }
      
      console.log('Processed update data:', JSON.stringify(updateData, null, 2));
      
      try {
        // Ensure we only update valid fields
        const validFields = ['key', 'type', 'valueAr', 'valueEn', 'category', 'page', 'description', 'icon'];
        const filteredUpdateData = Object.keys(updateData)
          .filter(key => validFields.includes(key))
          .reduce((obj, key) => {
            if (updateData[key] !== undefined) {
              obj[key] = updateData[key];
            }
            return obj;
          }, {} as Record<string, any>);
        
        if (Object.keys(filteredUpdateData).length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No valid fields to update',
            validFields,
            receivedFields: Object.keys(updateData)
          });
        }
        
        console.log('Filtered update data:', filteredUpdateData);
        
        // Perform the update
        const updatedItem = await storage.updateContentItem(id, filteredUpdateData);
        
        if (!updatedItem) {
          console.error('Update operation returned null/undefined');
          return res.status(404).json({ 
            success: false,
            message: 'Content item not found or update failed' 
          });
        }
        
        console.log('Successfully updated content item:', updatedItem);
        return res.json({
          success: true,
          data: updatedItem
        });
        
      } catch (storageError) {
        console.error('Storage error during update:', storageError);
        const errorMessage = storageError instanceof Error ? storageError.message : 'Unknown error during update';
        return res.status(500).json({
          success: false,
          message: 'Failed to update content item',
          error: errorMessage
        });
      }
    } catch (error) {
      console.error("Error updating content item:", error);
      res.status(500).json({ 
        message: "Failed to update content item",
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      });
    }
  });

  app.delete('/api/admin/team/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid team member ID" });
      }
      
      console.log(`Deleting team member ${id}`);
      await storage.deleteTeamMember(id);
      res.json({ message: "Team member deleted" });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ 
        message: "Failed to delete",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Users (email/password) management
  app.get('/api/admin/users', async (_req, res) => {
    const users = await storage.listAuthUsers();
    res.json(users);
  });

  app.post('/api/admin/users', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
      const existing = await storage.getAuthUserByEmail(email);
      if (existing) return res.status(400).json({ message: 'Email already exists' });
      const hash = await bcrypt.hash(password, 10);
      const created = await storage.createAuthUser(email, hash);
      res.json(created);
    } catch (e) {
      console.error('Create user error:', e);
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  app.patch('/api/admin/users/:id/password', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { password } = req.body || {};
      if (!password || isNaN(id)) return res.status(400).json({ message: 'Invalid input' });
      const hash = await bcrypt.hash(password, 10);
      await storage.updateAuthUserPassword(id, hash);
      res.json({ success: true });
    } catch (e) {
      console.error('Update password error:', e);
      res.status(500).json({ message: 'Failed to update password' });
    }
  });

  app.delete('/api/admin/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: 'Invalid id' });
      await storage.deleteAuthUser(id);
      res.json({ success: true });
    } catch (e) {
      console.error('Delete user error:', e);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });

  // Header & Footer settings management
  app.get('/api/admin/header-settings', async (req, res) => {
    try {
      console.log('Fetching header settings');
      const settings = await storage.getHeaderSettings();
      console.log('Header settings:', settings ? 'found' : 'not found');
      res.json(settings || {});
    } catch (error) {
      console.error("Error fetching header settings:", error);
      res.status(500).json({ 
        message: "Failed to fetch header settings",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch('/api/admin/header-settings', async (req, res) => {
    try {
      console.log('Updating header settings:', req.body);
      const settings = await storage.updateHeaderSettings(req.body);
      console.log('Header settings updated:', settings);
      res.json(settings);
    } catch (error) {
      console.error("Error updating header settings:", error);
      res.status(500).json({ 
        message: "Failed to update header settings",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get('/api/admin/footer-settings', async (req, res) => {
    try {
      console.log('Fetching footer settings');
      const settings = await storage.getFooterSettings();
      console.log('Footer settings:', settings ? 'found' : 'not found');
      res.json(settings || {});
    } catch (error) {
      console.error("Error fetching footer settings:", error);
      res.status(500).json({ 
        message: "Failed to fetch footer settings",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch('/api/admin/footer-settings', async (req, res) => {
    try {
      console.log('Updating footer settings:', req.body);
      const settings = await storage.updateFooterSettings(req.body);
      console.log('Footer settings updated:', settings);
      res.json(settings);
    } catch (error) {
      console.error("Error updating footer settings:", error);
      res.status(500).json({ 
        message: "Failed to update footer settings",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Button Links routes with enhanced debugging
  app.get('/api/admin/button-links', async (req, res) => {
    try {
      console.log('=== Button Links API Debug ===');
      console.log('Fetching all button links');
      const links = await storage.getAllButtonLinks();
      console.log(`Found ${links.length} active button links`);
      res.json(links);
    } catch (error) {
      console.error("=== Button Links API Error ===");
      console.error("Error fetching button links:", error);
      res.status(500).json({ 
        message: "Failed to fetch button links",
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      });
    }
  });

  app.get('/api/admin/button-links/:contentKey', async (req, res) => {
    try {
      console.log('=== Button Link by ContentKey Debug ===');
      console.log("Content key requested:", req.params.contentKey);
      console.log("Full URL:", req.url);
      console.log("Method:", req.method);
      console.log("Headers:", req.headers);
      
      const contentKey = req.params.contentKey;
      console.log(`Fetching button link for contentKey: ${contentKey}`);
      
      const link = await storage.getButtonLinkByContentKey(contentKey);
      console.log("Button link result:", link ? 'found' : 'not found');
      
      if (link) {
        console.log("Link details:", { id: link.id, contentKey: link.contentKey, isActive: link.isActive });
      }
      
      res.json(link);
    } catch (error) {
      console.error("=== Button Link by ContentKey Error ===");
      console.error("Error fetching button link:", error);
      console.error("Error message:", error instanceof Error ? error.message : 'Unknown error');
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      
      res.status(500).json({ 
        message: "Failed to fetch button link",
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      });
    }
  });

  app.post('/api/admin/button-links', async (req, res) => {
    try {
      console.log('Creating button link:', req.body);
      const newLink = await storage.createButtonLink(req.body);
      console.log('Button link created:', newLink.id);
      res.json(newLink);
    } catch (error) {
      console.error("Error creating button link:", error);
      res.status(500).json({ 
        message: "Failed to create button link",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch('/api/admin/button-links/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid button link ID" });
      }
      
      console.log(`Updating button link ${id}:`, req.body);
      const updatedLink = await storage.updateButtonLink(id, req.body);
      console.log('Button link updated:', updatedLink);
      res.json(updatedLink);
    } catch (error) {
      console.error("Error updating button link:", error);
      res.status(500).json({ 
        message: "Failed to update button link",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.delete('/api/admin/button-links/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid button link ID" });
      }
      
      console.log(`Deleting button link ${id}`);
      await storage.deleteButtonLink(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting button link:", error);
      res.status(500).json({ 
        message: "Failed to delete button link",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create HTTP server and return it
  const httpServer = createServer(app);
  console.log('[registerRoutes] Routes initialized successfully');
  return httpServer;
}