'use client';

import React, { useEffect, useState } from 'react';
import { servicesApi, Service } from '../../services/api';
import ServiceCard from '../../components/ServiceCard';
import GetAQuoteForm from '../../components/GetAQuoteForm';
import Image from 'next/image';
import CategoryStack, { CategoryData } from '../../components/CategoryStack';

const mockCategories: CategoryData[] = [
  {
    title: "Food Items",
    description:
      "Explore a wide range of quality food items sourced from trusted suppliers, ensuring freshness and taste in every bite.",
    image: "/images/categories/fooditems.png",
    buttonText: "View Food Items",
    variant: "right",
  },
  {
    title: "Beverages",
    description:
      "Discover our selection of beverages, from refreshing juices to energizing drinks, perfect for any occasion.",
    image: "/images/categories/beverages.jpg",
    buttonText: "View Beverages",
    variant: "left",
  },
  {
    title: "Fresh Fruits",
    description:
      "Enjoy the freshest fruits, handpicked and delivered to you with care for maximum nutrition and flavor.",
    image: "/images/categories/fruits.jpg",
    buttonText: "View Fresh Fruits",
    variant: "right",
  },
  {
    title: "Utensils",
    description:
      "Browse our collection of utensils designed for convenience and durability in your kitchen or business.",
    image: "/images/categories/utencils.jpg",
    buttonText: "View Utensils",
    variant: "left",
  },
];

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        console.log('Fetched services:', data); // Debug log
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      {/* Hero Section */}
      <section className="relative bg-punjabac-brand text-white py-20 overflow-hidden">
        {/* Decorative background graphic */}
        <img
          src="/images/breeze.webp"
          alt="Decorative Breeze Graphic"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-[500px] max-w-full opacity-30 blur-sm"
          style={{zIndex: 1}}
          aria-hidden="true"
          width={500}
          height={500}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{zIndex: 2}}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Professional Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Professional auto AC services with over 30 years of experience. We provide comprehensive solutions for all your automotive air conditioning needs.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-medium">
                {services.length} Services Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryStack categories={mockCategories} />
        </div>
      </section>

      {/* Additional Service Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Modern tools, genuine parts, and unmatched professionalism in auto AC services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified Technicians</h3>
              <p className="text-gray-600 leading-relaxed">Our team consists of certified and experienced technicians with years of expertise in auto AC systems.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Genuine Parts</h3>
              <p className="text-gray-600 leading-relaxed">We use only genuine parts from trusted brands like DENSO, COOL GEAR, and SANDEN for optimal performance.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Same Day Service</h3>
              <p className="text-gray-600 leading-relaxed">Quick turnaround time with same-day service for most repairs. We value your time and convenience.</p>
            </div>
          </div>
        </div>
      </section>
      <GetAQuoteForm className="mt-20" layout="double" />
    </main>
  );
};

export default ServicesPage; 