import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { categoryApi } from '../../services/api';

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

interface CategoryFormProps {
  mode?: 'add' | 'edit';
}

const CategoryForm: React.FC<CategoryFormProps> = ({ mode }) => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>({ name: '', description: '', image: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = mode === 'edit' || (!!id && mode !== 'add');

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      categoryApi.getById(id)
        .then(res => {
          setCategory(res.data);
          setPreviewImage(res.data.image ? res.data.image : null);
        })
        .finally(() => setLoading(false));
    } else {
      setCategory({ name: '', description: '', image: '' });
      setImageFile(null);
      setPreviewImage(null);
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
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
      let imageUrl = category.image;
      if (imageFile) {
        imageUrl = await uploadToCpanel(imageFile);
      }
      const payload = {
        ...category,
        image: imageUrl || '',
      };
      if (isEdit && id) {
        await categoryApi.update(id, payload);
      } else {
        await categoryApi.create(payload);
        setCategory({ name: '', description: '', image: '' });
        setImageFile(null);
        setPreviewImage(null);
      }
      navigate('/products/categories');
    } catch (err) {
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Link to="/products/categories" className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">← Back</Link>
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input type="text" name="name" value={category.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={category.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
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
                  setCategory({ ...category, image: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
          {!previewImage && category.image && (
            <div className="relative inline-block">
              <img src={category.image} alt="Current" className="h-32 mt-2 rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setCategory({ ...category, image: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? (isEdit ? 'Saving...' : 'Saving...') : (isEdit ? 'Save Changes' : 'Save Category')}</button>
      </form>
    </div>
  );
};

export default CategoryForm; 