import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import TicketView from '../components/TicketView';
import { useState } from 'react';
import './Dashboard.css';


const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);

  const addTicket = (ticket) => {
    const newTicket = { ...ticket, id: Date.now(), status: 'Open', comments: [] };
    setTickets([...tickets, newTicket]);
  };

  const changeStatus = (id, newStatus) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addComment = (id, comment) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...t.comments, comment] } : t));
  };

  const filterTickets = (status) => {
    if (status === 'all') return;
    setTickets(tickets.filter(t => t.status === status));
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div>
        <TicketForm onSubmit={addTicket} />
        <TicketList tickets={tickets} onSelect={setSelected} onFilter={filterTickets} />
      </div>
      <div>
        {selected && (
          <TicketView ticket={selected} onStatusChange={changeStatus} onComment={addComment} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
