import BenefitForm from './BenefitForm';
import { useNavigate } from 'react-router-dom';

export default function BenefitAdd() {
  const navigate = useNavigate();
  const handleSubmit = async (data: { name: string; description: string }) => {
    await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/benefits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    navigate('/services/benefits');
  };
  return <BenefitForm onSubmit={handleSubmit} submitLabel="Add Benefit" />;
} 