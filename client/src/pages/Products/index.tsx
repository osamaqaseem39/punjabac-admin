import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
  gallery: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        console.log('Products API response:', res.data);
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Products API error:', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/new" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      {loading ? <div>Loading...</div> : (
        Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="border rounded p-4 flex flex-col">
                {product.featuredImage && (
                  <img src={`/${product.featuredImage.replace('server/', '')}`} alt={product.title} className="h-40 object-cover mb-2 rounded" />
                )}
                <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex gap-2">
                  <Link to={`/products/${product._id}`} className="text-blue-600">View</Link>
                  <Link to={`/products/${product._id}/edit`} className="text-yellow-600">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No products found.</div>
        )
      )}
    </div>
  );
};

export default Products; 