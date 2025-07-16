"use client";
import React, { useState } from "react";

export default function GetQuotePage() {
  const [form, setForm] = useState<{ name: string; email: string; phone: string; details: string; image: File | null }>({
    name: "",
    email: "",
    phone: "",
    details: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as unknown as { name: string; value: string; files: FileList | null };
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("details", form.details);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccess("Your quote request has been submitted! We'll contact you soon.");
        setForm({ name: "", email: "", phone: "", details: "", image: null });
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-punjabac-brand mb-6 text-center">Get a Quote</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-punjabac-brand focus:border-punjabac-brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-punjabac-brand focus:border-punjabac-brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-punjabac-brand focus:border-punjabac-brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Details *</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-punjabac-brand focus:border-punjabac-brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          {success && <div className="text-green-600 font-medium text-center">{success}</div>}
          {error && <div className="text-red-600 font-medium text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-punjabac-brand text-white font-semibold py-3 rounded-lg hover:bg-punjabac-brand-light transition-colors"
          >
            {loading ? "Submitting..." : "Submit Quote Request"}
          </button>
        </form>
      </div>
    </main>
  );
} 