"use client";
import React, { useState } from "react";

export default function ProductImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 lg:h-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center rounded-xl p-2">
        <svg className="w-24 h-24 text-punjabac-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <img
          src={images[selected]}
          alt={title}
          width={600}
          height={400}
          className="w-full h-96 lg:h-full object-cover rounded-xl shadow p-2 bg-white"
        />
      </div>
      {images.length > 1 && (
        <div className="p-2 bg-gray-50 rounded-xl mt-2">
          <div className="flex space-x-3 overflow-x-auto">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white p-1 cursor-pointer border-2 ${selected === idx ? 'border-punjabac-brand' : 'border-transparent'}`}
                onClick={() => setSelected(idx)}
                style={{ transition: 'border 0.2s' }}
              >
                <img
                  src={image}
                  alt={`${title} - Image ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 