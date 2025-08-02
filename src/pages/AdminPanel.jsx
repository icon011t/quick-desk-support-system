import CategoryManager from '../components/CategoryManager';
import { useState } from 'react';
import './AgentPanel.css';

const AdminPanel = () => {
  const [categories, setCategories] = useState(['Bug', 'Feature Request', 'Support']);

  const addCategory = (cat) => setCategories([...categories, cat]);
  const removeCategory = (cat) => setCategories(categories.filter(c => c !== cat));

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Manage Categories</h2>
      <CategoryManager categories={categories} onAdd={addCategory} onDelete={removeCategory} />
    </div>
  );
};

export default AdminPanel;
