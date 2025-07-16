"use client";
import React, { useState } from "react";

export default function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 300;
  return (
    <div className="prose prose-gray max-w-none mb-8">
      <p className="text-gray-600 leading-relaxed text-lg">
        {expanded || !isLong
          ? description
          : description.slice(0, 300) + '...'}
      </p>
      {isLong && (
        <button
          className="mt-2 text-punjabac-brand underline font-semibold text-sm focus:outline-none"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
} 