import React, { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/categories';

interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (data: { name: string; image: string; description: string }) => {
    setLoading(true);
    setError('');
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchCategories();
    } catch (err) {
      setError('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
  };

  const handleUpdate = async (data: { name: string; image: string; description: string }) => {
    if (!editing) return;
    setLoading(true);
    setError('');
    try {
      await fetch(`${API_URL}/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEditing(null);
      fetchCategories();
    } catch (err) {
      setError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this category?')) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (err) {
      setError('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {editing ? (
        <CategoryForm
          initial={{ name: editing.name, image: editing.image || '', description: editing.description || '' }}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          loading={loading}
          submitLabel="Update Category"
        />
      ) : (
        <CategoryForm onSubmit={handleAdd} loading={loading} submitLabel="Add Category" />
      )}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td className="p-2 text-center">{cat.image && <img src={cat.image} alt={cat.name} className="h-10 inline" />}</td>
              <td className="p-2">{cat.name}</td>
              <td className="p-2">{cat.description}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(cat)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(cat._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="mt-2">Loading...</div>}
    </div>
  );
};

export default CategoryList; 