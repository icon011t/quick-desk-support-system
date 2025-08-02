import express from 'express';
import {
  getCategories,
  addCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCategories);
router.post('/', protect, addCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
