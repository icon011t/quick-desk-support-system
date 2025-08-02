const TicketView = ({ ticket, onStatusChange, onComment }) => {
  const handleStatusChange = (e) => onStatusChange(ticket.id, e.target.value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(ticket.id, e.target.comment.value);
    e.target.reset();
  };

  return (
    <div className="p-4 border rounded">
      <h2>{ticket.subject}</h2>
      <p>{ticket.description}</p>
      <select onChange={handleStatusChange} defaultValue={ticket.status}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input name="comment" placeholder="Add comment" className="w-full" />
        <button type="submit">Submit</button>
      </form>
      <div className="mt-2">
        {ticket.comments?.map((c, i) => <p key={i}>{c}</p>)}
      </div>
    </div>
  );
};

export default TicketView;
