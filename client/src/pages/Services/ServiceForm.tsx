import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceApi, Service, CreateServiceInput, UpdateServiceInput } from '../../services/api';

const ServiceForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<CreateServiceInput>({
    title: '',
    description: '',
    featuredImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      serviceApi.getById(id)
        .then(res => setForm({
          title: res.data.title,
          description: res.data.description,
          featuredImage: res.data.featuredImage || ''
        }))
        .catch(() => setError('Failed to load service'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await serviceApi.update(id, form as UpdateServiceInput);
      } else {
        await serviceApi.create(form);
      }
      navigate('/services');
    } catch (err) {
      setError('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Service' : 'Add Service'}</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Featured Image URL</label>
          <input
            type="text"
            name="featuredImage"
            value={form.featuredImage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://..."
          />
          {form.featuredImage && (
            <img src={form.featuredImage.replace('server/', '')} alt="Preview" className="h-32 mt-2 rounded" />
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Add Service'}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm; 