-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  level TEXT,
  joindate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE,
  badge TEXT,
  location TEXT,
  stats JSONB DEFAULT '{"carbonSaved": 0, "ecoPoints": 0, "postsShared": 0, "communitiesJoined": 0}'
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
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

-- Create index on posts for faster retrieval
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);

-- Insert sample users if they don't exist
INSERT INTO users (name, email, avatar, level, verified, badge, location, stats)
VALUES 
  ('Demo User', 'demo@example.com', 'DU', 'Eco Beginner', TRUE, 'Farmer', 'Demo Location', 
   '{"carbonSaved": 10, "ecoPoints": 100, "postsShared": 5, "communitiesJoined": 2}'),
  ('Farming Expert', 'expert@example.com', 'FE', 'Eco Master', TRUE, 'Expert', 'Farm Country', 
   '{"carbonSaved": 50, "ecoPoints": 500, "postsShared": 25, "communitiesJoined": 5}')
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts if the table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM posts LIMIT 1) THEN
    INSERT INTO posts (user_id, content, image_url, tags, post_type, likes, comments, shares, views, created_at)
    VALUES 
      (1, 'Just harvested my first batch of organic tomatoes! So excited about the results.', 
       'https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
       ARRAY['OrganicFarming', 'Harvest'], 'achievement', 15, 3, 2, 120, NOW()),
      
      (2, 'Here''s a tip: Rotate your crops each season to prevent soil depletion and reduce pest problems. This practice helps maintain soil health and increases biodiversity on your farm.',
       'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
       ARRAY['SoilHealth', 'CropRotation', 'FarmingTips'], 'tip', 32, 7, 12, 245, NOW() - INTERVAL '1 day');
  END IF;
END $$; 