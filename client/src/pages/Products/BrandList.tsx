import React, { useEffect, useState } from 'react';
import BrandForm from './BrandForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/brands';

interface Brand {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBrands(data);
    } catch (err) {
      setError('Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleAdd = async (data: { name: string; image: string; description: string }) => {
    setLoading(true);
    setError('');
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchBrands();
    } catch (err) {
      setError('Failed to add brand');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditing(brand);
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
      fetchBrands();
    } catch (err) {
      setError('Failed to update brand');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this brand?')) return;
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchBrands();
    } catch (err) {
      setError('Failed to delete brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      {editing ? (
        <BrandForm
          initial={{ name: editing.name, image: editing.image || '', description: editing.description || '' }}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          loading={loading}
          submitLabel="Update Brand"
        />
      ) : (
        <BrandForm onSubmit={handleAdd} loading={loading} submitLabel="Add Brand" />
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
          {brands.map(brand => (
            <tr key={brand._id}>
              <td className="p-2 text-center">{brand.image && <img src={brand.image} alt={brand.name} className="h-10 inline" />}</td>
              <td className="p-2">{brand.name}</td>
              <td className="p-2">{brand.description}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(brand)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(brand._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="mt-2">Loading...</div>}
    </div>
  );
};

export default BrandList; 