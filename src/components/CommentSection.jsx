const CommentSection = ({ comments = [], onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.comment.value);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="comment" placeholder="Write comment..." className="w-full" />
        <button type="submit">Add</button>
      </form>
      <div className="mt-2">
        {comments.map((c, i) => <div key={i}>{c}</div>)}
      </div>
    </div>
  );
};

export default CommentSection;
