import express from 'express';
import {
  getAllTickets,
  createTicket,
  updateTicketStatus,
  addTicketComment
} from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAllTickets)
  .post(protect, upload.single('attachment'), createTicket);

router.put('/:id/status', protect, updateTicketStatus);
router.post('/:id/comments', protect, addTicketComment);

export default router;
