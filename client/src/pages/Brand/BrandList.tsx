import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { brandApi } from '../../services/api';
import { Modal } from '../../components/ui/modal';

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    brandApi.getAll()
      .then(res => setBrands(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBrands([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      await brandApi.delete(id);
      setBrands(brands => brands.filter(b => b._id !== id));
    }
  };

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brands</h1>
        <Link to="/brands/add" className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Add Brand</Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        Array.isArray(brands) && brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brands.map(brand => (
              <div key={brand._id} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-2xl transition-shadow">
                {brand.image && (
                  <img
                    src={brand.image.replace('server/', '')}
                    alt={brand.name}
                    className="h-32 w-full object-contain mb-3 rounded-lg cursor-pointer transition-transform hover:scale-105 bg-gray-100"
                    onClick={() => openModal(brand.image)}
                  />
                )}
                <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">{brand.name}</h2>
                <div className="mt-auto flex gap-2">
                  <Link to={`/brands/${brand._id}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">View</Link>
                  <Link to={`/brands/${brand._id}/edit`} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">Edit</Link>
                  <button onClick={() => handleDelete(brand._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">No brands found.</div>
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

export default BrandList; 