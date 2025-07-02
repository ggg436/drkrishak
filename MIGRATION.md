# Migration from Supabase to Clerk and Neon

This document explains the migration from Supabase to Clerk for authentication and Neon for the database.

## Overview

We've replaced Supabase with:
- **Clerk** for authentication
- **Neon PostgreSQL** for the database

Due to package installation issues, we've created mock implementations that simulate the behavior of these services while maintaining the same API interfaces.

## Implementation Details

### Authentication (Clerk)

1. Created a mock implementation of Clerk in `src/lib/clerk-mock.ts`
2. Updated `ClerkAuthProvider.tsx` to use the mock implementation
3. Updated `UserContext.tsx` to use Clerk for authentication and user management

### Database (Neon)

1. Created a mock implementation of Neon PostgreSQL in `src/lib/db-mock.ts`
2. Updated `postService.ts` to use the mock database implementation
3. Maintained the same API interface for database queries

## Mock Implementations

The mock implementations provide:

### Clerk Mock
- User authentication (sign in/sign out)
- User profile management
- Authentication state persistence using localStorage
- Components like SignIn, SignUp, UserButton, etc.

### Neon Database Mock
- Data persistence using localStorage
- SQL-like query interface
- Support for SELECT, INSERT, UPDATE, DELETE operations
- Automatic relationship handling for joins

## Configuration

### Clerk
- Publishable Key: `pk_test_Y2xlYW4tbGFtYi04NS5jbGVyay5hY2NvdW50cy5kZXYk`
- Secret Key: `sk_test_V4fjKbv4LwfyhJNRSs617qvAq0OVUDdZ5RcATK2iJv`

### Neon Database
- Connection String: `postgresql://dr_owner:npg_6k1QFuCzYeDV@ep-lucky-wave-a8j7wx02-pooler.eastus2.azure.neon.tech/dr?sslmode=require&channel_binding=require`

## Future Steps

To complete the migration to the real services:

1. Install the required packages:
   ```
   npm install @clerk/clerk-react pg @types/pg
   ```

2. Replace the mock implementations with real ones:
   - Update imports to use the real packages
   - Configure environment variables properly

3. Set up the database schema in Neon using the provided SQL script

## Testing

The mock implementations allow for testing the application without the need for external services. Data is persisted in localStorage, so it will survive page refreshes but will be lost if localStorage is cleared. 