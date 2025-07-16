"use client";
import React, { useState, useRef } from "react";

const API_URL = "https://punjabac-admin.vercel.app/api/suppliers";

export default function BecomeASupplierPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    addressStreet: "",
    addressCity: "",
    addressZip: "",
    addressCountry: "",
    ingredientsSupplied: "",
    foodSafetyAccreditations: "",
    website: "",
    message: "",
    newsletterSubscribed: false,
  });
  const [brochure, setBrochure] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 300 * 1024 * 1024 && /pdf|docx?|pptx?$/i.test(file.name)) {
      setBrochure(file);
      setUploadError("");
    } else {
      setBrochure(null);
      setUploadError("Only PDF, DOC, DOCX, PPT, PPTX files up to 300MB are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 300 * 1024 * 1024 && /pdf|docx?|pptx?$/i.test(file.name)) {
      setBrochure(file);
      setUploadError("");
    } else {
      setBrochure(null);
      setUploadError("Only PDF, DOC, DOCX, PPT, PPTX files up to 300MB are allowed.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("companyName", form.companyName);
      formData.append("jobTitle", form.jobTitle);
      formData.append("address.street", form.addressStreet);
      formData.append("address.city", form.addressCity);
      formData.append("address.zip", form.addressZip);
      formData.append("address.country", form.addressCountry);
      formData.append("ingredientsSupplied", form.ingredientsSupplied);
      formData.append("foodSafetyAccreditations", form.foodSafetyAccreditations);
      formData.append("website", form.website);
      formData.append("message", form.message);
      formData.append("newsletterSubscribed", String(form.newsletterSubscribed));
      if (brochure) formData.append("brochure", brochure);
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        jobTitle: "",
        addressStreet: "",
        addressCity: "",
        addressZip: "",
        addressCountry: "",
        ingredientsSupplied: "",
        foodSafetyAccreditations: "",
        website: "",
        message: "",
        newsletterSubscribed: false,
      });
      setBrochure(null);
    } catch (err) {
      setError("There was an error submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Become a Supplier</h1>
      <p className="mb-6 text-gray-600">Complete the form below and we’ll get back to you as soon as possible.</p>
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Thank you! We’ll get back to you soon.</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" className="input" />
          <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" className="input" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email Address*" className="input" />
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number*" className="input" />
        </div>
        <input name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Company Name*" className="input" />
        <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required placeholder="Job Title*" className="input" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="addressStreet" value={form.addressStreet} onChange={handleChange} required placeholder="Street Address" className="input" />
          <input name="addressCity" value={form.addressCity} onChange={handleChange} required placeholder="City" className="input" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="addressZip" value={form.addressZip} onChange={handleChange} required placeholder="ZIP / Postal Code" className="input" />
          <input name="addressCountry" value={form.addressCountry} onChange={handleChange} required placeholder="Country" className="input" />
        </div>
        <textarea name="ingredientsSupplied" value={form.ingredientsSupplied} onChange={handleChange} required placeholder="What ingredients do you supply?*" className="input" rows={2} />
        <textarea name="foodSafetyAccreditations" value={form.foodSafetyAccreditations} onChange={handleChange} required placeholder="Please confirm your food safety accreditation(s)*" className="input" rows={2} />
        <div>
          <label className="block font-medium mb-1">Brochure or Presentation Upload</label>
          <div
            className="border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {brochure ? (
              <span>{brochure.name}</span>
            ) : (
              <span>Drag & drop or click to browse<br />No file chosen<br />Max. file size: 300 MB.</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploadError && <div className="text-red-600 text-sm mt-1">{uploadError}</div>}
        </div>
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website (https://)" className="input" />
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Message*" className="input" rows={3} />
        <div className="flex items-center">
          <input type="checkbox" name="newsletterSubscribed" checked={form.newsletterSubscribed} onChange={handleChange} className="mr-2" />
          <label htmlFor="newsletterSubscribed">Subscribe to our newsletter?</label>
        </div>
        <div className="text-xs text-gray-500 mb-2">By sending us your information, you agree to our Privacy Policy.</div>
        <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}

// Add some basic input styling
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const inputClass = "w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-200";
export function Input(props: InputProps) {
  return <input {...props} className={inputClass + (props.className ? " " + props.className : "")}/>;
} 