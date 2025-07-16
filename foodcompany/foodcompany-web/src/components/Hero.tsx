'use client';

import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <section className="relative bg-[#ede7de] overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-richCharcoal leading-tight">
              Your Trusted Partner in
              <span className="text-emeraldPine block min-h-[2.5rem]">
                {/* Typewriter effect can be restored here if needed */}
                Food Trading.
              </span>
            </h1>
            <p className="mt-6 text-xl text-richCharcoal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Wingz Impex connects you to the world’s finest food and beverage products. We specialize in sourcing, trading, and delivering high-quality goods to businesses worldwide, ensuring reliability, safety, and satisfaction in every shipment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/contact"
                className="px-8 py-4 rounded-lg font-semibold text-lg shadow-lg bg-[#405a4d] text-white hover:bg-[#2e3e2c] transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="/products"
                className="px-8 py-4 rounded-lg font-semibold text-lg bg-[#405a4d] text-white hover:bg-[#2e3e2c] transition-colors"
              >
                Our Products
              </a>
            </div>
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sandstone rounded-full flex items-center justify-center border border-emeraldPine">
                  <svg className="w-5 h-5 text-emeraldPine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-richCharcoal font-medium">Global Sourcing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sandstone rounded-full flex items-center justify-center border border-emeraldPine">
                  <svg className="w-5 h-5 text-emeraldPine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-richCharcoal font-medium">Quality Assurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sandstone rounded-full flex items-center justify-center border border-emeraldPine">
                  <svg className="w-5 h-5 text-emeraldPine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-richCharcoal font-medium">On-Time Delivery</span>
              </div>
            </div>
          </div>
          {/* Right Visual with Masked Image */}
          <div className="flex items-center justify-center h-full w-full">
            <div className="relative w-full h-full">
              <img
                src="/images/herobg.jpg"
                alt="Food & Beverage Assortment"
                className="w-full h-full object-cover rounded-2xl"
                style={{ maskImage: 'url(/images/logo-menu.png)', WebkitMaskImage: 'url(/images/logo-menu.png)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 