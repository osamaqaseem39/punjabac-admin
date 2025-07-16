'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsApi, Product } from '../services/api';
import ProductCard from './ProductCard';

const HomeProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        console.log('Fetched products:', data); // Debug log
        // Show only first 6 products on homepage
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'compressor', name: 'Compressors', count: products.filter(p => p.title.toLowerCase().includes('compressor')).length },
    { id: 'condenser', name: 'Condensers', count: products.filter(p => p.title.toLowerCase().includes('condenser')).length },
    { id: 'evaporator', name: 'Evaporators', count: products.filter(p => p.title.toLowerCase().includes('evaporator')).length },
  ];



  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-punjabac-brand/10 text-punjabac-brand rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Premium Auto AC Parts
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of genuine auto AC parts and components from trusted brands. 
            Quality assured for optimal performance and reliability.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category.name}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-punjabac-brand/10 text-punjabac-brand'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-punjabac-brand"></div>
              <div className="mt-4 text-center text-gray-600">Loading featured products...</div>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredProducts.map((product, index) => (
                <div key={product._id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard 
                    product={product} 
                    variant="homepage" 
                    showDate={false}
                    showGalleryCount={true}
                    showCategoryBadge={true}
                    showHoverEffects={true}
                  />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center bg-punjabac-brand text-white px-8 py-4 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
              >
                View All Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory !== 'all' 
                  ? 'No products match the selected category. Try another category or view all products.'
                  : 'No products are currently available. Please check back later.'
                }
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HomeProducts; 