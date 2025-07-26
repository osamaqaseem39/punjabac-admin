import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi, Product } from '../../services/api';
import { Modal } from '../../components/ui/modal';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  useEffect(() => {
    fetch('https://punjabac-admin.vercel.app/api/categories')
      .then(res => res.json())
      .then(setCategories);
    fetch('https://punjabac-admin.vercel.app/api/brands')
      .then(res => res.json())
      .then(setBrands);
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = 'https://punjabac-admin.vercel.app/api/products';
    const params = [];
    if (filterCategory) params.push(`category=${filterCategory}`);
    if (filterBrand) params.push(`brand=${filterBrand}`);
    if (params.length) url += '?' + params.join('&');
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filterCategory, filterBrand]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await productApi.delete(id);
      setProducts(products => products.filter(p => p._id !== id));
    }
  };

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <Link to="/products/add" className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Add Product</Link>
      </div>
      <div className="flex gap-4 mb-4">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand._id} value={brand._id}>{brand.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => {
              const cat = categories.find(c => c._id === product.category);
              const brand = brands.find(b => b._id === product.brand);
              return (
                <div key={product._id} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-2xl transition-shadow">
                  {product.featured && (
                    <span className="inline-block bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded mb-2 self-end">★ Featured</span>
                  )}
                  {product.featuredImage && (
                    <img
                      src={product.featuredImage.replace('server/', '')}
                      alt={product.title}
                      className="h-48 w-full object-cover mb-3 rounded-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() => openModal(product.featuredImage!)}
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">{product.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {cat && cat.image && <img src={cat.image} alt={cat.name} className="h-6 w-6 rounded-full" />}
                    {cat && <span className="text-xs text-gray-500">{cat?.name}</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {brand && brand.image && <img src={brand.image} alt={brand.name} className="h-6 w-6 rounded-full" />}
                    {brand && <span className="text-xs text-gray-500">{brand?.name}</span>}
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Link to={`/products/${product._id}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">View</Link>
                    <Link to={`/products/${product._id}/edit`} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">Edit</Link>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">No products found.</div>
        )
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isFullscreen={false}>
        {modalImg && (
          <img src={modalImg} alt="Preview" className="max-h-[80vh] max-w-full rounded-lg mx-auto" />
        )}
      </Modal>
    </div>
  );
};

export default ProductList; 