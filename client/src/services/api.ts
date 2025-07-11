import axios from 'axios';

const BASE_URL = 'https://punjabac-admin.vercel.app/api';

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
}

export interface CreateBlogInput {
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
}

export interface UpdateBlogInput {
  title: string;
  content: string;
  status: 'draft' | 'published';
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
}; 