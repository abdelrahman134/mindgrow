import {
  pgTable,
  text,
  varchar,
  timestamp,
  serial,
  jsonb,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Regular users table (if needed for future)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Content management table - stores all editable content
export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).unique().notNull(), // e.g., 'hero.title', 'about.mission'
  type: varchar("type", { length: 20 }).notNull(), // 'text', 'image', 'html'
  valueAr: text("value_ar"), // Arabic content
  valueEn: text("value_en"), // English content
  category: varchar("category", { length: 50 }).notNull(), // 'hero', 'about', 'features', etc.
  page: varchar("page", { length: 50 }).notNull(), // 'home', 'about', 'contact', etc.
  description: text("description"), // Description for admin
  icon: varchar("icon", { length: 50 }), // Icon name for UI
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  isReplied: boolean("is_replied").default(false),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team members for dynamic management
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  bio: text("bio"),
  imageUrl: varchar("imageurl", { length: 500 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  order: integer("order").default(0),
  isActive: boolean("isactive").default(true),
  createdAt: timestamp("createdat").defaultNow(),
  updatedAt: timestamp("updatedat").defaultNow(),
});

// Header settings management
export const headerSettings = pgTable("header_settings", {
  id: serial("id").primaryKey(),
  logoUrl: varchar("logo_url", { length: 500 }),
  logoSize: varchar("logo_size", { length: 50 }).default('medium'),
  showPages: jsonb("show_pages"),
  showLanguageSwitcher: boolean("show_language_switcher").default(true),
  buttonUrl: varchar("button_url", { length: 500 }),
  buttonTextAr: varchar("button_text_ar", { length: 100 }),
  buttonTextEn: varchar("button_text_en", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Footer settings management
export const footerSettings = pgTable("footer_settings", {
  id: serial("id").primaryKey(),
  logoUrl: varchar("logo_url", { length: 500 }),
  logoSize: varchar("logo_size", { length: 50 }).default('medium'),
  showSocialLinks: boolean("show_social_links").default(true),
  showPages: jsonb("show_pages"),
  copyrightTextAr: text("copyright_text_ar"),
  copyrightTextEn: text("copyright_text_en"),
  contactPhone: varchar("contact_phone", { length: 50 }),
  contactEmail: varchar("contact_email", { length: 100 }),
  contactAddressAr: text("contact_address_ar"),
  contactAddressEn: text("contact_address_en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Button links management
export const buttonLinks = pgTable("button_links", {
  id: serial("id").primaryKey(),
  contentKey: varchar("content_key", { length: 100 }).notNull(), // Reference to content item key
  linkType: varchar("link_type", { length: 20 }).notNull(), // 'external', 'internal', 'section'
  externalUrl: varchar("external_url", { length: 500 }),
  internalPage: varchar("internal_page", { length: 50 }), // 'home', 'about', 'contact', etc.
  sectionId: varchar("section_id", { length: 100 }), // '#hero', '#features', etc.
  isActive: boolean("isactive").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema definitions
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContentItemSchema = createInsertSchema(contentItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  isRead: true,
  isReplied: true,
  adminNotes: true,
  createdAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHeaderSettingsSchema = createInsertSchema(headerSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFooterSettingsSchema = createInsertSchema(footerSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertButtonLinkSchema = createInsertSchema(buttonLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const upsertAdminUserSchema = createInsertSchema(adminUsers);

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UpsertAdminUser = z.infer<typeof upsertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type HeaderSettings = typeof headerSettings.$inferSelect;
export type InsertHeaderSettings = z.infer<typeof insertHeaderSettingsSchema>;
export type FooterSettings = typeof footerSettings.$inferSelect;
export type InsertFooterSettings = z.infer<typeof insertFooterSettingsSchema>;
export type ButtonLink = typeof buttonLinks.$inferSelect;
export type InsertButtonLink = z.infer<typeof insertButtonLinkSchema>;
