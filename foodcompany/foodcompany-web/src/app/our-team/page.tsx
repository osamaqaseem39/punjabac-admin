import React from 'react';
import ContactSection from '../../components/ContactSection';

const OurTeamPage = () => {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Expert Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Our team of certified AC mechanics and technicians are skilled professionals with years of hands-on experience in automotive air conditioning systems. Every day, our experts diagnose complex AC issues, perform precise repairs, and ensure optimal performance through meticulous maintenance. From compressor replacements to refrigerant recharging, our dedicated technicians work with precision and care, using the latest diagnostic tools and genuine parts. We are committed to delivering reliable, efficient, and long-lasting AC solutions that keep your vehicle comfortable year-round.
        </p>
        
        {/* Team Image */}
        <div className="mb-12">
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/images/team.jpg"
              alt="Punjab Car AC Team"
              width={800}
              height={600}
              className="rounded-2xl shadow-lg object-cover"
              loading="eager"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-xl text-gray-500 font-semibold">
          Our team information will be updated soon.
        </div>
      </div>
      <ContactSection />
    </main>
  );
};

export default OurTeamPage; 