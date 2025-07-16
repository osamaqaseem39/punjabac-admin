'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsApi, servicesApi, Product, Service } from '../services/api';

export default function Footer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const data = await productsApi.getAll();
      setProducts(data.slice(0, 6));
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      const data = await servicesApi.getAll();
      setServices(data.slice(0, 6));
      setLoadingServices(false);
    };
    fetchServices();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
          {/* Company Info */}
          <div className="lg:col-span-1 min-w-[180px]">
            <div className="mb-6 flex flex-col items-start">
              <img src="/images/logo.png" alt="Punjab AC Logo" width={200} height={80} className="h-20 w-auto mb-2" />
              <div className="text-md text-gray-300 mb-1">Professional car air conditioning services with over 30 years of experience. Trusted by customers nationwide for quality and reliability.</div>
            </div>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="http://www.facebook.com/PunjabCarAc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              {/* Google Maps */}
              <a href="https://maps.app.goo.gl/risMNUN4yaSqm4ug8" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Google Maps">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services (dynamic) */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {loadingServices ? (
                <li className="text-gray-400">Loading...</li>
              ) : services.length > 0 ? (
                services.map(service => (
                  <li key={service._id}>
                    <Link href={`/services/${servicesApi.generateSlug(service.title, service._id)}`} className="text-gray-300 hover:text-white transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No services available</li>
              )}
            </ul>
          </div>

          {/* Products (dynamic) */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {loadingProducts ? (
                <li className="text-gray-400">Loading...</li>
              ) : products.length > 0 ? (
                products.map(product => (
                  <li key={product._id}>
                    <Link href={`/products/${productsApi.generateSlug(product.title, product._id)}`} className="text-gray-300 hover:text-white transition-colors">
                      {product.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No products available</li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/our-brands" className="text-gray-300 hover:text-white transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-gray-300 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/company-profile" className="text-gray-300 hover:text-white transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link href="/sub-dealers" className="text-gray-300 hover:text-white transition-colors">
                  Sub Dealers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/get-quote" className="text-gray-300 hover:text-white transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-w-[180px]">
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="text-gray-300 space-y-1 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-punjabac-brand-light mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-300">28, Mozang Road</p>
                  <p className="text-gray-300">Opp. Sir Ganga Ram Hospital</p>
                  <p className="text-gray-300">Lahore, Pakistan</p>
                  {/* Google Maps Link */}
                  <a
                    href="https://maps.app.goo.gl/risMNUN4yaSqm4ug8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-punjabac-brand-light hover:underline mt-1 text-sm"
                    aria-label="View on Google Maps"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    View on Maps
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-punjabac-brand-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">Landline: 92-42-36305101, 92-42-36361648</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-punjabac-brand-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                </svg>
                <span className="text-gray-300">Cell: 92-345-8428889</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-punjabac-brand-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">info@punjabac.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Punjab AC. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 