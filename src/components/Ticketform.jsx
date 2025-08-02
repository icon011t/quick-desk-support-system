import { useState } from 'react';
import './TicketForm.css';

const TicketForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setForm({ ...form, attachment: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.attachment) {
      formData.append('attachment', form.attachment);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h2 className="ticket-form-title">📩 Submit a New Ticket</h2>

      <input
        type="text"
        name="title"
        placeholder="Enter ticket title"
        value={form.title}
        onChange={handleChange}
        required
        className="ticket-input"
      />

      <textarea
        name="description"
        placeholder="Describe your issue..."
        value={form.description}
        onChange={handleChange}
        required
        className="ticket-textarea"
      />

      <input
        type="text"
        name="category"
        placeholder="Category (e.g., Technical, Billing)"
        value={form.category}
        onChange={handleChange}
        required
        className="ticket-input"
      />

      <input
        type="file"
        name="attachment"
        onChange={handleChange}
        className="ticket-input-file"
      />

      <button type="submit" className="ticket-submit">
        Submit Ticket
      </button>
    </form>
  );
};

export default TicketForm;
