import { query, pool } from '../lib/db';
import type { User } from '../components/UserContext';

export interface Post {
  id?: number;
  user_id: number | string;
  content: string;
  image_url?: string;
  tags?: string[];
  post_type: string;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  created_at?: string;
  price?: string;
  discount?: string;
  carbon_saved?: string;
  product_details?: Record<string, any>;
  community_details?: Record<string, any>;
  location?: string;
}

export interface PostWithUser extends Post {
  user: User;
}

/**
 * Fetches all posts from the database
 */
export const getAllPosts = async (): Promise<PostWithUser[]> => {
  try {
    const result = await query(`
      SELECT 
        p.*,
        u.id as user_id,
        u.name,
        u.email,
        u.avatar,
        u.level,
        u.joindate as "joinDate",
        u.verified,
        u.badge,
        u.location as user_location,
        u.stats
      FROM 
        posts p
      JOIN 
        users u ON p.user_id = u.id
      ORDER BY 
        p.created_at DESC
    `);

    // Transform the results into the expected format
    return result.rows.map((row: any) => {
      const { 
        user_id, name, email, avatar, level, joinDate, 
        verified, badge, user_location, stats, 
        ...postData 
      } = row;

      return {
        ...postData,
        user_id,
        tags: postData.tags || [],
        user: {
          id: user_id,
          name,
          email,
          avatar,
          level,
          joinDate,
          verified,
          badge,
          location: user_location,
          stats: typeof stats === 'string' ? JSON.parse(stats) : stats
        }
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

/**
 * Adds a new post to the database
 */
export const addPost = async (postData: Post): Promise<Post | null> => {
  try {
    // Format post data for database
    const formattedPost = {
      user_id: postData.user_id,
      content: postData.content,
      image_url: postData.image_url || null,
      tags: postData.tags || [],
      post_type: postData.post_type,
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      price: postData.price || null,
      discount: postData.discount || null,
      carbon_saved: postData.carbon_saved || null,
      product_details: postData.product_details ? JSON.stringify(postData.product_details) : null,
      community_details: postData.community_details ? JSON.stringify(postData.community_details) : null,
      location: postData.location || null,
      created_at: new Date().toISOString(),
    };

    // Insert the post into the database
    const result = await query(`
      INSERT INTO posts (
        user_id, content, image_url, tags, post_type, likes, comments, shares, views,
        price, discount, carbon_saved, product_details, community_details, location, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      ) RETURNING *
    `, [
      formattedPost.user_id,
      formattedPost.content,
      formattedPost.image_url,
      formattedPost.tags,
      formattedPost.post_type,
      formattedPost.likes,
      formattedPost.comments,
      formattedPost.shares,
      formattedPost.views,
      formattedPost.price,
      formattedPost.discount,
      formattedPost.carbon_saved,
      formattedPost.product_details,
      formattedPost.community_details,
      formattedPost.location,
      formattedPost.created_at
    ]);

    // Get the user data to return a complete post with user
    const userResult = await query(`
      SELECT * FROM users WHERE id = $1
    `, [formattedPost.user_id]);

    if (result.rows.length > 0 && userResult.rows.length > 0) {
      const post = result.rows[0];
      const user = userResult.rows[0];
      
      return {
        ...post,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          level: user.level,
          joinDate: user.joindate,
          verified: user.verified,
          badge: user.badge,
          location: user.location,
          stats: typeof user.stats === 'string' ? JSON.parse(user.stats) : user.stats
        }
      };
    }

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error adding post:', error);
    return null;
  }
}; 