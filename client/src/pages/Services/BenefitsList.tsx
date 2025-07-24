import React, { useEffect, useState } from 'react';
import BenefitForm from './BenefitForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits';

interface Benefit {
  _id: string;
  name: string;
  description?: string;
}

const BenefitsList = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [editing, setEditing] = useState<Benefit | null>(null);
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

  const handleAdd = async (data: { name: string; description: string }) => {
    setLoading(true);
    setError('');
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchBenefits();
    } catch (err) {
      setError('Failed to add benefit');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (benefit: Benefit) => {
    setEditing(benefit);
  };

  const handleUpdate = async (data: { name: string; description: string }) => {
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
      fetchBenefits();
    } catch (err) {
      setError('Failed to update benefit');
    } finally {
      setLoading(false);
    }
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
      {editing ? (
        <BenefitForm
          initial={{ name: editing.name, description: editing.description || '' }}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          loading={loading}
          submitLabel="Update Benefit"
        />
      ) : (
        <BenefitForm onSubmit={handleAdd} loading={loading} submitLabel="Add Benefit" />
      )}
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