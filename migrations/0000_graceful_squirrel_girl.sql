CREATE TABLE "admin_users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "button_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_key" varchar(100) NOT NULL,
	"link_type" varchar(20) NOT NULL,
	"external_url" varchar(500),
	"internal_page" varchar(50),
	"section_id" varchar(100),
	"isactive" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20),
	"subject" varchar(200),
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"is_replied" boolean DEFAULT false,
	"admin_notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "content_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"value_ar" text,
	"value_en" text,
	"category" varchar(50) NOT NULL,
	"page" varchar(50) NOT NULL,
	"description" text,
	"icon" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "content_items_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "footer_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo_url" varchar(500),
	"logo_size" varchar(50) DEFAULT 'medium',
	"show_social_links" boolean DEFAULT true,
	"show_pages" jsonb,
	"copyright_text_ar" text,
	"copyright_text_en" text,
	"contact_phone" varchar(50),
	"contact_email" varchar(100),
	"contact_address_ar" text,
	"contact_address_en" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "header_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo_url" varchar(500),
	"logo_size" varchar(50) DEFAULT 'medium',
	"show_pages" jsonb,
	"show_language_switcher" boolean DEFAULT true,
	"button_url" varchar(500),
	"button_text_ar" varchar(100),
	"button_text_en" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"position" varchar(100) NOT NULL,
	"bio" text,
	"imageurl" varchar(500),
	"email" varchar(100),
	"phone" varchar(50),
	"order" integer DEFAULT 0,
	"isactive" boolean DEFAULT true,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");