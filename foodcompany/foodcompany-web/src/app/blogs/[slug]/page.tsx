import React from 'react';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await axios.get(`https://punjabac-admin.vercel.app/api/blogs/${slug}`);
    const data = res.data;
    return data.status === 'published' ? data : null;
  } catch (error) {
    return null;
  }
}

function formatBlogContent(text: string) {
  // Headings
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  // Bold and italic
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<em>$1</em>');
  // Lists
  text = text.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>');
  // Code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  // Blockquotes
  text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Horizontal lines
  text = text.replace(/^---$/gm, '<hr>');
  // Links and images
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="blog-img" />');
  // Alignment tags
  text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');
  return text;
}

export async function generateStaticParams() {
  try {
    const res = await axios.get('https://punjabac-admin.vercel.app/api/blogs');
    const blogs = res.data;
    return (blogs || [])
      .filter((blog: any) => blog.status === 'published')
      .map((blog: any) => ({ slug: blog.slug }));
  } catch (error) {
    return [];
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you are looking for does not exist or is not published.</p>
        <a href="/blogs" className="text-punjabac-brand hover:underline">← Back to Blogs</a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <span className="block mb-4 text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-8 shadow-lg border blog-img"
        />
      )}
      <div className="prose prose-lg max-w-none text-gray-800 blog-content" style={{lineHeight: '1.8'}} dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }} />
      <a href="/blogs" className="inline-block mt-8 text-punjabac-brand hover:underline">← Back to Blogs</a>
    </main>
  );
} 