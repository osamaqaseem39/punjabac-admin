import React from 'react';
// import Image from 'next/image'; // Removed

const companies = [
  { name: 'BMW', src: '/images/companies/bmw.png' },
  { name: 'Daihatsu', src: '/images/companies/diahatsu.png' },
  { name: 'Honda', src: '/images/companies/honda.png' },
  { name: 'Hyundai', src: '/images/companies/hyundai.png' },
  { name: 'Mercedes', src: '/images/companies/mercedes.png' },
  { name: 'Mitsubishi', src: '/images/companies/mitsubishi.png' },
  { name: 'Nissan', src: '/images/companies/nissan.png' },
  { name: 'Suzuki', src: '/images/companies/suzuki.png' },
  { name: 'Toyota', src: '/images/companies/toyota.png' },
];

const AutoCompanies = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Compatible With Major Auto Companies
        </h2>
        
        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {/* First set of companies */}
            {companies.map((company, index) => (
              <div 
                key={`first-${company.name}-${index}`}
                className="flex flex-col items-center mx-8 min-w-[150px] md:min-w-[180px] lg:min-w-[200px]"
              >
                <img
                  src={company.src}
                  alt={company.name}
                  width={150}
                  height={150}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain mb-3 drop-shadow-lg transition-all duration-300 hover:scale-110"
                />
                <span className="text-sm md:text-base text-gray-600 text-center font-medium">{company.name}</span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <div 
                key={`second-${company.name}-${index}`}
                className="flex flex-col items-center mx-8 min-w-[150px] md:min-w-[180px] lg:min-w-[200px]"
              >
                <img
                  src={company.src}
                  alt={company.name}
                  width={150}
                  height={150}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain mb-3 drop-shadow-lg transition-all duration-300 hover:scale-110"
                />
                <span className="text-sm md:text-base text-gray-600 text-center font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoCompanies; 