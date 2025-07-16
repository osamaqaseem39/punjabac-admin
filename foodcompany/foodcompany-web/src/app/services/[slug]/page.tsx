import React from 'react';
import Link from 'next/link';
import { servicesApi } from '../../../services/api';

export async function generateStaticParams() {
  try {
    const services = await servicesApi.getAll();
    return services.map(service => ({
      slug: servicesApi.generateSlug(service.title, service._id)
    }));
  } catch (error) {
    console.error('Error generating static params for services:', error);
    return [];
  }
}

// Server Component that fetches data
async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await servicesApi.getBySlug(slug);

  if (!service) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600">The service you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/services" className="text-punjabac-brand hover:text-punjabac-brand-light mt-4 inline-block">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/services" className="text-punjabac-brand hover:text-punjabac-brand-light mb-4 inline-block">
          ← Back to Services
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {service.featuredImage && (
            <div className="md:w-1/2">
              <img
                src={service.featuredImage}
                alt={service.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            <div className="text-sm text-gray-500">
              Added on {new Date(service.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Service Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Professional Expertise</h3>
              <p className="text-gray-600 text-sm">Our certified technicians ensure quality workmanship.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Genuine Parts</h3>
              <p className="text-gray-600 text-sm">We use only authentic parts from trusted brands.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quick Service</h3>
              <p className="text-gray-600 text-sm">Fast turnaround time with same-day service available.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Warranty</h3>
              <p className="text-gray-600 text-sm">All our services come with comprehensive warranty coverage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-punjabac-brand rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-punjabac-brand/80 mb-6">
          Contact us today to schedule your service or get a free quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-punjabac-brand px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Free Quote
          </a>
          <a 
            href="tel:92-345-8428889" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-punjabac-brand transition-colors"
          >
            Call Now: 92-345-8428889
          </a>
        </div>
      </div>
    </main>
  );
}

export default ServiceDetailPage; 