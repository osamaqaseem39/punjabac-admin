import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState<{ name: string; image: string; description: string } | null>(null);

  useEffect(() => {
    if (id) {
      fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/categories') + '/' + id)
        .then(res => res.json())
        .then(data => setInitial({ name: data.name, image: data.image || '', description: data.description || '' }));
    }
  }, [id]);

  const handleSubmit = async (data: { name: string; image: string; description: string }) => {
    await fetch((process.env.REACT_APP_API_URL || 'http://localhost:3000/api/categories') + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    navigate('/products/categories');
  };

  if (!initial) return <div>Loading...</div>;
  return <CategoryForm initial={initial} onSubmit={handleSubmit} submitLabel="Update Category" />;
} 