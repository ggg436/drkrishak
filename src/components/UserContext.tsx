import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useClerk } from '../lib/clerk-components';
import { query } from '../lib/db';

// Define the User type
export interface User {
  id: number | string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  joinDate: string;
  verified: boolean;
  badge: string;
  location: string;
  stats: {
    carbonSaved: number;
    ecoPoints: number;
    postsShared: number;
    communitiesJoined: number;
  };
}

// Define the context type
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      if (!isClerkLoaded) return;
      
      if (!clerkUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        // Check if user exists in our database
        const result = await query(
          'SELECT * FROM users WHERE email = $1',
          [clerkUser.primaryEmailAddress?.emailAddress]
        );

        if (result.rows.length > 0) {
          // User exists, load their data
          const dbUser = result.rows[0];
          setUser({
            id: dbUser.id,
            name: dbUser.name || clerkUser.fullName || 'User',
            email: dbUser.email,
            avatar: dbUser.avatar || clerkUser.imageUrl || 'U',
            level: dbUser.level || 'Eco Beginner',
            joinDate: dbUser.joindate || new Date().toISOString(),
            verified: dbUser.verified || false,
            badge: dbUser.badge || 'Farmer',
            location: dbUser.location || '',
            stats: typeof dbUser.stats === 'string' 
              ? JSON.parse(dbUser.stats) 
              : dbUser.stats || {
                  carbonSaved: 0,
                  ecoPoints: 0,
                  postsShared: 0,
                  communitiesJoined: 0
                }
          });
        } else {
          // User doesn't exist, create a new user
          const newUser = {
            name: clerkUser.fullName || 'User',
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            avatar: clerkUser.imageUrl || clerkUser.firstName?.[0] || 'U',
            level: 'Eco Beginner',
            joinDate: new Date().toISOString(),
            verified: clerkUser.emailVerified || false,
            badge: 'Farmer',
            location: '',
            stats: {
              carbonSaved: 0,
              ecoPoints: 0,
              postsShared: 0,
              communitiesJoined: 0
            }
          };

          // Insert new user into the database
          const insertResult = await query(
            `INSERT INTO users (name, email, avatar, level, joindate, verified, badge, location, stats) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
              newUser.name, 
              newUser.email, 
              newUser.avatar, 
              newUser.level, 
              newUser.joinDate, 
              newUser.verified, 
              newUser.badge, 
              newUser.location, 
              JSON.stringify(newUser.stats)
            ]
          );

          const createdUser = insertResult.rows[0];
          setUser({
            ...newUser,
            id: createdUser.id
          });
        }
      } catch (err) {
        console.error('Error fetching or creating user:', err);
        setError('Failed to load user data');
        
        // Fallback to a basic user object based on Clerk data
        setUser({
          id: clerkUser.id,
          name: clerkUser.fullName || 'User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          avatar: clerkUser.imageUrl || clerkUser.firstName?.[0] || 'U',
          level: 'Eco Beginner',
          joinDate: new Date().toISOString(),
          verified: clerkUser.emailVerified || false,
          badge: 'Farmer',
          location: '',
          stats: {
            carbonSaved: 0,
            ecoPoints: 0,
            postsShared: 0,
            communitiesJoined: 0
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrCreateUser();
  }, [clerkUser, isClerkLoaded]);

  const signOut = async () => {
    try {
      await clerkSignOut();
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, error, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 