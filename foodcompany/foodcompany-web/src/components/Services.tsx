'use client';

import React from 'react';
import CategoryStack, { CategoryData } from './CategoryStack';

const mockCategories: CategoryData[] = [
  {
    title: "Food Items",
    description:
      "Explore a wide range of quality food items sourced from trusted suppliers, ensuring freshness and taste in every bite.",
    image: "/images/categories/fooditems.jpg",
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

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6 text-[#2d2d2d]" style={{ fontSize: '60px' }}>
            Our Sectors
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-[#2d2d2d]">
            From food items to beverages and kitchen essentials, we serve a wide range of sectors with quality and reliability.
          </p>
        </div>
        <CategoryStack categories={mockCategories} />
      </div>
    </section>
  );
};

export default Services; 