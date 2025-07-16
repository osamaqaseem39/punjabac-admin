import axios from "axios";

const API_BASE_URL = 'https://punjabac-admin.vercel.app/api';
const ADMIN_BASE_URL = 'https://punjabac.osamaqaseem.online';

// Create and export an Axios instance for API calls
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Utility function to get full image URL
export const getImageUrl = (imagePath: string | undefined, type: 'products' | 'services' = 'products'): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  } else if (imagePath.startsWith('/uploads/')) {
    return `${ADMIN_BASE_URL}${imagePath}`;
  } else {
    return `${ADMIN_BASE_URL}/uploads/${type}/${imagePath}`;
  }
};

export interface Product {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  gallery?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

// Utility function to generate slug
function generateSlug(title: string, id: string): string {
  const cleanTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${cleanTitle}-${id}`;
}

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    try {
      // Extract ID from slug
      const parts = slug.split('-');
      const id = parts[parts.length - 1];
      
      // Fetch by ID
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();
      
      // Verify the slug matches
      const expectedSlug = generateSlug(product.title, product._id);
      if (slug !== expectedSlug) {
        return null; // Slug doesn't match, return null
      }
      
      return product;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  },

  generateSlug: (title: string, id: string): string => {
    return generateSlug(title, id);
  }
};

// Services API
export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Service | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  },

  getBySlug: async (slug: string): Promise<Service | null> => {
    try {
      // Extract ID from slug
      const parts = slug.split('-');
      const id = parts[parts.length - 1];
      
      // Fetch by ID
      const response = await fetch(`${API_BASE_URL}/services/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      const service = await response.json();
      
      // Verify the slug matches
      const expectedSlug = generateSlug(service.title, service._id);
      if (slug !== expectedSlug) {
        return null; // Slug doesn't match, return null
      }
      
      return service;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      return null;
    }
  },

  generateSlug: (title: string, id: string): string => {
    return generateSlug(title, id);
  }
};

// Blogs API
export const blogsApi = {
  getAll: async (): Promise<Blog[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      return Array.isArray(data) ? data.filter(blog => blog.status === 'published') : [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Blog | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const blog = await response.json();
      return blog.status === 'published' ? blog : null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  }
}; 