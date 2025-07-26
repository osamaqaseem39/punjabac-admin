import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { autoCompanyApi } from '../../services/api';
import { Modal } from '../../components/ui/modal';

const AutoCompanyDetail: React.FC = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      autoCompanyApi.getById(id)
        .then(res => setCompany(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const openModal = (img: string) => {
    setModalImg(img.replace('server/', ''));
    setModalOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!company) return <div className="flex justify-center items-center h-64">Auto company not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{company.name}</h1>
        {company.image && (
          <img
            src={company.image.replace('server/', '')}
            alt={company.name}
            className="w-full h-72 object-contain rounded-lg mb-4 cursor-pointer transition-transform hover:scale-105 bg-gray-100"
            onClick={() => openModal(company.image)}
          />
        )}
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(company.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {new Date(company.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/auto-companies"
            className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Back to Auto Companies
          </Link>
          <Link
            to={`/auto-companies/${company._id}/edit`}
            className="inline-block px-5 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
          >
            Edit
          </Link>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isFullscreen={false}>
        {modalImg && (
          <img src={modalImg} alt="Preview" className="max-h-[80vh] max-w-full rounded-lg mx-auto" />
        )}
      </Modal>
    </div>
  );
};

export default AutoCompanyDetail; 