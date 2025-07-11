import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Blog, blogApi } from '../../services/api';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogApi.getAll();
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.delete(_id);
        setBlogs(blogs.filter(blog => blog._id !== _id));
        setError(null);
      } catch (err) {
        setError('Failed to delete blog. Please try again later.');
        console.error('Error deleting blog:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Blog Posts</h1>
        <Link
          to="/blog/add"
          className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
        >
          Add New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {blog.content.substring(0, 150)}...
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-brand-500 hover:text-brand-600 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View
                </Link>
                <Link
                  to={`/blog/edit/${blog._id}`}
                  className="text-blue-500 hover:text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-600 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 