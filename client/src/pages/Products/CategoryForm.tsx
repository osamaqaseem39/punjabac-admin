import React, { useState, useEffect } from 'react';

interface CategoryFormProps {
  initial?: { name: string; image: string; description: string };
  onSubmit: (data: { name: string; image: string; description: string }) => void;
  onCancel?: () => void;
  loading?: boolean;
  submitLabel?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initial, onSubmit, onCancel, loading, submitLabel }) => {
  const [form, setForm] = useState<{ name: string; image: string; description: string }>(initial || { name: '', image: '', description: '' });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded shadow">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 rounded w-full" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{submitLabel || 'Save Category'}</button>
      {onCancel && <button type="button" onClick={onCancel} className="ml-2 text-gray-600">Cancel</button>}
    </form>
  );
};

export default CategoryForm; 