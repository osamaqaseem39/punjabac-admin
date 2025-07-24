import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BenefitForm from './BenefitForm';

export default function BenefitEdit() {
  const { id } = useParams();
  const [initial, setInitial] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits') + '/' + id)
        .then(res => res.json())
        .then(data => setInitial({ name: data.name, description: data.description || '' }));
    }
  }, [id]);

  const handleSubmit = async (data: { name: string; description: string }) => {
    await fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits') + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Optionally redirect or show success
  };

  if (!initial) return <div>Loading...</div>;
  return <BenefitForm initial={initial} onSubmit={handleSubmit} submitLabel="Update Benefit" />;
} 