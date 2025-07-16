import React from 'react';
import AutoCompanies from './AutoCompanies';

interface ProductPageProps {
  title: string;
  image: string;
  description: React.ReactNode;
}

const ProductPage: React.FC<ProductPageProps> = ({ title, image, description }) => {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">{title}</h1>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img
          src={image}
          alt={title}
          width={250}
          height={150}
          className="w-[250px] h-[150px] object-contain rounded shadow-md bg-white"
        />
        <div className="flex-1 text-lg text-gray-700">{description}</div>
      </div>
      <AutoCompanies />
    </main>
  );
};

export default ProductPage; 