'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Service, getImageUrl } from '../services/api';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'homepage' | 'compact';
  showDate?: boolean;
  showCategoryBadge?: boolean;
  showHoverEffects?: boolean;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = 'default',
  showDate = true,
  showCategoryBadge = false,
  showHoverEffects = true,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Get image URL using utility function
  const imageUrl = getImageUrl(service.featuredImage, 'services');
  const slug = `/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${service._id}`;

  // Get service-specific icon based on title
  const getServiceIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('repair') || lowerTitle.includes('maintenance')) {
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    } else if (lowerTitle.includes('refrigerant') || lowerTitle.includes('recharge')) {
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    } else if (lowerTitle.includes('compressor') || lowerTitle.includes('replacement')) {
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    } else if (lowerTitle.includes('installation') || lowerTitle.includes('install')) {
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      );
    } else if (lowerTitle.includes('diagnostic') || lowerTitle.includes('diagnosis')) {
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    } else {
      // Default service icon
      return (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error('Failed to load service image:', imageUrl);
  };

  const baseClasses = "bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500";
  const hoverClasses = showHoverEffects ? "hover:shadow-2xl hover:-translate-y-2 group" : "";
  const variantClasses = {
    default: "h-full flex flex-col",
    homepage: "h-full flex flex-col",
    compact: "h-full flex flex-col"
  };

  return (
    <div className={`${baseClasses} ${hoverClasses} ${variantClasses[variant]} ${className}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {imageUrl && !imageError ? (
          <div className="relative">
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
                <div className="w-10 h-10 border-3 border-punjabac-brand border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={service.title}
              width={600}
              height={315}
              className={`w-full h-56 object-cover transition-all duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } ${showHoverEffects ? 'group-hover:scale-110' : ''}`}
              onLoad={() => handleImageLoad()}
              onError={() => handleImageError()}
              style={{ objectFit: 'cover', width: '100%', height: '14rem' }}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {showHoverEffects && variant === 'homepage' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link
                  href={slug}
                  className="bg-white text-punjabac-brand px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl hover:shadow-2xl hover:bg-punjabac-brand hover:text-white"
                >
                  View Details
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="h-56 bg-gradient-to-br from-punjabac-brand/5 via-punjabac-brand/10 to-punjabac-brand/15 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-punjabac-brand/20 to-punjabac-brand/30 rounded-full flex items-center justify-center shadow-lg">
              {getServiceIcon(service.title)}
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {showCategoryBadge && (
          <div className="absolute top-4 left-4">
            <span className="bg-punjabac-brand text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
              Service
            </span>
          </div>
        )}

        {/* Service Features Badge */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            ✓ Quality
          </span>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            ⚡ Fast
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-1 text-sm">
          {service.description}
        </p>

        {/* Service Highlights */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Professional
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Guaranteed
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Expert
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            {showDate && (
              <span className="text-xs text-gray-500 font-medium">
                {new Date(service.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
            <Link
              href={slug}
              className="inline-flex items-center bg-punjabac-brand text-white px-4 py-2 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Learn More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 