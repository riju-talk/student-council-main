# Overview

This project is the official website for the IIITD Student Council, serving as a centralized platform for managing campus events, student clubs, and council activities. The application provides a comprehensive digital workspace for students, faculty, and administrators to interact with student council services, submit event proposals, browse club information, and access important campus resources.

The platform acts as a unified portal that streamlines student engagement by offering transparent interfaces for event management, club discovery, representative information, and administrative processes. It serves both informational purposes (displaying council members, club details, meeting minutes) and functional purposes (event proposal submission, contact management).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based architecture with TypeScript for type safety. The frontend is built using Vite as the build tool, providing fast development and optimized production builds. The routing is handled by React Router for client-side navigation between different pages (Home, Representatives, Clubs, Hostel information, etc.).

The UI architecture leverages Radix UI primitives through Shadcn/UI components, providing accessible and customizable interface elements. Styling is implemented using Tailwind CSS with custom design tokens defined for the IIITD brand colors (gold primary, cyan secondary) and theming system. The design system includes sophisticated animations using Framer Motion for page transitions and interactive elements.

## State Management & Data Fetching
The application uses TanStack Query (React Query) for server state management, providing caching, synchronization, and background updates. This architecture choice eliminates the need for complex client-side state management while providing excellent user experience through optimistic updates and background refetching.

Local component state is managed using React hooks (useState, useEffect) for form handling and UI interactions. Form validation and management is handled through React Hook Form with Zod schema validation, ensuring type-safe form processing.

## Backend Architecture
The application follows a Backend-as-a-Service (BaaS) architecture using Supabase, which provides PostgreSQL database, real-time subscriptions, file storage, and API generation. This serverless approach eliminates the need for custom backend development while providing robust data management capabilities.

The database schema includes tables for student representatives, clubs, event proposals, meeting minutes, hostel information, important contacts, and penalty information. The architecture supports real-time updates and role-based access control through Supabase's built-in authentication and authorization system.

## Component Architecture
The codebase follows a modular component structure with clear separation of concerns:
- Page components handle routing and layout composition
- Feature components encapsulate business logic (EventProposalModal, ClubProposalForm)
- UI components provide reusable interface elements
- Layout components (Header, Footer) provide consistent navigation and branding

The component architecture supports code reusability and maintainability through prop interfaces and TypeScript definitions.

## Build & Development Setup
The project uses Vite for development and build processes, providing hot module replacement and optimized production builds. ESLint is configured for code quality enforcement with TypeScript-specific rules. The build system supports environment-specific configurations for development and production deployments.

# External Dependencies

## Database & Backend Services
- **Supabase**: Primary backend service providing PostgreSQL database, real-time subscriptions, file storage, and auto-generated APIs. Handles all data persistence, user authentication, and server-side logic through database functions and triggers.

## UI Framework & Styling
- **Radix UI**: Headless component library providing accessible primitives for complex UI elements like dialogs, dropdowns, and form controls. Ensures WCAG compliance and keyboard navigation.
- **Shadcn/UI**: Pre-built component library built on top of Radix UI, providing styled components that follow design system patterns.
- **Tailwind CSS**: Utility-first CSS framework for responsive design and custom theming. Includes custom color palette for IIITD branding.
- **Framer Motion**: Animation library for page transitions, hover effects, and micro-interactions throughout the application.

## Data Management & Forms
- **TanStack Query**: Server state management library handling API calls, caching, background updates, and loading states. Provides optimistic updates and error handling for data operations.
- **React Hook Form**: Form library for handling form state, validation, and submission with minimal re-renders.
- **Zod**: Schema validation library ensuring type-safe form validation and data parsing.

## Development & Build Tools
- **Vite**: Build tool and development server providing fast hot module replacement and optimized production builds.
- **TypeScript**: Type system providing compile-time error checking and enhanced developer experience.
- **ESLint**: Code linting tool configured for React and TypeScript best practices.

## Utility Libraries
- **date-fns**: Date manipulation and formatting library for handling event dates and timestamps.
- **Lucide React**: Icon library providing consistent iconography throughout the application.
- **class-variance-authority**: Utility for creating type-safe component variants with Tailwind CSS.
- **clsx**: Conditional className utility for dynamic styling.