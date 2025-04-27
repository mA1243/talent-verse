This is a talent-sharing platform that allows users to showcase their skills, connect with others, and explore opportunities.

Features
1. User Authentication
Register/Login: Users can sign up and log in using their email via Supabase Auth.

Authentication Flow: Secure, easy-to-use login and sign-up process with email verification.

2. Profile Management
Create/Edit Profile: Users can create or update their profile with:

Name

Location

Bio

Profile photo (uploaded via Supabase Storage)

Profile Viewing: Users can view other profiles by clicking on their skill posts.

3. Skill Posts
Create/Edit/Delete Posts: Users can create, edit, and delete skill posts that include:

Title

Description

Image (uploaded to Supabase Storage)

Category (e.g., Programming, Design, Marketing)

Explore Feed: Display a feed with skill posts from all users in the platform, sorted by date or category.

4. Responsive UI
Tailwind CSS: Clean, responsive design that adapts to different screen sizes and provides a smooth user experience across devices.

Tech Stack
Frontend:

React: Used for building the interactive user interface.

TypeScript: Provides type safety for better development and maintainability.

Vite: Fast and modern build tool for fast development and optimal production builds.

Tailwind CSS: Utility-first CSS framework for fast and flexible styling.

Backend:

Supabase: Provides a backend-as-a-service with:

Authentication (email/password login)

PostgreSQL (for database management of user profiles and skill posts)

Storage (for profile and skill post images)

AI Tools:

GitHub Copilot: Assisted with code completion and suggestions.

Lovable: Used for generating UI design.