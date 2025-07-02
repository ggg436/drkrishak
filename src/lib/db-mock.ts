// Mock implementation of Neon PostgreSQL database

// Define the QueryResult interface to match pg's interface
export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  command: string;
  oid: number;
  fields: any[];
}

// Mock database tables
interface MockDatabase {
  users: any[];
  posts: any[];
}

// Initialize mock database with some data
const initMockDatabase = (): MockDatabase => {
  // Try to load data from localStorage if available
  try {
    const savedData = localStorage.getItem('neon-mock-db');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading mock database from localStorage:', error);
  }

  // Default initial data
  const initialData: MockDatabase = {
    users: [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'DU',
        level: 'Eco Beginner',
        joindate: new Date().toISOString(),
        verified: true,
        badge: 'Farmer',
        location: 'Demo Location',
        stats: JSON.stringify({
          carbonSaved: 10,
          ecoPoints: 100,
          postsShared: 5,
          communitiesJoined: 2
        })
      },
      {
        id: 2,
        name: 'Farming Expert',
        email: 'expert@example.com',
        avatar: 'FE',
        level: 'Eco Master',
        joindate: new Date().toISOString(),
        verified: true,
        badge: 'Expert',
        location: 'Farm Country',
        stats: JSON.stringify({
          carbonSaved: 50,
          ecoPoints: 500,
          postsShared: 25,
          communitiesJoined: 5
        })
      }
    ],
    posts: [
      {
        id: 1,
        user_id: 1,
        content: 'Just harvested my first batch of organic tomatoes! So excited about the results.',
        image_url: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        tags: ['OrganicFarming', 'Harvest'],
        post_type: 'achievement',
        likes: 15,
        comments: 3,
        shares: 2,
        views: 120,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        user_id: 2,
        content: 'Here\'s a tip: Rotate your crops each season to prevent soil depletion and reduce pest problems. This practice helps maintain soil health and increases biodiversity on your farm.',
        image_url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        tags: ['SoilHealth', 'CropRotation', 'FarmingTips'],
        post_type: 'tip',
        likes: 32,
        comments: 7,
        shares: 12,
        views: 245,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ]
  };

  // Save to localStorage
  localStorage.setItem('neon-mock-db', JSON.stringify(initialData));
  
  return initialData;
};

// Create mock database instance
let mockDb = initMockDatabase();

// Helper function to save database state to localStorage
const saveDbState = () => {
  localStorage.setItem('neon-mock-db', JSON.stringify(mockDb));
};

// Helper function to parse SQL-like queries (very simplified)
const parseQuery = (text: string): { action: string; table: string } => {
  text = text.toLowerCase();
  let action = 'unknown';
  let table = '';

  if (text.includes('select')) action = 'select';
  else if (text.includes('insert')) action = 'insert';
  else if (text.includes('update')) action = 'update';
  else if (text.includes('delete')) action = 'delete';

  if (text.includes('from users') || text.includes('into users')) table = 'users';
  else if (text.includes('from posts') || text.includes('into posts')) table = 'posts';

  return { action, table };
};

// Mock query function
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  console.log('Mock DB Query:', { text, params });
  
  try {
    const { action, table } = parseQuery(text);
    
    // Handle different query types
    if (action === 'select') {
      if (table === 'users') {
        // Handle user queries
        if (params && params.length > 0 && text.includes('where')) {
          // Simple WHERE clause handling (very basic)
          if (text.includes('email =')) {
            const email = params[0];
            const rows = mockDb.users.filter(user => user.email === email);
            return { rows, rowCount: rows.length, command: 'SELECT', oid: 0, fields: [] };
          } else if (text.includes('id =')) {
            const id = params[0];
            const rows = mockDb.users.filter(user => user.id === id);
            return { rows, rowCount: rows.length, command: 'SELECT', oid: 0, fields: [] };
          }
        }
        
        // Return all users if no specific condition
        return { rows: mockDb.users, rowCount: mockDb.users.length, command: 'SELECT', oid: 0, fields: [] };
      } 
      
      if (table === 'posts') {
        // Handle post queries
        if (text.includes('join users')) {
          // Handle JOIN query for posts with users
          const joinedRows = mockDb.posts.map(post => {
            const user = mockDb.users.find(u => u.id === post.user_id);
            return { ...post, user };
          });
          return { rows: joinedRows, rowCount: joinedRows.length, command: 'SELECT', oid: 0, fields: [] };
        }
        
        // Return all posts if no specific condition
        return { rows: mockDb.posts, rowCount: mockDb.posts.length, command: 'SELECT', oid: 0, fields: [] };
      }
    } 
    
    else if (action === 'insert') {
      if (table === 'users') {
        // Insert new user
        const newUser = {
          id: mockDb.users.length + 1,
          name: params?.[0] || 'New User',
          email: params?.[1] || `user${Date.now()}@example.com`,
          avatar: params?.[2] || 'NU',
          level: params?.[3] || 'Eco Beginner',
          joindate: params?.[4] || new Date().toISOString(),
          verified: params?.[5] || false,
          badge: params?.[6] || 'Farmer',
          location: params?.[7] || '',
          stats: params?.[8] || JSON.stringify({
            carbonSaved: 0,
            ecoPoints: 0,
            postsShared: 0,
            communitiesJoined: 0
          })
        };
        
        mockDb.users.push(newUser);
        saveDbState();
        return { rows: [newUser], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
      } 
      
      if (table === 'posts') {
        // Insert new post
        const newPost = {
          id: mockDb.posts.length + 1,
          user_id: params?.[0] || 1,
          content: params?.[1] || '',
          image_url: params?.[2] || null,
          tags: params?.[3] || [],
          post_type: params?.[4] || 'text',
          likes: params?.[5] || 0,
          comments: params?.[6] || 0,
          shares: params?.[7] || 0,
          views: params?.[8] || 0,
          price: params?.[9] || null,
          discount: params?.[10] || null,
          carbon_saved: params?.[11] || null,
          product_details: params?.[12] || null,
          community_details: params?.[13] || null,
          location: params?.[14] || null,
          created_at: params?.[15] || new Date().toISOString()
        };
        
        mockDb.posts.push(newPost);
        saveDbState();
        return { rows: [newPost], rowCount: 1, command: 'INSERT', oid: 0, fields: [] };
      }
    }
    
    else if (action === 'update') {
      // Basic update implementation could go here
      return { rows: [], rowCount: 1, command: 'UPDATE', oid: 0, fields: [] };
    } 
    
    else if (action === 'delete') {
      // Basic delete implementation could go here
      return { rows: [], rowCount: 1, command: 'DELETE', oid: 0, fields: [] };
    }

    // Default response for unhandled queries
    return { rows: [], rowCount: 0, command: 'UNKNOWN', oid: 0, fields: [] };
  } catch (error) {
    console.error('Error in mock query:', error);
    throw error;
  }
}

// Mock pool for direct use
export const pool = {
  query: (text: string, params?: any[], callback?: (err: Error | null, result: QueryResult) => void) => {
    if (callback) {
      query(text, params)
        .then(result => callback(null, result))
        .catch(err => callback(err, { rows: [], rowCount: 0, command: '', oid: 0, fields: [] }));
      return;
    }
    
    return query(text, params);
  },
  end: () => Promise.resolve()
}; 