# replit.md

## Overview

This is a full-stack web application for Hamptons Auto Club, a luxury car detailing business. The project uses a modern tech stack with React/TypeScript frontend, Express backend, and PostgreSQL database with Drizzle ORM. The application features a responsive website with contact form functionality and a premium Hamptons luxury aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom Hamptons-themed color palette
- **UI Components**: Radix UI components via shadcn/ui for consistent, accessible design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and scroll-triggered animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod for schema validation
- **Development**: Hot reload with Vite integration

### Key Components

1. **Landing Page Components**:
   - Hero section with luxury car imagery
   - About section with business information
   - Service packages with pricing tiers
   - Contact form with validation
   - Responsive navigation with mobile menu

2. **Database Schema**:
   - `users` table for potential admin functionality
   - `contacts` table for storing customer inquiries

3. **API Routes**:
   - `POST /api/contact` - Contact form submission
   - `GET /api/contacts` - Retrieve all contacts (admin)

4. **Form Handling**:
   - React Hook Form with Zod validation
   - Real-time form validation
   - Toast notifications for user feedback

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form with service details
   - Form data validated on client-side with Zod
   - Data sent to `/api/contact` endpoint
   - Server validates and stores in PostgreSQL database
   - Success/error feedback displayed to user

2. **Page Navigation**:
   - Single-page application with smooth scrolling navigation
   - Mobile-responsive menu system
   - Scroll-triggered animations for enhanced UX

## External Dependencies

- **Database**: Neon PostgreSQL (serverless)
- **UI Components**: Radix UI primitives
- **Fonts**: Google Fonts (Poppins)
- **Images**: Unsplash for hero imagery
- **Icons**: Lucide React icons

## Deployment Strategy

- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/`
- **Production**: Serves static files from Express server
- **Database**: Uses DATABASE_URL environment variable for connection
- **Session Management**: connect-pg-simple for PostgreSQL session store

## Development Notes

- Uses modern ES modules throughout
- Tailwind configured with custom CSS variables for theming
- Responsive design with mobile-first approach
- Form validation provides immediate user feedback
- Database migrations managed through Drizzle Kit
- Development server includes error overlay and hot reloading

## Recent Changes (July 16-17, 2025)

- Updated background color to #1A1A1A for deeper luxury feel in dark mode
- Changed light mode background to #FFFDD0 (cream color) throughout entire site
- Fixed text visibility issues in dark mode across all sections
- Added Calendly integration with professional widget component
- Updated logo to use transparent background version
- Integrated actual Calendly URL: https://calendly.com/hamptonsautoclub
- Updated all package descriptions with detailed service information:
  * Platinum Package: $75, 45-60 minutes, basic exterior + interior refresh
  * Gold Package: $120, 90-120 minutes, deep interior + protective exterior
  * Diamond Package: $175, 2.5-3.5 hours, full deluxe service + long-lasting protection
- Customer testimonials section:
  * Created placeholder for future customer reviews
  * Removed fake testimonials per user request
  * Encouraging message for new customers to book and leave reviews
- Simplified payment system:
  * Removed Zelle payment option and 5% prepayment discount
  * Payment now only accepted at time of service (cash or card)
  * Single "Continue to Booking" button that redirects to Calendly
  * Updated modal to show "Service Pricing" instead of payment options
  * Kept 24-hour cancellation policy

## Recent Changes (July 21, 2025)

- Added favicon and SEO optimization:
  * Created favicon files from the logo for browser tabs and search results
  * Added comprehensive meta tags for better search engine visibility
  * Implemented Open Graph tags for social media sharing
  * Created web manifest for progressive web app support
  * Added proper title and description tags for Google search results

## Recent Changes (July 17, 2025)

- Implemented Hamptons Auto Club Membership Program:
  * Three membership tiers: Platinum, Gold, and Diamond
  * Monthly and weekly service options with significant savings
  * Minimum 2-month commitment required
  * Priority booking and exclusive discounts for members
  * Custom plans available by request
  * Membership signup form with validation
  * API endpoint for processing membership requests
  * Added "Memberships" navigation link in desktop and mobile menus
  * Membership benefits include locked-in pricing, free upgrades, and VIP perks
  * Updated pricing (July 18, 2025):
    - Platinum: $68/month or $60/week (save $7-$60/month)
    - Gold: $96/month or $85/week (save $24-$140/month)
    - Diamond: $140/month or $125/week (save $35-$200/month)