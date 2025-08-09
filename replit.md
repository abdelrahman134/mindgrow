# MindGrow - Children's Task and Rewards Platform

## Overview

MindGrow is a comprehensive children's task and rewards platform that encourages responsibility through interactive tasks and a smart financial rewards system. The platform consists of three main applications: a family app (for parents and children), a seller app (for merchants), and an admin dashboard for management and monitoring.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors
- **Build Tool**: Vite with modern development tooling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **Middleware**: Custom logging and error handling
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod for runtime type checking

## Key Components

### 1. User Interface Components
- **Navigation**: Responsive navigation with mobile support
- **Hero Section**: Brand introduction with call-to-action
- **Features Overview**: Three main application showcases
- **Detailed Features**: In-depth feature explanations
- **Technology Stack**: Development process visualization
- **Pricing**: Flexible packages with Arabic content
- **Trust Indicators**: Credibility and quality assurance
- **Contact Form**: Lead generation with validation

### 2. Form Handling & Validation
- **Contact Form**: Comprehensive form with validation using Zod
- **Multi-field Support**: Full name, email, phone, company, package selection
- **Privacy Compliance**: Required privacy policy acceptance
- **Error Handling**: Client and server-side validation

### 3. Styling System
- **Brand Colors**: Custom CSS variables for MindGrow brand identity
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Component Library**: Complete UI component system with variants
- **RTL Support**: Right-to-left text direction for Arabic content

## Data Flow

### 1. Client-Server Communication
- API requests handled through centralized query client
- Form submissions with validation pipeline
- Error handling with user-friendly messages
- Success notifications through toast system

### 2. State Management
- React Query for server state caching and synchronization
- Local state management with React hooks
- Form state with controlled components

### 3. Content Management
- Static content with Arabic language support
- Asset management through Vite's asset handling
- Brand assets and images properly imported

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Form Handling**: React Hook Form, Hookform Resolvers
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Database**: Drizzle ORM, Neon database connector
- **Development**: tsx for TypeScript execution, various Replit plugins

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Environment variable configuration for DATABASE_URL
- **Asset Handling**: Vite handles static assets and imports
- **Error Overlays**: Runtime error modal for development

### Production Build
- **Frontend**: Vite builds to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend in production
- **Environment**: NODE_ENV-based configuration

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Neon serverless PostgreSQL
- **Schema**: Shared schema between frontend and backend

## Changelog

Changelog:
- July 09, 2025. Complete team management system implementation:
  - Developed comprehensive team management interface in admin dashboard
  - Added full CRUD operations for team members (create, read, update, delete)
  - Integrated dynamic team data fetching in "About Us" page
  - Team members now load from database with fallback to default members
  - Admin can manage: name, position, bio, image URL, email, phone, active status
  - Real-time image preview in admin form with error handling
  - Professional team member cards with hover effects and action buttons
  - Loading states and empty states for better user experience
  - Team management fully operational with immediate website updates
- July 09, 2025. Fixed critical content synchronization issue between admin dashboard and home page:
  - Identified mismatch between admin dashboard content and actual home page (ChildrenHome component)
  - Deleted old content and regenerated 32 new content items matching actual home page structure
  - Content now properly organized into 4 categories: hero, features, main_features, activities
  - Admin dashboard content management now accurately reflects live website content
  - All home page text elements can now be edited through admin interface
- July 09, 2025. Added comprehensive button link management system:
  - Created new button_links database table with support for external URLs, internal pages, and page sections
  - Added full CRUD operations in storage layer for button link management
  - Implemented API routes for creating, reading, updating, and deleting button links
  - Enhanced admin dashboard with ButtonLinkManager component for managing button actions
  - Added button link management directly in content management interface for button-type items
  - System supports three link types: external (URLs), internal (app pages), and section (page anchors)
  - All button links are properly validated and can be activated/deactivated as needed
- July 09, 2025. Added contact page content management to admin dashboard:
  - Created comprehensive contact page content management system in admin dashboard
  - Added 46 content items for contact page with 5 main categories (hero, info, form, faq, ways)
  - Implemented organized accordion interface for managing contact page content
  - All content is fully editable with Arabic/English support and icon selection
  - Contact page content includes contact information, form fields, FAQs, and contact methods
  - Enhanced admin dashboard with contact section including proper categorization
  - Fixed HTTP method error in apiRequest function for proper PATCH requests
- July 09, 2025. Added about us page content management to admin dashboard:
  - Created comprehensive about us page content management system in admin dashboard
  - Added 40 content items for about us page with 7 main categories (hero, mission, vision, values, story, team, stats)
  - Implemented organized accordion interface for managing about us page content
  - All content is fully editable with Arabic/English support and icon selection
  - About us page content includes company mission, vision, values, story, team information, and statistics
  - Enhanced admin dashboard with about us section including proper categorization
- July 09, 2025. Complete teachers page content management system reconstruction:
  - Deleted old teachers content (72 items) and recreated fresh content (62 items)
  - Organized into 7 main sections matching actual website structure:
    1. البنر الرئيسي - Hero Section (4 items)
    2. أدوات تعليمية متطورة - Advanced Educational Tools (10 items)
    3. كيف يعمل مايندجرو؟ - How MindGrow Works (10 items)
    4. المواد الدراسية المتاحة - Available Subjects (14 items)
    5. لماذا تختار مايندجرو - Why Choose MindGrow (8 items)
    6. نجاح المعلمين معنا - Teacher Success Stories (6 items)
    7. متطلبات التسجيل - Registration Requirements (10 items)
  - Fixed getCategoryOrder function to display all 7 sections properly
  - Added proper Arabic/English section titles and appropriate icons
  - Admin dashboard now displays 100% accurate content matching actual teachers page
- July 09, 2025. Added sellers page content management to admin dashboard:
  - Created comprehensive sellers page content management system in admin dashboard
  - Added 32 content items for sellers page with 3 main categories (hero, features, benefits)
  - Implemented organized accordion interface for managing sellers page content
  - All content is fully editable with Arabic/English support and icon selection
  - Sellers page content includes features for business growth, customer access, and analytics
- July 09, 2025. Fixed critical content synchronization issue - admin edits now apply to live website:
  - RESOLVED: Fixed the core issue where admin dashboard edits weren't showing on website
  - Updated all pages to use dynamic content from database instead of static translations
  - Pages now use getContent() function with translation fallback system
  - All pages confirmed to use dynamic content: home, parents, teachers, sellers, about, contact
  - Admin dashboard edits now immediately reflect on the live website
  - Content management system now fully functional with real-time updates
- July 06, 2025. Initial setup
- July 06, 2025. Updated design to match user preferences:
  - Redesigned Hero section with colorful gradient background and MindGrow logo
  - Removed pricing section per user request
  - Enhanced all sections with modern, colorful card designs
  - Updated navigation to remove pricing links
  - Improved contact form with better visual styling
  - Made design more kid-friendly with gradients and rounded corners
- July 06, 2025. Created multi-page application structure:
  - Created dedicated children's homepage with colorful design and animations
  - Added two new sections: "Super Powers" and "Creative Challenges"
  - Implemented shared Navigation and Footer components
  - Created specialized pages for parents, sellers, teachers, and about us
  - Added RTL support throughout all pages
  - Integrated navigation between all pages with active state indicators
- July 06, 2025. Complete redesign based on user specifications:
  - Updated brand colors to include primary orange (#fbac25) matching logo
  - Redesigned children's homepage with hero banner (text right, vector image left)
  - Added custom SVG illustration for child playing with toys and educational elements
  - Created comprehensive contact page with form and FAQ section
  - Updated navigation and footer to include all pages
  - Enhanced responsive design for mobile devices
  - Applied consistent color scheme throughout all components
- July 06, 2025. Major content update - changed from educational app to task & rewards system:
  - Corrected content to reflect that MindGrow is a task and rewards system, not a game
  - Updated children's homepage to focus on daily tasks and financial rewards
  - Created specialized pages for parents, teachers, sellers with relevant features
  - Added comprehensive About Us page with mission, vision, team, and story
  - All content now accurately represents the application as task management system
  - Maintained colorful, child-friendly design while correcting functionality focus
- July 06, 2025. Brand name styling update:
  - Changed all "Mind Grow" references to "مايندجرو" with colorful letter styling
  - Applied custom colors matching the logo to each letter of the brand name
  - Created reusable ColoredBrandName component for consistent styling
  - Updated brand representation across all pages (children, parents, sellers, teachers, about us)
  - Applied Tajawal font throughout the entire website for better Arabic readability
- July 06, 2025. Navigation and visual improvements:
  - Updated logo with new design file and optimized sizing
  - Replaced banner image with new child illustration featuring educational elements
  - Replaced login button with smart app download functionality (auto-detects iOS/Android)
  - Implemented dynamic color system for navigation buttons based on current page
  - Added purple color to brand palette for complete color coverage
  - Removed emoji icons from section headers for cleaner, professional appearance
  - Updated task cards with professional Lucide icons instead of emojis
  - Enhanced task descriptions with detailed, balanced content
  - Removed action buttons from task cards for information-focused design
- July 08, 2025. Mobile optimization for children's homepage:
  - Added mobile-specific hero image for better mobile experience
  - Optimized text sizing and icon sizing for mobile devices in features section
  - Made feature descriptions single-line on mobile instead of multi-line
  - Improved mobile text alignment and spacing for better readability
  - Fixed JSX structure issues that were causing build failures
  - Children's homepage now fully optimized for both desktop and mobile views
- July 08, 2025. Logo responsive design improvements:
  - Fixed logo compression issues on tablet and medium screen sizes
  - Added responsive logo sizing with object-contain to maintain aspect ratio
  - Optimized navigation bar spacing and button sizes for tablet screens
  - Applied responsive sizing to logos in header, hero section, and footer
  - Logo now displays clearly across all device sizes without distortion
- July 08, 2025. Navigation optimization and final polish:
  - Created legal pages (privacy policy, terms of service, service agreement) based on Qatar laws
  - Added floating WhatsApp button to all pages with business contact number
  - Updated all contact information across the site to Qatar details (+974-6601-8814, support@mindgrow.pro)
  - Converted download button to elegant icon for tablet/medium screens to prevent layout overflow
  - Full responsive design completed with professional legal documentation
  - All pages now include consistent branding, contact information, and navigation
- July 08, 2025. Comprehensive English language implementation:
  - Created complete bilingual system with Arabic (RTL) and English (LTR) support
  - Added language provider and switcher components with localStorage persistence
  - Implemented comprehensive translation system with 150+ text keys
  - Added language switcher to navigation (desktop and mobile)
  - Full responsive design maintains layout integrity in both languages
  - Professional English translations for all UI text, features, and content
  - Automatic document direction switching based on selected language
- July 09, 2025. Enhanced RTL/LTR layout optimization for children's homepage:
  - Fixed hero section image flipping and positioning based on language direction
  - Corrected question mark positioning in "How Does the MindGrow?" title
  - Implemented proper animation positioning for feature cards (top corners flip based on language)
  - Added responsive speech bubble positioning for character animations
  - Enhanced element spacing and directional flow for both Arabic and English layouts
  - Footer fully translated with proper RTL/LTR element positioning
- July 09, 2025. Complete Arabic localization of admin dashboard:
  - Converted entire admin dashboard interface to Arabic as primary language
  - Added RTL direction support for all admin panels and forms
  - Implemented organized content sections with collapsible accordion system
  - Enhanced content management with proper Arabic/English editing interface
  - Added support for image and icon management in content editor
  - Organized homepage content sections by appearance order: Hero → Features → Main Features → Activities
  - Hero section opens by default, other sections collapsible for better organization
  - Improved error handling and success messages in Arabic
  - Added main "Home Page Content" accordion wrapper that starts closed by default
  - Created expandable structure ready for future page content management
  - Enhanced UI with proper Arabic titles and descriptions for all content sections

## User Preferences

Preferred communication style: Simple, everyday language.