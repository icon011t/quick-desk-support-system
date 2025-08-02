import Ticket from '../models/Ticket.js';

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const ticket = await Ticket.create({
      user: req.user._id,
      title,
      description,
      category,
      status: 'Open',
      comments: [],
      attachment: req.file
        ? {
            name: req.file.originalname,
            path: req.file.path,
            mimeType: req.file.mimetype
          }
        : undefined,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid ticket data' });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    ticket.status = req.body.status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error updating ticket status' });
  }
};

export const addTicketComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.comments.push({
      user: req.user._id,
      text: req.body.text,
      createdAt: new Date()
    });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};
