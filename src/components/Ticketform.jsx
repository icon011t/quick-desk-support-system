import { useState } from 'react';

const TicketForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    subject: '',
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
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <input type="file" name="attachment" onChange={handleChange} />
      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
