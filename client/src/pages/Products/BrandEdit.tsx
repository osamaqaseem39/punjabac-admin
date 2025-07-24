import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BrandForm from './BrandForm';

export default function BrandEdit() {
  const { id } = useParams();
  const [initial, setInitial] = useState<{ name: string; image: string; description: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/brands') + '/' + id)
        .then(res => res.json())
        .then(data => setInitial({ name: data.name, image: data.image || '', description: data.description || '' }));
    }
  }, [id]);

  const handleSubmit = async (data: { name: string; image: string; description: string }) => {
    await fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/brands') + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Optionally redirect or show success
  };

  if (!initial) return <div>Loading...</div>;
  return <BrandForm initial={initial} onSubmit={handleSubmit} submitLabel="Update Brand" />;
} 