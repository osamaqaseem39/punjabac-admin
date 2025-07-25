import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { benefitApi } from '../../services/api';

const BenefitDetail: React.FC = () => {
  const { id } = useParams();
  const [benefit, setBenefit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      benefitApi.getById(id)
        .then(res => setBenefit(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!benefit) return <div className="flex justify-center items-center h-64">Benefit not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{benefit.name}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">{benefit.description}</p>
        <Link
          to="/benefits"
          className="inline-block mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          ← Back to Benefits
        </Link>
      </div>
    </div>
  );
};

export default BenefitDetail; 