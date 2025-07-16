import React from "react";

const WhoWeAre = () => (
  <section className="py-20 bg-[#f7f2ea] flex justify-center">
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] w-full mx-auto">
      {/* Left Card */}
      <div className="flex-1 bg-[#46624a] rounded-3xl p-12 flex flex-col justify-center min-h-[800px]">
        <h2 className="font-bold text-[#f7f2ea] mb-6" style={{ fontSize: '60px' }}>
          Who We Are
        </h2>
        <p className="text-lg text-[#f7f2ea] mb-8 max-w-lg">
          Wingz Impex is a leading food and beverage trading company, connecting you to the world’s finest products. With a commitment to quality, reliability, and global reach, we serve businesses and partners across continents.
        </p>
        <a
          href="/about"
          className="inline-block bg-white text-[#46624a] font-semibold px-8 py-3 rounded-full text-lg shadow hover:bg-[#e6e6e6] transition w-40 text-center"
        >
          About Us
        </a>
      </div>
      {/* Right Image */}
      <div className="flex-1 rounded-3xl overflow-hidden flex items-center justify-center min-h-[800px]">
        <img
          src="/images/aboutus.jpg"
          alt="Who We Are"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  </section>
);

export default WhoWeAre; 