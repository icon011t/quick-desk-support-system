import React from 'react';
import './TicketList.css';

const statusClasses = {
  Open: 'status-open',
  'In Progress': 'status-progress',
  Resolved: 'status-resolved',
  Closed: 'status-closed',
};

const TicketList = ({ tickets = [], onSelect, onFilter }) => {
  return (
    <div className="ticket-list-container">
      <div className="filter-buttons">
        {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
          <button key={status} onClick={() => onFilter(status)} className="filter-btn">
            {status}
          </button>
        ))}
      </div>

      {tickets.length === 0 ? (
        <p className="no-ticket-msg">No tickets found.</p>
      ) : (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              onClick={() => onSelect(ticket)}
              className="ticket-card"
            >
              <div className="ticket-top">
                <h3 className="ticket-title">{ticket.title}</h3>
                <span className={`ticket-status ${statusClasses[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="ticket-description">
                {ticket.description.length > 120
                  ? `${ticket.description.slice(0, 120)}...`
                  : ticket.description}
              </p>
              <div className="ticket-meta">
                <span>📁 {ticket.category}</span>
                <span>🕒 {new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
