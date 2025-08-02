import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  attachment: {
    name: String,
    path: String,
    mimeType: String
  }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);