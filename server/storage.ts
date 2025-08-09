import {
  users,
  adminUsers,
  contentItems,
  contactSubmissions,
  teamMembers,
  headerSettings,
  footerSettings,
  buttonLinks,
  type User,
  type InsertUser,
  type UpsertAdminUser,
  type AdminUser,
  type ContentItem,
  type InsertContentItem,
  type ContactSubmission,
  type InsertContactSubmission,
  type TeamMember,
  type InsertTeamMember,
  type HeaderSettings,
  type InsertHeaderSettings,
  type FooterSettings,
  type InsertFooterSettings,
  type ButtonLink,
  type InsertButtonLink,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<AdminUser | undefined>;
  upsertUser(user: UpsertAdminUser): Promise<AdminUser>;

  // Content management
  getAllContentItems(): Promise<ContentItem[]>;
  getContentItemsByPage(page: string): Promise<ContentItem[]>;
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  updateContentItem(id: number, item: Partial<InsertContentItem>): Promise<ContentItem>;
  deleteContentItem(id: number): Promise<void>;

  // Contact submissions
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactAsRead(id: number): Promise<void>;
  markContactAsReplied(id: number, notes?: string): Promise<void>;
  deleteContactSubmission(id: number): Promise<void>;

  // Team management
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;

  // Header & Footer management
  getHeaderSettings(): Promise<HeaderSettings | undefined>;
  updateHeaderSettings(settings: Partial<InsertHeaderSettings>): Promise<HeaderSettings>;
  getFooterSettings(): Promise<FooterSettings | undefined>;
  updateFooterSettings(settings: Partial<InsertFooterSettings>): Promise<FooterSettings>;

  // Button Links management
  getAllButtonLinks(): Promise<ButtonLink[]>;
  getButtonLinkByContentKey(contentKey: string): Promise<ButtonLink | undefined>;
  createButtonLink(link: InsertButtonLink): Promise<ButtonLink>;
  updateButtonLink(id: number, link: Partial<InsertButtonLink>): Promise<ButtonLink>;
  deleteButtonLink(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return user;
  }

  async upsertUser(userData: UpsertAdminUser): Promise<AdminUser> {
    const [user] = await db
      .insert(adminUsers)
      .values(userData)
      .onConflictDoUpdate({
        target: adminUsers.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Content management
  async getAllContentItems(): Promise<ContentItem[]> {
    return await db.select().from(contentItems).orderBy(contentItems.page, contentItems.category, contentItems.key);
  }

  async getContentItemsByPage(page: string): Promise<ContentItem[]> {
    return await db.select().from(contentItems).where(eq(contentItems.page, page)).orderBy(contentItems.category, contentItems.key);
  }

  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const [created] = await db.insert(contentItems).values(item).returning();
    return created;
  }

  async updateContentItem(id: number, item: Partial<InsertContentItem>): Promise<ContentItem> {
    const [updated] = await db
      .update(contentItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(contentItems.id, id))
      .returning();
    return updated;
  }

  async deleteContentItem(id: number): Promise<void> {
    await db.delete(contentItems).where(eq(contentItems.id, id));
  }

  // Contact submissions
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db.insert(contactSubmissions).values(submission).returning();
    return created;
  }

  async markContactAsRead(id: number): Promise<void> {
    await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
  }

  async markContactAsReplied(id: number, notes?: string): Promise<void> {
    await db.update(contactSubmissions)
      .set({ isReplied: true, adminNotes: notes })
      .where(eq(contactSubmissions.id, id));
  }

  async deleteContactSubmission(id: number): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  // Team management
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).where(eq(teamMembers.isActive, true)).orderBy(teamMembers.order);
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updated] = await db
      .update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updated;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.update(teamMembers).set({ isActive: false }).where(eq(teamMembers.id, id));
  }

  // Header & Footer management
  async getHeaderSettings(): Promise<HeaderSettings | undefined> {
    const [settings] = await db.select().from(headerSettings).limit(1);
    return settings;
  }

  async updateHeaderSettings(settingsData: Partial<InsertHeaderSettings>): Promise<HeaderSettings> {
    const existingSettings = await this.getHeaderSettings();

    if (existingSettings) {
      const [updated] = await db
        .update(headerSettings)
        .set(settingsData)
        .where(eq(headerSettings.id, existingSettings.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(headerSettings)
        .values(settingsData)
        .returning();
      return created;
    }
  }

  async getFooterSettings(): Promise<FooterSettings | undefined> {
    const [settings] = await db.select().from(footerSettings).limit(1);
    return settings;
  }

  async updateFooterSettings(settingsData: Partial<InsertFooterSettings>): Promise<FooterSettings> {
    const existingSettings = await this.getFooterSettings();

    if (existingSettings) {
      const [updated] = await db
        .update(footerSettings)
        .set(settingsData)
        .where(eq(footerSettings.id, existingSettings.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(footerSettings)
        .values(settingsData)
        .returning();
      return created;
    }
  }

  // Button Links management
  async getAllButtonLinks(): Promise<ButtonLink[]> {
    return await db.select().from(buttonLinks).where(eq(buttonLinks.isActive, true));
  }

  async getButtonLinkByContentKey(contentKey: string): Promise<ButtonLink | undefined> {
    const [link] = await db.select().from(buttonLinks)
      .where(eq(buttonLinks.contentKey, contentKey));
    return link;
  }

  async createButtonLink(linkData: InsertButtonLink): Promise<ButtonLink> {
    const [link] = await db
      .insert(buttonLinks)
      .values(linkData)
      .returning();
    return link;
  }

  async updateButtonLink(id: number, linkData: Partial<InsertButtonLink>): Promise<ButtonLink> {
    const [link] = await db
      .update(buttonLinks)
      .set(linkData)
      .where(eq(buttonLinks.id, id))
      .returning();
    return link;
  }

  async deleteButtonLink(id: number): Promise<void> {
    await db
      .update(buttonLinks)
      .set({ isActive: false })
      .where(eq(buttonLinks.id, id));
  }
}

export const storage = new DatabaseStorage();