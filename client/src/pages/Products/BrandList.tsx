import React, { useEffect, useState } from 'react';

interface Brand {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/brands';

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState<{ name: string; image: string; description: string }>({ name: '', image: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
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
      setForm({ name: '', image: '', description: '' });
      setEditingId(null);
      fetchBrands();
    } catch (err) {
      setError('Failed to save brand');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand: Brand) => {
    setForm({ name: brand.name, image: brand.image || '', description: brand.description || '' });
    setEditingId(brand._id);
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
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded w-full" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Brand</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', image: '', description: '' }); }} className="ml-2 text-gray-600">Cancel</button>}
      </form>
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
          {brands.map((brand) => (
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