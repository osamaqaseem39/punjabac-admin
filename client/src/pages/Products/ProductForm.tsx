import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi, Product } from '../../services/api';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>({ title: '', description: '' });
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [previewFeatured, setPreviewFeatured] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      productApi.getById(id)
        .then(res => {
          setProduct(res.data);
          setPreviewFeatured(res.data.featuredImage ? `/${res.data.featuredImage.replace('server/', '')}` : null);
          setPreviewGallery(res.data.gallery ? res.data.gallery.map((img: string) => `/${img.replace('server/', '')}`) : []);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
      setPreviewFeatured(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGallery(files);
      setPreviewGallery(files.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title as string);
    formData.append('description', product.description as string);
    if (featuredImage) formData.append('featuredImage', featuredImage);
    gallery.forEach((file, idx) => formData.append('gallery', file));
    setLoading(true);
    try {
      if (id) {
        await productApi.update(id, formData);
      } else {
        await productApi.create(formData);
      }
      navigate('/products');
    } catch (err) {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input type="text" name="title" value={product.title as string} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={product.description as string} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block font-semibold mb-1">Featured Image</label>
          <input type="file" accept="image/*" onChange={handleFeaturedChange} />
          {previewFeatured && <img src={previewFeatured} alt="Preview" className="h-32 mt-2 rounded" />}
        </div>
        <div>
          <label className="block font-semibold mb-1">Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {previewGallery.map((src, idx) => <img key={idx} src={src} alt="Gallery Preview" className="h-20 rounded" />)}
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm; 