import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productApi, Product } from '../../services/api';
import { autoCompanyApi, AutoCompany, categoryApi, brandApi, benefitApi } from '../../services/api';

// Upload a file to cPanel server and return the public URL
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

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>({ title: '', description: '', featuredImage: '', gallery: [] });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [previewFeatured, setPreviewFeatured] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [autoCompanies, setAutoCompanies] = useState<AutoCompany[]>([]);
  const [selectedAutoCompanies, setSelectedAutoCompanies] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedCompatibleBrands, setSelectedCompatibleBrands] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      productApi.getById(id)
        .then(res => {
          setProduct(res.data);
          setPreviewFeatured(res.data.featuredImage ? res.data.featuredImage : null);
          setExistingGallery(res.data.gallery ? res.data.gallery : []);
          setPreviewGallery([]);
          setSelectedBenefits(res.data.benefits ? res.data.benefits : []);
          setSelectedCompatibleBrands(res.data.compatibleBrands ? res.data.compatibleBrands.map((b: any) => typeof b === 'string' ? b : b._id) : []);
        })
        .finally(() => setLoading(false));
    } else {
      setProduct({ title: '', description: '', featuredImage: '', gallery: [] });
      setFeaturedImageFile(null);
      setGalleryFiles([]);
      setPreviewFeatured(null);
      setPreviewGallery([]);
      setExistingGallery([]);
      setSelectedBenefits([]);
      setSelectedCompatibleBrands([]);
    }
    // Fetch categories and brands using API methods
    categoryApi.getAll().then(res => setCategories(res.data));
    brandApi.getAll().then(res => setBrands(res.data));
    // Fetch auto companies
    autoCompanyApi.getAll().then(res => setAutoCompanies(res.data));
    // Fetch product benefits only
    benefitApi.getAll({ type: 'product' }).then(res => setBenefits(res.data));
  }, [id]);

  useEffect(() => {
    if (product.autoCompanies) {
      setSelectedAutoCompanies(product.autoCompanies as string[]);
    }
  }, [product.autoCompanies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImageFile(e.target.files[0]);
      setPreviewFeatured(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryFiles(files);
      setPreviewGallery(files.map(file => URL.createObjectURL(file)));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setProduct({ ...product, category: e.target.value });
  };
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setProduct({ ...product, brand: e.target.value });
  };

  // Remove handleAutoCompaniesChange and add handleAutoCompanyCheckbox
  const handleAutoCompanyCheckbox = (id: string) => {
    setSelectedAutoCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
    setProduct((prev) => ({
      ...prev,
      autoCompanies: prev.autoCompanies && prev.autoCompanies.includes(id)
        ? prev.autoCompanies.filter((cid: string) => cid !== id)
        : [...(prev.autoCompanies || []), id],
    }));
  };

  const handleBenefitCheckbox = (benefitId: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefitId)
        ? prev.filter((id) => id !== benefitId)
        : [...prev, benefitId]
    );
    setProduct((prev) => ({
      ...prev,
      benefits: prev.benefits && prev.benefits.includes(benefitId)
        ? prev.benefits.filter((id: string) => id !== benefitId)
        : [...(prev.benefits || []), benefitId],
    }));
  };

  const handleCompatibleBrandCheckbox = (brandId: string) => {
    setSelectedCompatibleBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let featuredImageUrl = product.featuredImage;
      if (featuredImageFile) {
        featuredImageUrl = await uploadToCpanel(featuredImageFile);
      }
      let galleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const url = await uploadToCpanel(file);
          galleryUrls.push(url);
        }
      } else if (existingGallery.length > 0) {
        galleryUrls = existingGallery;
      }
      // Always set featuredImage and gallery, even if empty
      const payload = {
        ...product,
        featuredImage: featuredImageUrl || '',
        gallery: galleryUrls.length > 0 ? galleryUrls : [],
        autoCompanies: selectedAutoCompanies,
        benefits: selectedBenefits,
        compatibleBrands: selectedCompatibleBrands,
      };
      // Debug log
      console.log('Submitting product:', payload);
      if (id) {
        await productApi.update(id, payload as any);
      } else {
        await productApi.create(payload as any);
        setProduct({ title: '', description: '', featuredImage: '', gallery: [] });
        setFeaturedImageFile(null);
        setGalleryFiles([]);
        setPreviewFeatured(null);
        setPreviewGallery([]);
        setExistingGallery([]);
        setSelectedBenefits([]);
        setSelectedCompatibleBrands([]);
      }
      navigate('/products');
    } catch (err) {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <Link to="/products" className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">← Back</Link>
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
          {previewFeatured && (
            <div className="relative inline-block">
              <img src={previewFeatured} alt="Preview" className="h-32 mt-2 rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setPreviewFeatured(null);
                  setFeaturedImageFile(null);
                  setProduct({ ...product, featuredImage: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
          {!previewFeatured && product.featuredImage && (
            <div className="relative inline-block">
              <img src={product.featuredImage} alt="Current" className="h-32 mt-2 rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setProduct({ ...product, featuredImage: '' });
                }}
                title="Remove image"
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {previewGallery.map((src, idx) => (
              <div key={src} className="relative inline-block">
                <img src={src} alt="Gallery Preview" className="h-20 rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={() => {
                    setPreviewGallery(previewGallery.filter((_, i) => i !== idx));
                    setGalleryFiles(galleryFiles.filter((_, i) => i !== idx));
                  }}
                  title="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
            {previewGallery.length === 0 && existingGallery.map((src, idx) => (
              <div key={src} className="relative inline-block">
                <img src={src} alt="Existing Gallery" className="h-20 rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={() => {
                    setExistingGallery(existingGallery.filter((_, i) => i !== idx));
                  }}
                  title="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select name="category" value={product.category || ''} onChange={handleCategoryChange} className="w-full border px-3 py-2 rounded">
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          {product.category && categories.find(cat => cat._id === product.category) && categories.find(cat => cat._id === product.category).image && (
            <img src={categories.find(cat => cat._id === product.category).image} alt="Category" className="h-12 mt-2" />
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Compatible Brands</label>
          <div className="flex flex-wrap gap-4">
            {brands.map(brand => (
              <label key={brand._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={brand._id}
                  checked={selectedCompatibleBrands.includes(brand._id)}
                  onChange={() => handleCompatibleBrandCheckbox(brand._id)}
                />
                {brand.name}
                {brand.image && <img src={brand.image} alt={brand.name} className="h-8 ml-2" />}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Benefits</label>
          <div className="flex flex-wrap gap-4">
            {benefits.map(benefit => (
              <label key={benefit._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={benefit._id}
                  checked={selectedBenefits.includes(benefit._id)}
                  onChange={() => handleBenefitCheckbox(benefit._id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                {benefit.name}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Auto Companies</label>
          <div className="flex flex-wrap gap-4">
            {autoCompanies.map(company => (
              <label key={company._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={company._id}
                  checked={selectedAutoCompanies.includes(company._id)}
                  onChange={() => handleAutoCompanyCheckbox(company._id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                {company.name}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={!!product.featured}
              onChange={e => setProduct({ ...product, featured: e.target.checked })}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">Featured Product</span>
          </label>
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm; 