import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'https://punjabac-admin.vercel.app/api' 
  : 'https://punjabac-admin.vercel.app/api';

// Add auth token to requests if it exists
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
}
export interface CreateBlogInput {
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
}

export interface UpdateBlogInput {
  title: string;
  content: string;
  status: 'draft' | 'published';
  featuredImage?: string;
}

export const blogApi = {
  getAll: () => axios.get<Blog[]>(`${BASE_URL}/blogs`),
  
  getById: (_id: string) => axios.get<Blog>(`${BASE_URL}/blogs/id/${_id}`),
  
  getBySlug: (slug: string) => axios.get<Blog>(`${BASE_URL}/blogs/${slug}`),
  
  create: (data: CreateBlogInput) => 
    axios.post<Blog>(`${BASE_URL}/blogs`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }),
  
  update: (_id: string, data: Partial<UpdateBlogInput>) => 
    axios.put<Blog>(`${BASE_URL}/blogs/${_id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }),
  
  delete: (_id: string) => axios.delete(`${BASE_URL}/blogs/${_id}`),
};

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface CurrentUserResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const authApi = {
  login: (data: LoginInput) => 
    axios.post<AuthResponse>(`${BASE_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }),
  
  register: (data: RegisterInput) => 
    axios.post<AuthResponse>(`${BASE_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }),

  getCurrentUser: () => 
    axios.get<CurrentUserResponse>(`${BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }),
}; 

export interface AutoCompany {
  _id: string;
  name: string;
  image?: string;
}

export interface CreateAutoCompanyInput {
  name: string;
  image?: string;
}

export interface UpdateAutoCompanyInput {
  name?: string;
  image?: string;
}

export const autoCompanyApi = {
  getAll: () => axios.get<AutoCompany[]>(`${BASE_URL}/autoCompanies`),
  getById: (id: string) => axios.get<AutoCompany>(`${BASE_URL}/autoCompanies/${id}`),
  create: (data: CreateAutoCompanyInput) => axios.post<AutoCompany>(`${BASE_URL}/autoCompanies`, data, { headers: { 'Content-Type': 'application/json' } }),
  update: (id: string, data: UpdateAutoCompanyInput) => axios.put<AutoCompany>(`${BASE_URL}/autoCompanies/${id}`, data, { headers: { 'Content-Type': 'application/json' } }),
  delete: (id: string) => axios.delete(`${BASE_URL}/autoCompanies/${id}`),
};

export interface Product {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  gallery?: string[];
  category?: string;
  brand?: string;
  featured?: boolean;
  autoCompanies?: string[];
  benefits?: string[];
  compatibleBrands?: (string | Brand)[];
}

export interface CreateProductInput {
  title: string;
  description: string;
  featuredImage?: File;
  gallery?: File[];
  category?: string;
  brand?: string;
  featured?: boolean;
  autoCompanies?: string[];
  benefits?: string[];
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  featuredImage?: File;
  gallery?: File[];
  category?: string;
  brand?: string;
  featured?: boolean;
  autoCompanies?: string[];
  benefits?: string[];
}

export const productApi = {
  getAll: () => axios.get<Product[]>(`${BASE_URL}/products`),
  getById: (id: string) => axios.get<Product>(`${BASE_URL}/products/${id}`),
  create: (data: FormData) =>
    axios.post<Product>(`${BASE_URL}/products`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (id: string, data: FormData) =>
    axios.put<Product>(`${BASE_URL}/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: (id: string) => axios.delete(`${BASE_URL}/products/${id}`),
}; 

export interface Benefit {
  _id: string;
  name: string;
  description?: string;
  type: 'product' | 'service';
}

export interface CreateBenefitInput {
  name: string;
  description?: string;
  type: 'product' | 'service';
}

export interface UpdateBenefitInput {
  name?: string;
  description?: string;
  type?: 'product' | 'service';
}

export const benefitApi = {
  getAll: (params?: { type?: string }) => {
    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    return axios.get<Benefit[]>(`${BASE_URL}/benefits${queryParams}`);
  },
  getById: (id: string) => axios.get<Benefit>(`${BASE_URL}/benefits/${id}`),
  create: (data: CreateBenefitInput) => axios.post<Benefit>(`${BASE_URL}/benefits`, data, { headers: { 'Content-Type': 'application/json' } }),
  update: (id: string, data: UpdateBenefitInput) => axios.put<Benefit>(`${BASE_URL}/benefits/${id}`, data, { headers: { 'Content-Type': 'application/json' } }),
  delete: (id: string) => axios.delete(`${BASE_URL}/benefits/${id}`),
};

export interface Service {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  benefits?: Benefit[]; // Populated
  tags?: string[];
}

export interface CreateServiceInput {
  title: string;
  description: string;
  featuredImage?: string;
  benefits?: string[]; // Array of benefit IDs
  tags?: string[];
}

export interface UpdateServiceInput {
  title?: string;
  description?: string;
  featuredImage?: string;
  benefits?: string[]; // Array of benefit IDs
  tags?: string[];
}

export const serviceApi = {
  getAll: () => axios.get<Service[]>(`${BASE_URL}/services`),
  getById: (id: string) => axios.get<Service>(`${BASE_URL}/services/${id}`),
  create: (data: CreateServiceInput) =>
    axios.post<Service>(`${BASE_URL}/services`, data, {
      headers: { 'Content-Type': 'application/json' }
    }),
  update: (id: string, data: UpdateServiceInput) =>
    axios.put<Service>(`${BASE_URL}/services/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    }),
  delete: (id: string) => axios.delete(`${BASE_URL}/services/${id}`),
}; 

export interface Query {
  _id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  image?: string;
  subject: 'feedback' | 'query';
  status: string;
  createdAt: string;
}

export interface CreateQueryInput {
  name: string;
  email: string;
  phone: string;
  details: string;
  image?: string;
  subject: 'feedback' | 'query';
}

export interface UpdateQueryInput {
  name?: string;
  email?: string;
  phone?: string;
  details?: string;
  image?: string;
  subject?: 'feedback' | 'query';
  status?: string;
}

export const queryApi = {
  getAll: () => axios.get<Query[]>(`${BASE_URL}/queries`),
  getById: (id: string) => axios.get<Query>(`${BASE_URL}/queries/${id}`),
  update: (id: string, data: Partial<Query>) =>
    axios.put<Query>(`${BASE_URL}/queries/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    }),
  delete: (id: string) => axios.delete(`${BASE_URL}/queries/${id}`),
};

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  image?: string;
}

export const categoryApi = {
  getAll: () => axios.get<Category[]>(`${BASE_URL}/categories`),
  getById: (id: string) => axios.get<Category>(`${BASE_URL}/categories/${id}`),
  create: (data: CreateCategoryInput) => axios.post<Category>(`${BASE_URL}/categories`, data, { headers: { 'Content-Type': 'application/json' } }),
  update: (id: string, data: UpdateCategoryInput) => axios.put<Category>(`${BASE_URL}/categories/${id}`, data, { headers: { 'Content-Type': 'application/json' } }),
  delete: (id: string) => axios.delete(`${BASE_URL}/categories/${id}`),
};

export interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface CreateBrandInput {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateBrandInput {
  name?: string;
  description?: string;
  image?: string;
}

export const brandApi = {
  getAll: () => axios.get<Brand[]>(`${BASE_URL}/brands`),
  getById: (id: string) => axios.get<Brand>(`${BASE_URL}/brands/${id}`),
  create: (data: CreateBrandInput) => axios.post<Brand>(`${BASE_URL}/brands`, data, { headers: { 'Content-Type': 'application/json' } }),
  update: (id: string, data: UpdateBrandInput) => axios.put<Brand>(`${BASE_URL}/brands/${id}`, data, { headers: { 'Content-Type': 'application/json' } }),
  delete: (id: string) => axios.delete(`${BASE_URL}/brands/${id}`),
};