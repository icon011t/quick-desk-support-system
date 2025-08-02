const TicketList = ({ tickets = [], onSelect, onFilter }) => {
  return (
    <div className="p-4">
      <div className="space-x-2 mb-4">
        <button onClick={() => onFilter('open')}>Open</button>
        <button onClick={() => onFilter('closed')}>Closed</button>
      </div>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li key={ticket.id} onClick={() => onSelect(ticket)} className="cursor-pointer border p-2">
            <strong>{ticket.subject}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
