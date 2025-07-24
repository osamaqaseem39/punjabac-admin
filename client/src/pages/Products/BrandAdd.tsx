import BrandForm from './BrandForm';

export default function BrandAdd() {
  const handleSubmit = async (data: { name: string; image: string; description: string }) => {
    await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Optionally redirect or show success
  };
  return <BrandForm onSubmit={handleSubmit} submitLabel="Add Brand" />;
} 