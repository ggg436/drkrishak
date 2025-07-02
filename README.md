# Eco-Friendly Farming Social Platform

A social platform for eco-friendly farming enthusiasts to connect, share sustainable agricultural practices, and build a community focused on environmental conservation.

## Project Overview

This platform aims to:
- Connect farmers practicing sustainable agriculture
- Share knowledge about eco-friendly farming techniques
- Provide a marketplace for sustainable farming products
- Track environmental impact metrics
- Build a community of environmentally conscious farmers

## Recent Migration

This project has recently been migrated from Supabase to Clerk for authentication and Neon PostgreSQL for database operations. The migration includes:

### Authentication (Clerk)
- User authentication and management
- Social login options
- Profile management
- Session handling

### Database (Neon PostgreSQL)
- Cloud-based PostgreSQL database
- Serverless architecture
- Automatic scaling
- High availability

## Technical Implementation

### Mock Implementations

Due to package installation issues in the development environment, we've created mock implementations for both services:

1. **Mock Clerk Authentication** (`src/lib/clerk-mock.ts` and `src/lib/clerk-components.tsx`)
   - Simulates user authentication with localStorage persistence
   - Provides components like SignIn, SignUp, and UserButton
   - Maintains the same API interface as the real Clerk service

2. **Mock Neon Database** (`src/lib/db-mock.ts`)
   - Provides a SQL-like query interface with localStorage for data persistence
   - Supports operations like SELECT, INSERT, UPDATE, and DELETE
   - Maintains the same API interface as the real pg module

### Key Components

- **ClerkAuthProvider**: Manages authentication context
- **UserContext**: Handles user state and profile data
- **Feed Component**: Displays posts from users
- **Post Service**: Manages post operations with the database

## Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ggg436/earth-friendly-frontpage-now.git

# Navigate to the project directory
cd earth-friendly-frontpage-now

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

For production, you'll need to set up the following environment variables:

```
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Neon PostgreSQL
VITE_NEON_CONNECTION_STRING=your_neon_connection_string
```

## Production Deployment

To deploy to production:

1. Replace the mock implementations with real service connections:
   - Install `@clerk/clerk-react` for authentication
   - Install `pg` for PostgreSQL database access
   
2. Update the configuration files with your production credentials

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy the built files to your hosting provider

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the Clerk team for their authentication service
- Thanks to the Neon team for their PostgreSQL database service 