import { useState } from 'react';
import TicketView from '../components/TicketView';

const mockTickets = [
  { id: 1, subject: 'Login Issue', description: 'Cannot log in.', status: 'Open', comments: [] },
  { id: 2, subject: 'Feature Request', description: 'Add dark mode.', status: 'Open', comments: [] }
];

const AgentPanel = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
  };

  const addComment = (id, comment) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...t.comments, comment] } : t));
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div>
        <h2>Unresolved Tickets</h2>
        <ul>
          {tickets.map(ticket => (
            <li
              key={ticket.id}
              className="cursor-pointer border p-2"
              onClick={() => setSelected(ticket)}
            >
              {ticket.subject} - {ticket.status}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selected && (
          <TicketView ticket={selected} onStatusChange={updateStatus} onComment={addComment} />
        )}
      </div>
    </div>
  );
};

export default AgentPanel;
