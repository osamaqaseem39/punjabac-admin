import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { benefitApi } from '../../services/api';

const BenefitList: React.FC = () => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    benefitApi.getAll()
      .then(res => setBenefits(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBenefits([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      await benefitApi.delete(id);
      setBenefits(benefits => benefits.filter(b => b._id !== id));
    }
  };

  const getTypeBadge = (type: string) => {
    const isProduct = type === 'product';
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${
        isProduct 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      }`}>
        {isProduct ? 'Product' : 'Service'}
      </span>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Benefits</h1>
        <Link to="/benefits/add" className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Add Benefit</Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        Array.isArray(benefits) && benefits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map(benefit => (
              <div key={benefit._id} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 flex flex-col hover:shadow-2xl transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{benefit.name}</h2>
                  {getTypeBadge(benefit.type)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{benefit.description}</p>
                <div className="mt-auto flex gap-2">
                  <Link to={`/benefits/${benefit._id}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">View</Link>
                  <Link to={`/benefits/${benefit._id}/edit`} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">Edit</Link>
                  <button onClick={() => handleDelete(benefit._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">No benefits found.</div>
        )
      )}
    </div>
  );
};

export default BenefitList; 