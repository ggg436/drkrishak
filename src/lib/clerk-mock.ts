// Mock implementation of Clerk authentication
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    fullName: 'Demo User',
    firstName: 'Demo',
    lastName: 'User',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    primaryEmailAddress: { emailAddress: 'demo@example.com' },
    emailVerified: true
  },
  {
    id: '2',
    fullName: 'Farming Expert',
    firstName: 'Farming',
    lastName: 'Expert',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    primaryEmailAddress: { emailAddress: 'expert@example.com' },
    emailVerified: true
  }
];

// Mock Clerk context
interface MockClerkContextType {
  user: any | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const MockClerkContext = createContext<MockClerkContextType | undefined>(undefined);

export interface ClerkProviderProps {
  publishableKey: string;
  children: ReactNode;
}

export interface ChildrenProps {
  children: ReactNode;
}

export const getMockUser = () => {
  const storedUserId = localStorage.getItem('clerk-user-id');
  if (storedUserId) {
    return MOCK_USERS.find(u => u.id === storedUserId) || null;
  }
  return null;
};

export const mockSignIn = async () => {
  // For mock purposes, just sign in as the first user
  const mockUser = MOCK_USERS[0];
  localStorage.setItem('clerk-user-id', mockUser.id);
  return mockUser;
};

export const mockSignOut = async () => {
  localStorage.removeItem('clerk-user-id');
};

export const clerkPublishableKey = 'pk_test_Y2xlYW4tbGFtYi04NS5jbGVyay5hY2NvdW50cy5kZXYk'; 