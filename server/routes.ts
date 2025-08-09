// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { setupAuth, isAuthenticated } from "./replitAuth";
// import { 
//   insertContactSubmissionSchema,
//   insertContentItemSchema,
//   insertTeamMemberSchema,
//   insertHeaderSettingsSchema,
//   insertFooterSettingsSchema 
// } from "@shared/schema";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Auth middleware
//   await setupAuth(app);

//   // Auth routes
//   app.get('/api/auth/user',  async (req: any, res) => {
//     try {
//       const userId = req.user.claims.sub;
//       const user = await storage.getUser(userId);
//       res.json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Failed to fetch user" });
//     }
//   });

//   // ===== PUBLIC ROUTES =====
  
//   // Contact form submission
//   app.post('/api/contact', async (req, res) => {
//     try {
//       const validation = insertContactSubmissionSchema.safeParse(req.body);
//       if (!validation.success) {
//         return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
//       }

//       const submission = await storage.createContactSubmission(validation.data);
//       res.json({ message: "Thank you for your message! We will contact you soon.", id: submission.id });
//     } catch (error) {
//       console.error("Error creating contact submission:", error);
//       res.status(500).json({ message: "Failed to submit message" });
//     }
//   });

//   // ===== ADMIN ROUTES (Protected) =====
  
//   // Contact submissions management
//   app.get('/api/admin/contacts',  async (req, res) => {
//     try {
//       const submissions = await storage.getAllContactSubmissions();
//       res.json(submissions);
//     } catch (error) {
//       console.error("Error fetching contact submissions:", error);
//       res.status(500).json({ message: "Failed to fetch submissions" });
//     }
//   });

//   app.get('/api/admin/contacts/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const submission = await storage.getContactSubmission(id);
//       if (!submission) {
//         return res.status(404).json({ message: "Submission not found" });
//       }
//       res.json(submission);
//     } catch (error) {
//       console.error("Error fetching contact submission:", error);
//       res.status(500).json({ message: "Failed to fetch submission" });
//     }
//   });

//   app.patch('/api/admin/contacts/:id/read',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       await storage.markContactAsRead(id);
//       res.json({ message: "Marked as read" });
//     } catch (error) {
//       console.error("Error marking as read:", error);
//       res.status(500).json({ message: "Failed to update" });
//     }
//   });

//   app.patch('/api/admin/contacts/:id/reply',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const { notes } = req.body;
//       await storage.markContactAsReplied(id, notes);
//       res.json({ message: "Marked as replied" });
//     } catch (error) {
//       console.error("Error marking as replied:", error);
//       res.status(500).json({ message: "Failed to update" });
//     }
//   });

//   app.delete('/api/admin/contacts/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       await storage.deleteContactSubmission(id);
//       res.json({ message: "Submission deleted" });
//     } catch (error) {
//       console.error("Error deleting submission:", error);
//       res.status(500).json({ message: "Failed to delete" });
//     }
//   });

//   // Content management
//   app.get('/api/admin/content', async (req, res) => {
//     try {
//       const { page } = req.query;
//       const items = page 
//         ? await storage.getContentItemsByPage(page as string)
//         : await storage.getAllContentItems();
//       res.json(items);
//     } catch (error) {
//       console.error("Error fetching content items:", error);
//       res.status(500).json({ message: "Failed to fetch content" });
//     }
//   });

//   app.post('/api/admin/content',  async (req, res) => {
//     try {
//       const validation = insertContentItemSchema.safeParse(req.body);
//       if (!validation.success) {
//         return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
//       }

//       const item = await storage.createContentItem(validation.data);
//       res.json(item);
//     } catch (error) {
//       console.error("Error creating content item:", error);
//       res.status(500).json({ message: "Failed to create content" });
//     }
//   });

//   app.patch('/api/admin/content/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       if (isNaN(id)) {
//         return res.status(400).json({ message: "Invalid content ID" });
//       }
      
//       console.log(`Updating content ${id} with data:`, req.body);
//       const item = await storage.updateContentItem(id, req.body);
//       console.log('Content updated successfully:', item);
//       res.json(item);
//     } catch (error) {
//       console.error("Error updating content item:", error);
//       res.status(500).json({ 
//         message: "Failed to update content",
//         error: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   });

//   app.delete('/api/admin/content/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       await storage.deleteContentItem(id);
//       res.json({ message: "Content deleted" });
//     } catch (error) {
//       console.error("Error deleting content:", error);
//       res.status(500).json({ message: "Failed to delete" });
//     }
//   });

//   // Public team endpoint for website display
//   app.get('/api/team', async (req, res) => {
//     try {
//       const members = await storage.getAllTeamMembers();
//       res.json(members);
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//       res.status(500).json({ message: "Failed to fetch team" });
//     }
//   });

//   // Team management
//   app.get('/api/admin/team',  async (req, res) => {
//     try {
//       const members = await storage.getAllTeamMembers();
//       res.json(members);
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//       res.status(500).json({ message: "Failed to fetch team" });
//     }
//   });

//   app.post('/api/admin/team',  async (req, res) => {
//     try {
//       const validation = insertTeamMemberSchema.safeParse(req.body);
//       if (!validation.success) {
//         return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
//       }

//       const member = await storage.createTeamMember(validation.data);
//       res.json(member);
//     } catch (error) {
//       console.error("Error creating team member:", error);
//       res.status(500).json({ message: "Failed to create team member" });
//     }
//   });

//   app.patch('/api/admin/team/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const member = await storage.updateTeamMember(id, req.body);
//       res.json(member);
//     } catch (error) {
//       console.error("Error updating team member:", error);
//       res.status(500).json({ message: "Failed to update team member" });
//     }
//   });

//   app.delete('/api/admin/team/:id',  async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       await storage.deleteTeamMember(id);
//       res.json({ message: "Team member deleted" });
//     } catch (error) {
//       console.error("Error deleting team member:", error);
//       res.status(500).json({ message: "Failed to delete" });
//     }
//   });

//   // Header & Footer settings management
//   app.get('/api/admin/header-settings',  async (req, res) => {
//     try {
//       const settings = await storage.getHeaderSettings();
//       res.json(settings || {});
//     } catch (error) {
//       console.error("Error fetching header settings:", error);
//       res.status(500).json({ message: "Failed to fetch header settings" });
//     }
//   });

//   app.patch('/api/admin/header-settings',  async (req, res) => {
//     try {
//       const settings = await storage.updateHeaderSettings(req.body);
//       res.json(settings);
//     } catch (error) {
//       console.error("Error updating header settings:", error);
//       res.status(500).json({ message: "Failed to update header settings" });
//     }
//   });

//   app.get('/api/admin/footer-settings',  async (req, res) => {
//     try {
//       const settings = await storage.getFooterSettings();
//       res.json(settings || {});
//     } catch (error) {
//       console.error("Error fetching footer settings:", error);
//       res.status(500).json({ message: "Failed to fetch footer settings" });
//     }
//   });

//   app.patch('/api/admin/footer-settings',  async (req, res) => {
//     try {
//       const settings = await storage.updateFooterSettings(req.body);
//       res.json(settings);
//     } catch (error) {
//       console.error("Error updating footer settings:", error);
//       res.status(500).json({ message: "Failed to update footer settings" });
//     }
//   });

//   // Button Links routes
//   app.get('/api/admin/button-links',  async (req, res) => {
//     try {
//       const links = await storage.getAllButtonLinks();
//       res.json(links);
//     } catch (error) {
//       console.error("Error fetching button links:", error);
//       res.status(500).json({ message: "Failed to fetch button links" });
//     }
//   });

//   app.get('/api/admin/button-links/:contentKey',  async (req, res) => {
//     try {
//       const link = await storage.getButtonLinkByContentKey(req.params.contentKey);
//       res.json(link);
//     } catch (error) {
//       console.error("Error fetching button link:", error);
//       res.status(500).json({ message: "Failed to fetch button link" });
//     }
//   });

//   app.post('/api/admin/button-links',  async (req, res) => {
//     try {
//       const newLink = await storage.createButtonLink(req.body);
//       res.json(newLink);
//     } catch (error) {
//       console.error("Error creating button link:", error);
//       res.status(500).json({ message: "Failed to create button link" });
//     }
//   });

//   app.patch('/api/admin/button-links/:id',  async (req, res) => {
//     try {
//       const updatedLink = await storage.updateButtonLink(parseInt(req.params.id), req.body);
//       res.json(updatedLink);
//     } catch (error) {
//       console.error("Error updating button link:", error);
//       res.status(500).json({ message: "Failed to update button link" });
//     }
//   });

//   app.delete('/api/admin/button-links/:id',  async (req, res) => {
//     try {
//       await storage.deleteButtonLink(parseInt(req.params.id));
//       res.json({ success: true });
//     } catch (error) {
//       console.error("Error deleting button link:", error);
//       res.status(500).json({ message: "Failed to delete button link" });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }
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

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint to verify server is running updated code
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'Routes without authentication - v2'
    });
  });

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

  app.patch('/api/admin/content/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid content ID" });
      }
      
      console.log(`Updating content ${id} with data:`, req.body);
      const item = await storage.updateContentItem(id, req.body);
      console.log('Content updated successfully:', item);
      res.json(item);
    } catch (error) {
      console.error("Error updating content item:", error);
      res.status(500).json({ 
        message: "Failed to update content",
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

  app.patch('/api/admin/team/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid team member ID" });
      }
      
      console.log(`Updating team member ${id}:`, req.body);
      const member = await storage.updateTeamMember(id, req.body);
      console.log('Team member updated:', member);
      res.json(member);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(500).json({ 
        message: "Failed to update team member",
        error: error instanceof Error ? error.message : 'Unknown error'
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