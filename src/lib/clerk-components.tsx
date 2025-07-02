import React, { useContext, useState, useEffect } from 'react';
import { MockClerkContext, ClerkProviderProps, ChildrenProps, getMockUser, mockSignIn, mockSignOut } from './clerk-mock';

// Mock Clerk provider component
export const ClerkProvider: React.FC<ClerkProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage for signed-in user
    const storedUser = getMockUser();
    setUser(storedUser);
    setIsLoaded(true);
  }, []);

  const signIn = async () => {
    const mockUser = await mockSignIn();
    setUser(mockUser);
  };

  const signOut = async () => {
    await mockSignOut();
    setUser(null);
  };

  const contextValue = {
    user,
    isLoaded,
    isSignedIn: !!user,
    signIn,
    signOut
  };

  return (
    <MockClerkContext.Provider value={contextValue}>
      {children}
    </MockClerkContext.Provider>
  );
};

// Mock hooks
export const useUser = () => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('useUser must be used within a ClerkProvider');
  }
  return {
    user: context.user,
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn
  };
};

export const useClerk = () => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('useClerk must be used within a ClerkProvider');
  }
  return {
    signOut: context.signOut
  };
};

// Mock SignIn component
export const SignIn: React.FC = () => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('SignIn must be used within a ClerkProvider');
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <button 
        onClick={context.signIn}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Sign in as Demo User
      </button>
    </div>
  );
};

// Mock SignUp component
export const SignUp: React.FC = () => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('SignUp must be used within a ClerkProvider');
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <button 
        onClick={context.signIn}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Sign up as Demo User
      </button>
    </div>
  );
};

// Mock SignedIn component
export const SignedIn: React.FC<ChildrenProps> = ({ children }) => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('SignedIn must be used within a ClerkProvider');
  }
  
  return context.isSignedIn ? <>{children}</> : null;
};

// Mock SignedOut component
export const SignedOut: React.FC<ChildrenProps> = ({ children }) => {
  const context = useContext(MockClerkContext);
  if (!context) {
    throw new Error('SignedOut must be used within a ClerkProvider');
  }
  
  return !context.isSignedIn ? <>{children}</> : null;
};

// Mock UserButton component
export const UserButton: React.FC = () => {
  const context = useContext(MockClerkContext);
  if (!context || !context.user) {
    return null;
  }
  
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2">
        <img 
          src={context.user.imageUrl} 
          alt={context.user.fullName} 
          className="w-8 h-8 rounded-full"
        />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
        <div className="py-1">
          <p className="px-4 py-2 text-sm text-gray-700">{context.user.fullName}</p>
          <p className="px-4 py-2 text-sm text-gray-500">{context.user.primaryEmailAddress.emailAddress}</p>
          <button 
            onClick={context.signOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}; 