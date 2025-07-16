"use client";

import React, { useState } from "react";
import { api } from "@/services/api";

interface GetAQuoteFormProps {
  title?: string;
  buttonText?: string;
  successMessage?: string;
  className?: string;
  layout?: "single" | "double"; // New prop for layout control
}

const GetAQuoteForm: React.FC<GetAQuoteFormProps> = ({
  title = "Get a Quote",
  buttonText = "Submit Quote Request",
  successMessage = "Your quote request has been submitted! We'll contact you soon.",
  className = "",
  layout = "double", // Default to double column
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as { name: string; value: string; files?: FileList };
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        details: form.details,
      };
      await api.post("/quotes", payload);
      setSuccess(successMessage);
      setForm({ name: "", email: "", phone: "", details: "", image: null });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'error' in err.response.data &&
        typeof err.response.data.error === 'string'
      ) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Determine grid classes based on layout
  const getGridClasses = () => {
    if (layout === "single") {
      return "grid grid-cols-1 gap-6";
    }
    return "grid grid-cols-1 md:grid-cols-2 gap-6";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 bg-white rounded-xl shadow-lg p-8 ${className}`}
      encType="multipart/form-data"
    >
      {title && <h2 className="text-2xl font-bold text-punjabac-brand mb-4 text-center">{title}</h2>}
      
      <div className={getGridClasses()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe your project requirements, specifications, or any specific needs..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent text-left h-[90px] min-h-[90px] resize-y"
          />
        </div>
      </div>
      {/* Removed image upload field */}
      {success && <div className="text-green-600 font-medium text-center mt-2">{success}</div>}
      {error && <div className="text-red-600 font-medium text-center mt-2">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-punjabac-brand text-white py-3 px-6 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors text-left mt-2"
      >
        {loading ? "Submitting..." : buttonText}
      </button>
    </form>
  );
};

export default GetAQuoteForm; 