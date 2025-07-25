import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { brandApi } from '../../services/api';
import { Modal } from '../../components/ui/modal';

const BrandDetail: React.FC = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      brandApi.getById(id)
        .then(res => setBrand(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!brand) return <div className="flex justify-center items-center h-64">Brand not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{brand.name}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">{brand.description}</p>
        {brand.image && (
          <img
            src={brand.image.replace('server/', '')}
            alt={brand.name}
            className="w-full h-72 object-contain rounded-lg mb-4 cursor-pointer transition-transform hover:scale-105 bg-gray-100"
            onClick={() => openModal(brand.image)}
          />
        )}
        <Link
          to="/brand"
          className="inline-block mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
           Back to Brands
        </Link>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isFullscreen={false}>
        {modalImg && (
          <img src={modalImg} alt="Preview" className="max-h-[80vh] max-w-full rounded-lg mx-auto" />
        )}
      </Modal>
    </div>
  );
};

export default BrandDetail; 