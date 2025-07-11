import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi, blogApi, serviceApi, Product, Blog, Service } from '../../services/api';
import PageMeta from "../../components/common/PageMeta";

export default function Ecommerce() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productApi.getAll(),
      blogApi.getAll(),
      serviceApi.getAll()
    ]).then(([prodRes, blogRes, servRes]) => {
      setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
      setBlogs(Array.isArray(blogRes.data) ? blogRes.data : []);
      setServices(Array.isArray(servRes.data) ? servRes.data : []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageMeta
        title="Dashboard"
        description="Welcome to your dashboard."
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to the Admin Dashboard!</h1>
        <p className="text-gray-600">Manage your products, blogs, and services from one place.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-600">{products.length}</span>
          <span className="mt-2 text-lg font-semibold">Products</span>
        </div>
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-600">{blogs.length}</span>
          <span className="mt-2 text-lg font-semibold">Blogs</span>
        </div>
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-600">{services.length}</span>
          <span className="mt-2 text-lg font-semibold">Services</span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">Loading...</div>
      ) : (
        <>
          {/* Products Row */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Recent Products</h2>
              <Link to="/products" className="text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.slice(0, 3).map(product => (
                <div key={product._id} className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex flex-col">
                  {product.featuredImage && (
                    <img src={product.featuredImage.replace('server/', '')} alt={product.title} className="h-32 w-full object-cover rounded mb-2" />
                  )}
                  <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                  <Link to={`/products/${product._id}`} className="text-blue-600 text-sm hover:underline mt-auto">View</Link>
                </div>
              ))}
              {products.length === 0 && <div className="col-span-3 text-gray-500">No products found.</div>}
            </div>
          </div>
          {/* Blogs Row */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Recent Blogs</h2>
              <Link to="/blog" className="text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogs.slice(0, 3).map(blog => (
                <div key={blog._id} className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex flex-col">
                  <h3 className="font-semibold text-lg mb-1">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{blog.content.substring(0, 100)}...</p>
                  <Link to={`/blog/${blog.slug}`} className="text-blue-600 text-sm hover:underline mt-auto">View</Link>
                </div>
              ))}
              {blogs.length === 0 && <div className="col-span-3 text-gray-500">No blogs found.</div>}
            </div>
          </div>
          {/* Services Row */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Recent Services</h2>
              <Link to="/services" className="text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.slice(0, 3).map(service => (
                <div key={service._id} className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 flex flex-col">
                  {service.featuredImage && (
                    <img src={service.featuredImage.replace('server/', '')} alt={service.title} className="h-32 w-full object-cover rounded mb-2" />
                  )}
                  <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{service.description}</p>
                  <Link to={`/services/${service._id}`} className="text-blue-600 text-sm hover:underline mt-auto">View</Link>
                </div>
              ))}
              {services.length === 0 && <div className="col-span-3 text-gray-500">No services found.</div>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
