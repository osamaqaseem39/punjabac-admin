import React from 'react';
import Link from 'next/link';
import { productsApi } from '../../../services/api';
import AutoCompanies from '../../../components/AutoCompanies';
import Image from 'next/image';
import ProductDescription from '../../../components/ProductDescription';
import ProductImageGallery from '../../../components/ProductImageGallery';

export async function generateStaticParams() {
  try {
    const products = await productsApi.getAll();
    return products.map(product => ({
      slug: productsApi.generateSlug(product.title, product._id)
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}

// Server Component that fetches data
async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await productsApi.getBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              ← Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const allImages = product.featuredImage 
    ? [product.featuredImage, ...(product.gallery || [])]
    : product.gallery || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Breadcrumb */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="relative p-4 lg:p-8">
                <ProductImageGallery images={allImages} title={product.title} />
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <span className="bg-punjabac-brand/10 text-punjabac-brand px-3 py-1 rounded-full text-sm font-medium">
                    Auto AC Parts
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <ProductDescription description={product.description} />

                {/* Product Meta */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                  
                  {product.gallery && product.gallery.length > 0 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {product.gallery.length + (product.featuredImage ? 1 : 0)} images available
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-punjabac-brand text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center hover:bg-punjabac-brand-light focus:outline-none focus:ring-2 focus:ring-punjabac-brand">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact for Quote
                  </button>
                  <button className="px-6 py-3 border-2 border-punjabac-brand text-punjabac-brand rounded-lg font-semibold hover:bg-punjabac-brand/10 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save
                  </button>
                </div>

                {/* Product Features */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Genuine Parts</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Quality Assured</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Warranty Included</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Expert Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto Companies Section */}
      <AutoCompanies />

      {/* Contact CTA */}
      <section className="bg-punjabac-brand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8 text-punjabac-brand/80">
            Our experts are here to help you find the perfect auto AC parts for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-punjabac-brand px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Expert Advice
            </a>
            <a 
              href="tel:92-345-8428889" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-punjabac-brand transition-colors"
            >
              Call Now: 92-345-8428889
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage; 