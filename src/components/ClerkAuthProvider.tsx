import React from 'react';
import { ClerkProvider } from '../lib/clerk-components';
import { clerkPublishableKey } from '../lib/clerk';

interface ClerkAuthProviderProps {
  children: React.ReactNode;
}

const ClerkAuthProvider: React.FC<ClerkAuthProviderProps> = ({ children }) => {
  if (!clerkPublishableKey) {
    throw new Error('Missing Clerk publishable key');
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkAuthProvider; 