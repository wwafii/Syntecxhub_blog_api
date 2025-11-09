
import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/postController';

const router = Router();


router.post('/', createPost);           
router.get('/', getPosts);              // List (with Pagination, Filtering, Sorting)
router.get('/:id', getPostById);        // Read by ID
router.put('/:id', updatePost);         // Update
router.delete('/:id', deletePost);      // Delete

export default router;