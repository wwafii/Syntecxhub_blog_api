// src/controllers/postController.ts
import { Request, Response } from 'express';
import { Post, IPost } from '../models/Post';

// --- CREATE ---
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

// --- READ (Single Post) ---
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// --- READ (All Posts with Pagination, Filtering, Sorting) ---
export const getPosts = async (req: Request, res: Response) => {
  try {
    // 1. Pagination Parameters
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;
    
    // 2. Filter Parameters (by tag, author, date)
    const filter: any = {};
    if (req.query.tag) {
      filter.tags = req.query.tag; // Mencari post yang mengandung tag tertentu
    }
    if (req.query.author) {
      // Menggunakan regex untuk pencarian author yang lebih fleksibel (case-insensitive)
      filter.author = new RegExp(req.query.author as string, 'i'); 
    }
    // Filter berdasarkan tanggal (contoh: posts yang dibuat setelah tanggal tertentu)
    if (req.query.startDate) {
        filter.createdAt = { $gte: new Date(req.query.startDate as string) };
    }
    
    // 3. Sorting Parameters
    let sort: any = { createdAt: -1 }; // Default: Newest (terbaru)
    if (req.query.sortBy === 'oldest') {
      sort = { createdAt: 1 }; // Oldest (terlama)
    }

    
    const posts = await Post.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip);
      
    
    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      total: totalPosts,
      limit,
      skip,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error });
  }
};


export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error });
  }
};


export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};