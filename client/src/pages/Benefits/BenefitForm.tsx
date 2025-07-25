import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { benefitApi } from '../../services/api';

interface BenefitFormProps {
  mode?: 'add' | 'edit';
}

const BenefitForm: React.FC<BenefitFormProps> = ({ mode }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [benefit, setBenefit] = useState<any>({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const isEdit = mode === 'edit' || (!!id && mode !== 'add');

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      benefitApi.getById(id)
        .then(res => {
          setBenefit(res.data);
        })
        .finally(() => setLoading(false));
    } else {
      setBenefit({ name: '', description: '' });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBenefit({ ...benefit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && id) {
        await benefitApi.update(id, benefit);
      } else {
        await benefitApi.create(benefit);
        setBenefit({ name: '', description: '' });
      }
      navigate('/benefits');
    } catch (err) {
      alert('Error saving benefit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Link to="/benefits" className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">← Back</Link>
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Benefit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" name="name" value={benefit.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={benefit.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Saving...') : (isEdit ? 'Save Changes' : 'Save Benefit')}</button>
      </form>
    </div>
  );
};

export default BenefitForm; 