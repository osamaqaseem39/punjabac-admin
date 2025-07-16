import React from 'react';
import ContactSection from '../../components/ContactSection';

const OurClientsPage = () => {
  const clients = [
    {
      name: 'Toyota Pakistan',
      logo: '/images/companies/toyota.png',
      category: 'Automotive Manufacturer',
      description: 'Long-term partnership providing AC services for their service centers across Pakistan.'
    },
    {
      name: 'Honda Pakistan',
      logo: '/images/companies/honda.png',
      category: 'Automotive Manufacturer',
      description: 'Trusted AC service provider for Honda dealerships and service centers.'
    },
    {
      name: 'Suzuki Pakistan',
      logo: '/images/companies/suzuki.png',
      category: 'Automotive Manufacturer',
      description: 'Reliable AC solutions for Suzuki vehicles and authorized service centers.'
    },
    {
      name: 'BMW Pakistan',
      logo: '/images/companies/bmw.png',
      category: 'Luxury Automotive',
      description: 'Premium AC services for BMW luxury vehicles and authorized dealerships.'
    },
    {
      name: 'Mercedes-Benz Pakistan',
      logo: '/images/companies/mercedes.png',
      category: 'Luxury Automotive',
      description: 'Expert AC services for Mercedes-Benz vehicles and authorized service centers.'
    },
    {
      name: 'Hyundai Pakistan',
      logo: '/images/companies/hyundai.png',
      category: 'Automotive Manufacturer',
      description: 'Comprehensive AC solutions for Hyundai vehicles and dealerships.'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      position: 'Fleet Manager',
      company: 'City Transport Services',
      image: '/images/testimonials/client1.jpg',
      rating: 5,
      text: 'Punjab Car AC has been our trusted partner for over 10 years. Their service quality and reliability are unmatched. They keep our entire fleet running smoothly.'
    },
    {
      name: 'Fatima Ali',
      position: 'Owner',
      company: 'Luxury Car Rentals',
      image: '/images/testimonials/client2.jpg',
      rating: 5,
      text: 'Exceptional service and attention to detail. They understand the importance of maintaining our luxury vehicles to the highest standards.'
    },
    {
      name: 'Muhammad Khan',
      position: 'Service Manager',
      company: 'Toyota Dealership',
      image: '/images/testimonials/client3.jpg',
      rating: 5,
      text: 'Professional team with deep technical expertise. They consistently deliver quality work and maintain our high service standards.'
    },
    {
      name: 'Ayesha Malik',
      position: 'Operations Director',
      company: 'Corporate Fleet Solutions',
      image: '/images/testimonials/client4.jpg',
      rating: 5,
      text: 'Reliable, efficient, and cost-effective. Punjab Car AC has helped us maintain our corporate fleet with minimal downtime.'
    }
  ];

  const successStories = [
    {
      title: 'Fleet Management Success',
      description: 'Successfully managed AC maintenance for a 500+ vehicle corporate fleet, reducing downtime by 60%.',
      metrics: ['500+ Vehicles', '60% Downtime Reduction', '24/7 Support']
    },
    {
      title: 'Luxury Vehicle Specialization',
      description: 'Became the preferred AC service provider for luxury car dealerships across major cities.',
      metrics: ['15+ Dealerships', 'Premium Service', 'Certified Technicians']
    },
    {
      title: 'Emergency Response',
      description: 'Established 24/7 emergency AC services for critical vehicle fleets and emergency services.',
      metrics: ['24/7 Availability', 'Emergency Response', 'Mobile Service']
    }
  ];

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Brands Our Clients Drive</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          We proudly serve a diverse range of clients, including individual car owners, corporate fleets, and the owners of vehicles from leading automotive brands. The auto companies shown below represent the brands of vehicles our clients trust us to maintain and repair—not the companies themselves as direct clients.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Our commitment to excellence has earned us long-term partnerships and a reputation for more than 30 years of dependable expertise in automobile air-conditioning across Pakistan.
        </p>
      </div>

      {/* Clients Grid */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Brands Trusted by Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The following brands represent the vehicles owned by our valued clients. We provide trusted AC services for their owners, dealerships, and service centers across Pakistan.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-punjabac-brand mb-2">{client.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{client.category}</p>
                <p className="text-gray-600 text-sm">{client.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Reviews */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Google Reviews</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            See what our customers are saying about us on Google. We value your feedback and strive to provide the best service possible.
          </p>
          <a
            href="https://maps.app.goo.gl/risMNUN4yaSqm4ug8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#357ae8] transition-colors text-lg shadow-md"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C34.962 32.042 30.153 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c2.938 0 5.629 1.047 7.747 2.773l6.571-6.571C34.583 4.527 29.627 2 24 2 12.954 2 4 10.954 4 22s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.104 19.001 13 24 13c2.938 0 5.629 1.047 7.747 2.773l6.571-6.571C34.583 4.527 29.627 2 24 2 16.318 2 9.656 6.741 6.306 14.691z"/><path fill="#FBBC05" d="M24 44c5.421 0 10.361-1.86 14.207-5.042l-6.586-5.411C29.627 35.953 26.94 37 24 37c-6.123 0-11.02-3.942-12.803-9.294l-6.553 5.049C9.623 41.259 16.318 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303c-1.377 3.542-5.303 7-11.303 7-6.123 0-11.02-3.942-12.803-9.294l-6.553 5.049C9.623 41.259 16.318 44 24 44c5.421 0 10.361-1.86 14.207-5.042l-6.586-5.411C29.627 35.953 26.94 37 24 37c-6.123 0-11.02-3.942-12.803-9.294l-6.553 5.049C9.623 41.259 16.318 44 24 44z"/></g></svg>
            Read Our Google Reviews
          </a>
        </div>
      </section>

      {/* Client Categories */}
      <section className="mb-16">
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Client Categories We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive AC services to various types of clients across different sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Individual Owners</h3>
              <p className="text-gray-600 text-sm">Personal vehicle AC services and maintenance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Corporate Fleets</h3>
              <p className="text-gray-600 text-sm">Large fleet management and maintenance services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Dealerships</h3>
              <p className="text-gray-600 text-sm">Authorized service centers and dealerships</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manufacturers</h3>
              <p className="text-gray-600 text-sm">Automotive manufacturers and suppliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
};

export default OurClientsPage; 