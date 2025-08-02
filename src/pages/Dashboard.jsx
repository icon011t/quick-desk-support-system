// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketView from '../components/TicketView.jsx';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error('Error fetching tickets:', err.message);
      }
    };
    fetchTickets();
  }, []);

  const addTicket = async (formData) => {
    try {
      const res = await api.post('/tickets', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTickets(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Error adding ticket:', err.response?.data || err.message);
    }
  };

  const changeStatus = async (id, newStatus) => {
    if (!['admin', 'agent'].includes(user?.role)) return;
    try {
      const res = await api.put(`/tickets/${id}/status`, { status: newStatus });
      setTickets(tickets.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Error changing status:', err.message);
    }
  };

  const addComment = async (id, comment) => {
    try {
      const res = await api.post(`/tickets/${id}/comments`, { text: comment });
      setTickets(tickets.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  const filterTickets = (status) => {
    setFilter(status);
    setPage(1);
    setSelected(null); // reset selected ticket on filter
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filtered = tickets.filter(t =>
    (filter === 'all' || t.status === filter) &&
    (t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     t.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🎫 Quick Desk Dashboard</h1>

      <div className="dashboard-controls">
        <div className="dashboard-filter">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => filterTickets(e.target.value)}>
            <option value="all">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="🔍 Search tickets..."
          className="dashboard-search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <TicketForm onSubmit={addTicket} />
          <TicketList
            tickets={paginated}
            onSelect={setSelected}
            onFilter={filterTickets}
          />
          <div className="pagination">
            {[...Array(Math.ceil(filtered.length / itemsPerPage)).keys()].map(i => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="dashboard-right">
            <TicketView
              ticket={selected}
              onStatusChange={changeStatus}
              onComment={addComment}
              currentUserRole={user?.role}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
