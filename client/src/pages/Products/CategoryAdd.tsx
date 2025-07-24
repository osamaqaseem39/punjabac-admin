import CategoryForm from './CategoryForm';

export default function CategoryAdd() {
  const handleSubmit = async (data: { name: string; image: string; description: string }) => {
    await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Optionally redirect or show success
  };
  return <CategoryForm onSubmit={handleSubmit} submitLabel="Add Category" />;
} 