// src/components/TicketList.jsx
import React from 'react';
import './TicketList.css';

const TicketList = ({ tickets = [], onSelect, onFilter }) => {
  return (
    <div className="ticket-list-container">
      <div className="filter-buttons">
        <button onClick={() => onFilter('all')} className="filter-btn">All</button>
        <button onClick={() => onFilter('Open')} className="filter-btn">Open</button>
        <button onClick={() => onFilter('In Progress')} className="filter-btn">In Progress</button>
        <button onClick={() => onFilter('Closed')} className="filter-btn">Closed</button>
      </div>

      <ul className="ticket-list">
        {tickets.length === 0 ? (
          <p className="no-ticket-msg">No tickets available.</p>
        ) : (
          tickets.map((ticket) => (
            <li
              key={ticket._id}
              onClick={() => onSelect(ticket)}
              className="ticket-card"
            >
              <div className="ticket-title">{ticket.subject}</div>
              <div className="ticket-meta">Status: {ticket.status}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TicketList;
