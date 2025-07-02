const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://zfvxhzlmgvxgbsyqmkjr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdnhoemxtZ3Z4Z2JzeXFta2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMzIyMzIsImV4cCI6MjAxMjYwODIzMn0.aCPQe_YfYHMRPLIkQKBZCjmA3Xkx4NaTrTVhJmf9Yb8';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample user data
const users = [
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
];

// Sample posts data
const posts = [
  {
    user_id: 1,
    content: 'Just harvested my first batch of organic tomatoes! So excited about the results. #OrganicFarming #Harvest',
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
    user_id: 2,
    content: 'Here\'s a tip: Rotate your crops each season to prevent soil depletion and reduce pest problems. This practice helps maintain soil health and increases biodiversity on your farm. #SoilHealth #CropRotation',
    image_url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['SoilHealth', 'CropRotation', 'FarmingTips'],
    post_type: 'tip',
    likes: 32,
    comments: 7,
    shares: 12,
    views: 245,
    created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

// Initialize database
async function initializeDatabase() {
  console.log('Starting database initialization...');

  try {
    // Check if tables exist
    const { data: existingTables, error: tablesError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (tablesError && tablesError.code === '42P01') { // Table doesn't exist
      console.log('Tables do not exist. Please create them in the Supabase dashboard.');
      console.log('SQL to create tables:');
      console.log(`
-- Create users table
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  level TEXT,
  joinDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  badge TEXT,
  location TEXT,
  stats JSONB
);

-- Create posts table
CREATE TABLE public.posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.users(id),
  content TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  post_type TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  price TEXT,
  discount TEXT,
  carbon_saved TEXT,
  product_details JSONB,
  community_details JSONB,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on users" 
  ON public.users FOR SELECT USING (true);

CREATE POLICY "Allow public read access on posts" 
  ON public.posts FOR SELECT USING (true);

-- Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts" 
  ON public.posts FOR INSERT WITH CHECK (true);
      `);
      return;
    }

    // Insert users
    console.log('Inserting users...');
    for (const user of users) {
      const { data, error } = await supabase
        .from('users')
        .upsert(user, { onConflict: 'id' })
        .select();
      
      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log('User inserted:', data[0].id);
      }
    }

    // Insert posts
    console.log('Inserting posts...');
    for (const post of posts) {
      const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select();
      
      if (error) {
        console.error('Error inserting post:', error);
      } else {
        console.log('Post inserted:', data[0].id);
      }
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
initializeDatabase(); 