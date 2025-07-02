// Mock Supabase client implementation
// This is used because there are issues installing the Supabase package

// Define the Supabase client interface
interface SupabaseClient {
  from: (table: string) => {
    select: (query?: string) => Promise<{ data: any[] | null; error: any }>;
    insert: (data: any) => { select: () => Promise<{ data: any[] | null; error: any }> };
    order: (column: string, options: { ascending: boolean }) => { 
      select: (query?: string) => Promise<{ data: any[] | null; error: any }> 
    };
  };
}

interface MockDataStore {
  posts: any[];
  users: any[];
  [key: string]: any[]; // Index signature to allow string indexing
}

// Create a mock client with simulated data
const createMockClient = (): SupabaseClient => {
  console.warn('Using mock Supabase client. Posts will be saved to localStorage.');
  
  // Initialize mock data from localStorage or use defaults
  const loadMockData = (): MockDataStore => {
    try {
      const storedPosts = localStorage.getItem('dr-krishak-mock-posts');
      const storedUsers = localStorage.getItem('dr-krishak-mock-users');
      
      return {
        posts: storedPosts ? JSON.parse(storedPosts) : [],
        users: storedUsers ? JSON.parse(storedUsers) : [
          {
            id: 1,
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: 'DU',
            level: 'Eco Beginner',
            joinDate: new Date().toISOString(),
            verified: true,
            badge: 'Farmer',
            location: 'Demo Location',
            stats: {
              carbonSaved: 10,
              ecoPoints: 100,
              postsShared: 5,
              communitiesJoined: 2
            }
          },
          {
            id: 2,
            name: 'Farming Expert',
            email: 'expert@example.com',
            avatar: 'FE',
            level: 'Eco Master',
            joinDate: new Date().toISOString(),
            verified: true,
            badge: 'Expert',
            location: 'Farm Country',
            stats: {
              carbonSaved: 50,
              ecoPoints: 500,
              postsShared: 25,
              communitiesJoined: 5
            }
          }
        ]
      };
    } catch (error) {
      console.error('Error loading mock data from localStorage:', error);
      return {
        posts: [],
        users: [
          {
            id: 1,
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: 'DU',
            level: 'Eco Beginner',
            joinDate: new Date().toISOString(),
            verified: true,
            badge: 'Farmer',
            location: 'Demo Location',
            stats: {
              carbonSaved: 10,
              ecoPoints: 100,
              postsShared: 5,
              communitiesJoined: 2
            }
          },
          {
            id: 2,
            name: 'Farming Expert',
            email: 'expert@example.com',
            avatar: 'FE',
            level: 'Eco Master',
            joinDate: new Date().toISOString(),
            verified: true,
            badge: 'Expert',
            location: 'Farm Country',
            stats: {
              carbonSaved: 50,
              ecoPoints: 500,
              postsShared: 25,
              communitiesJoined: 5
            }
          }
        ]
      };
    }
  };
  
  // In-memory storage for mock data
  const mockData: MockDataStore = loadMockData();
  
  // Save mock data to localStorage
  const saveMockData = (): void => {
    try {
      localStorage.setItem('dr-krishak-mock-posts', JSON.stringify(mockData.posts));
      localStorage.setItem('dr-krishak-mock-users', JSON.stringify(mockData.users));
    } catch (error) {
      console.error('Error saving mock data to localStorage:', error);
    }
  };

  // Helper function to attach user to post
  const attachUserToPost = (post: any): any => {
    const user = mockData.users.find((u: any) => u.id === post.user_id) || mockData.users[0];
    return { ...post, user };
  };

  return {
    from: (table: string) => ({
      select: async (query?: string) => {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (table === 'posts') {
          // Handle join with users table
          if (query && query.includes('user:users')) {
            const postsWithUsers = mockData.posts.map((post: any) => attachUserToPost(post));
            return { data: postsWithUsers, error: null };
          }
          return { data: mockData[table] || [], error: null };
        }
        
        return { data: mockData[table] || [], error: null };
      },
      insert: (data: any) => ({
        select: async () => {
          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Add ID and timestamp if not present
          const newItem = {
            id: Date.now(),
            created_at: new Date().toISOString(),
            ...data
          };
          
          // Add to mock database
          if (!mockData[table]) {
            mockData[table] = [];
          }
          mockData[table].unshift(newItem); // Add to the beginning of the array
          
          // Save to localStorage
          saveMockData();
          
          // For posts, attach user information for immediate display
          if (table === 'posts') {
            const postWithUser = attachUserToPost(newItem);
            return { data: [postWithUser], error: null };
          }
          
          return { data: [newItem], error: null };
        }
      }),
      order: (column: string, options: { ascending: boolean }) => ({
        select: async (query?: string) => {
          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const sortedData = [...(mockData[table] || [])].sort((a, b) => {
            if (options.ascending) {
              return a[column] > b[column] ? 1 : -1;
            } else {
              return a[column] < b[column] ? 1 : -1;
            }
          });
          
          // Handle join with users table for posts
          if (table === 'posts' && query && query.includes('user:users')) {
            const postsWithUsers = sortedData.map((post: any) => attachUserToPost(post));
            return { data: postsWithUsers, error: null };
          }
          
          return { data: sortedData, error: null };
        }
      })
    })
  };
};

// Create and export the mock Supabase client
export const supabase = createMockClient(); 