import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi, Product } from '../../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      productApi.getById(id)
        .then(res => setProduct(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="mb-4 text-gray-700">{product.description}</p>
      {product.featuredImage && (
        <img src={`/${product.featuredImage.replace('server/', '')}`} alt={product.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      {product.gallery && product.gallery.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Gallery</h2>
          <div className="flex gap-2 flex-wrap">
            {product.gallery.map((img, idx) => (
              <img key={idx} src={`${img.replace('server/', '')}`} alt={`Gallery ${idx + 1}`} className="h-24 rounded" />
            ))}
          </div>
        </div>
      )}
      <Link to="/products" className="text-blue-600">Back to Products</Link>
    </div>
  );
};

export default ProductDetail; 