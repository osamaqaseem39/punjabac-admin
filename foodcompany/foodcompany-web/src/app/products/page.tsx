'use client';

import React, { useEffect, useState } from 'react';
import { productsApi, Product } from '../../services/api';
import AutoCompanies from '../../components/AutoCompanies';
import ProductCard from '../../components/ProductCard';
import GetAQuoteForm from '../../components/GetAQuoteForm';
import Image from 'next/image';
import CategoryStack from "@/components/CategoryStack";
import type { CategoryData } from "@/components/CategoryStack";

const mockCategories: CategoryData[] = [
  {
    title: "Food Items",
    description:
      "Explore a wide range of quality food items sourced from trusted suppliers, ensuring freshness and taste in every bite.",
    image: "/images/products/Condenser.png", // Replace with actual image
    buttonText: "View Food Items",
    variant: "right",
  },
  {
    title: "Beverages",
    description:
      "Discover our selection of beverages, from refreshing juices to energizing drinks, perfect for any occasion.",
    image: "/images/brands/coolgear.png", // Replace with actual image
    buttonText: "View Beverages",
    variant: "left",
  },
  {
    title: "Fresh Fruits",
    description:
      "Enjoy the freshest fruits, handpicked and delivered to you with care for maximum nutrition and flavor.",
    image: "/images/breeze.webp", // Replace with actual image
    buttonText: "View Fresh Fruits",
    variant: "right",
  },
  {
    title: "Utensils",
    description:
      "Browse our collection of utensils designed for convenience and durability in your kitchen or business.",
    image: "/images/companies/bmw.png", // Replace with actual image
    buttonText: "View Utensils",
    variant: "left",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] py-12 px-4">
      <h1 className="text-6xl font-bold text-[#d6d1c0] mb-12">Our Categories</h1>
      <CategoryStack categories={mockCategories} />
    </main>
  );
} 