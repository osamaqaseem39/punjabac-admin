'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Company', href: '/company' },
  { label: 'Updates', href: '/updates' },
  { label: 'Resources', href: '/resources' },
  { label: 'Become A Supplier', href: '/become-a-supplier' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${scrolled ? 'bg-white' : 'bg-[#fafafa]'} border-b border-[#ececec] sticky top-0 z-50 transition-colors duration-500 ease-in-out`}>
      <div className={`max-w-[1600px] mx-auto flex items-center justify-between ${scrolled ? 'py-1.5 px-4' : 'py-3 px-4'} transition-all duration-500 ease-in-out`}>
        {/* Logo + Brand Name */}
        <div className="flex items-center min-w-[220px]">
          <img
            src="/images/logo-menu.png"
            alt="Wingz Impex Logo"
            width={scrolled ? 120 : 180}
            height={scrolled ? 120 : 180}
            className={`object-contain mr-3 transition-all duration-500 ease-in-out ${scrolled ? 'w-16 h-16' : 'w-24 h-24'}`}
          />
          <div>
            <span className="block font-bold text-2xl text-[#49594b] leading-tight">Wingz</span>
            <span className="block font-bold text-2xl text-[#49594b] leading-tight">Impex</span>
          </div>
        </div>
        {/* Centered Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-3">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full bg-[#ede7de] text-[#2d2d2d] font-semibold text-base px-6 py-2 transition-colors duration-150 hover:bg-[#e2d7c3] hover:text-[#2d2d2d] focus:bg-[#e2d7c3] focus:text-[#2d2d2d]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Right Side: Contact & Search */}
        <div className="flex items-center gap-3 min-w-[120px] justify-end">
          <Link
            href="/contact"
            className="bg-[#405a4d] hover:bg-[#2e3e2c] text-white font-bold px-7 py-2 rounded-full text-base transition-colors shadow"
          >
            Contact
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ede7de] hover:bg-[#e2d7c3] transition-colors">
            <svg className="w-5 h-5 text-[#49594b]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
