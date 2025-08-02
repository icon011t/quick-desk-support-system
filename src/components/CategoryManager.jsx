import { useState } from 'react';

const CategoryManager = ({ categories, onAdd, onDelete }) => {
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="p-4">
      <input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={() => { onAdd(newCategory); setNewCategory(''); }}>Add</button>
      <ul className="mt-2">
        {categories.map((cat, i) => (
          <li key={i} className="flex justify-between">
            {cat}
            <button onClick={() => onDelete(cat)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
