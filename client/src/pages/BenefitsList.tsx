import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits';

interface Benefit {
  _id: string;
  name: string;
  description?: string;
}

const BenefitsList = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [form, setForm] = useState<{ name: string; description: string }>({ name: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBenefits = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBenefits(data);
    } catch (err) {
      setError('Failed to fetch benefits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBenefits(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ name: '', description: '' });
      setEditingId(null);
      fetchBenefits();
    } catch (err) {
      setError('Failed to save benefit');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (benefit: Benefit) => {
    setForm({ name: benefit.name, description: benefit.description || '' });
    setEditingId(benefit._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this benefit?')) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchBenefits();
    } catch (err) {
      setError('Failed to delete benefit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Benefits</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded w-full" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Benefit</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '' }); }} className="ml-2 text-gray-600">Cancel</button>}
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {benefits.map(benefit => (
            <tr key={benefit._id}>
              <td className="p-2">{benefit.name}</td>
              <td className="p-2">{benefit.description}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(benefit)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(benefit._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="mt-2">Loading...</div>}
    </div>
  );
};

export default BenefitsList; 