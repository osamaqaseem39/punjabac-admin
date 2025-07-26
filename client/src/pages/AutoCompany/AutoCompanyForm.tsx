import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { autoCompanyApi } from '../../services/api';

async function uploadToCpanel(file: File): Promise<string> {
  const formData = new FormData();
  const ext = file.name.split('.').pop();
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  formData.append('file', file, uniqueName);
  const response = await fetch('https://punjabac.osamaqaseem.online/upload.php', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (data.url) {
    return data.url;
  } else {
    throw new Error(data.error || 'Upload failed');
  }
}

interface AutoCompanyFormProps {
  mode?: 'add' | 'edit';
}

const AutoCompanyForm: React.FC<AutoCompanyFormProps> = ({ mode }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>({ name: '', image: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = mode === 'edit' || (!!id && mode !== 'add');

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      autoCompanyApi.getById(id)
        .then((response) => {
          setCompany(response.data);
          setPreviewImage(response.data.image ? response.data.image : null);
        })
        .finally(() => setLoading(false));
    } else {
      setCompany({ name: '', image: '' });
      setImageFile(null);
      setPreviewImage(null);
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = company.image;
      if (imageFile) {
        imageUrl = await uploadToCpanel(imageFile);
      }
      const payload = {
        ...company,
        image: imageUrl || '',
      };
      if (isEdit && id) {
        await autoCompanyApi.update(id, payload);
      } else {
        await autoCompanyApi.create(payload);
        setCompany({ name: '', image: '' });
        setImageFile(null);
        setPreviewImage(null);
      }
      navigate('/auto-companies');
    } catch (err) {
      alert('Error saving auto company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Link to="/auto-companies" className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">← Back</Link>
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Auto Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" name="name" value={company.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <div className="relative inline-block">
              <img src={previewImage} alt="Preview" className="h-32 mt-2 rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setPreviewImage(null);
                  setImageFile(null);
                  setCompany({ ...company, image: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
          {!previewImage && company.image && (
            <div className="relative inline-block">
              <img src={company.image} alt="Current" className="h-32 mt-2 rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setCompany({ ...company, image: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Saving...') : (isEdit ? 'Save Changes' : 'Save Auto Company')}</button>
      </form>
    </div>
  );
};

export default AutoCompanyForm; 