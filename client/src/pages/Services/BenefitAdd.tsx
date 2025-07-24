import BenefitForm from './BenefitForm';

export default function BenefitAdd() {
  const handleSubmit = async (data: { name: string; description: string }) => {
    await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Optionally redirect or show success
  };
  return <BenefitForm onSubmit={handleSubmit} submitLabel="Add Benefit" />;
} 