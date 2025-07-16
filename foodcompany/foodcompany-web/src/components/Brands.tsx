import React from 'react';

const brands = [
  { name: 'DENSO', src: '/images/brands/denso.png' },
  { name: 'COOL GEAR', src: '/images/brands/coolgear.png' },
  { name: 'SANDEN', src: '/images/brands/sanden.png' },
];

const Brands = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-gray-900 text-center mb-10" style={{ fontSize: '60px' }}>Our Brands</h2>
        <div className="flex flex-row justify-center items-end gap-16 overflow-x-auto">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center min-w-[120px]">
              <img
                src={brand.src}
                alt={brand.name}
                width={120}
                height={120}
                className="h-16 w-auto object-contain mb-2 drop-shadow-md"
                style={{ height: '4rem' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands; 