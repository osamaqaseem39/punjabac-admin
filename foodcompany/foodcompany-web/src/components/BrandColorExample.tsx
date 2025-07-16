'use client';

import React from 'react';
import { colorSchemes } from '../styles/colors';

const BrandColorExample = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Punjab AC Brand Color Examples</h2>
      
      {/* Brand Color Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Brand Color: #001a33</h3>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-punjabac-brand rounded-lg"></div>
          <div>
            <p className="font-medium">Primary Brand Color</p>
            <p className="text-sm text-gray-600">Very Dark Navy Blue - #001a33</p>
          </div>
        </div>
      </div>

      {/* Button Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Examples</h3>
        <div className="flex flex-wrap gap-4">
          {/* Using colorSchemes */}
          <button className={colorSchemes.button.primary}>
            Primary Button
          </button>
          
          <button className={colorSchemes.button.secondary}>
            Secondary Button
          </button>
          
          {/* Using direct classes */}
          <button className="btn-punjabac-primary px-6 py-3 rounded-lg font-semibold">
            Custom Primary
          </button>
          
          <button className="btn-punjabac-secondary px-6 py-3 rounded-lg font-semibold">
            Custom Secondary
          </button>
        </div>
      </div>

      {/* Badge Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badge Examples</h3>
        <div className="flex flex-wrap gap-4">
          <span className={colorSchemes.badge.primary}>
            Primary Badge
          </span>
          
          <span className={colorSchemes.badge.secondary}>
            Secondary Badge
          </span>
          
          <span className="badge-punjabac">
            Custom Badge
          </span>
        </div>
      </div>

      {/* Text Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Examples</h3>
        <div className="space-y-2">
          <p className="text-punjabac-brand text-xl font-semibold">
            Brand Color Text
          </p>
          <p className="text-punjabac-brand-light">
            Light Brand Color Text
          </p>
          <p className="text-punjabac-brand-dark">
            Dark Brand Color Text
          </p>
          <a href="#" className="link-punjabac text-lg">
            Brand Color Link
          </a>
        </div>
      </div>

      {/* Card Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-punjabac bg-white p-6 rounded-xl">
            <h4 className="text-punjabac-brand font-semibold mb-2">Card with Brand Border</h4>
            <p className="text-gray-600">This card uses the custom brand color for borders and hover effects.</p>
          </div>
          
          <div className={`${colorSchemes.card.primary} p-6 rounded-xl`}>
            <h4 className="text-punjabac-brand font-semibold mb-2">Card with Brand Colors</h4>
            <p className="text-gray-600">This card uses the color scheme system.</p>
          </div>
        </div>
      </div>

      {/* Gradient Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gradient Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r-punjabac text-white p-6 rounded-xl">
            <h4 className="font-semibold mb-2">Brand Gradient</h4>
            <p>Custom gradient using brand colors.</p>
          </div>
          
          <div className="bg-gradient-to-br-punjabac text-white p-6 rounded-xl">
            <h4 className="font-semibold mb-2">Brand Gradient BR</h4>
            <p>Bottom-right gradient using brand colors.</p>
          </div>
        </div>
      </div>

      {/* Opacity Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Opacity Examples</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-punjabac-brand/10 p-4 rounded-lg border">
            <p className="text-sm">10% opacity</p>
          </div>
          <div className="bg-punjabac-brand/20 p-4 rounded-lg border">
            <p className="text-sm">20% opacity</p>
          </div>
          <div className="bg-punjabac-brand/50 p-4 rounded-lg border">
            <p className="text-sm">50% opacity</p>
          </div>
          <div className="bg-punjabac-brand/80 p-4 rounded-lg border">
            <p className="text-sm">80% opacity</p>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Direct CSS Classes:</strong> <code>bg-punjabac-brand</code>, <code>text-punjabac-brand</code></p>
          <p><strong>Color Constants:</strong> <code>colors.primary.brand</code>, <code>colors.primaryText.brand</code></p>
          <p><strong>Color Schemes:</strong> <code>colorSchemes.button.primary</code></p>
          <p><strong>Custom Components:</strong> <code>btn-punjabac-primary</code>, <code>card-punjabac</code></p>
        </div>
      </div>
    </div>
  );
};

export default BrandColorExample; 