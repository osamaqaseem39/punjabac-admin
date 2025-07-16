import React from 'react';

const features = [
  {
    icon: (
      <img src="/images/global.jpg" alt="Global Sourcing" className="w-12 h-12 object-cover rounded-full" />
    ),
    title: 'Global Sourcing Power',
    desc: 'We connect you to the world’s finest food and beverage products, sourcing directly from trusted producers worldwide.',
  },
  {
    icon: (
      <img src="/images/quality.jpg" alt="Quality Assurance" className="w-12 h-12 object-cover rounded-full" />
    ),
    title: 'Quality Assurance',
    desc: 'Every shipment is rigorously checked for quality and safety, ensuring only the best reaches your business.',
  },
  {
    icon: (
      <img src="/images/shipping.jpg" alt="Reliable & On-Time Delivery" className="w-12 h-12 object-cover rounded-full" />
    ),
    title: 'Reliable & On-Time Delivery',
    desc: 'Our logistics expertise ensures your goods arrive safely and on schedule, every time, anywhere in the world.',
  },
];

const WhyChooseUs = () => (
  <section className="py-16 bg-white">
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="font-bold text-richCharcoal mb-4" style={{ fontSize: '60px' }}>
          Why Choose Wingz Impex?
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          We are your trusted partner in food and beverage trading—delivering quality, reliability, and global reach to help your business thrive.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] ${idx === 1 ? 'bg-[#2d2d2d] text-white' : 'bg-[#ede7de]'} text-left`}
          >
            <div className="w-full h-48">
              {React.cloneElement(feature.icon, { className: 'w-full h-full object-cover rounded-t-3xl' })}
            </div>
            <div className="p-8">
              <h3 className={`text-2xl font-bold mb-3 ${idx === 1 ? 'text-white' : 'text-[#2d2d2d]'}`}>{feature.title}</h3>
              <p className={`text-lg ${idx === 1 ? 'text-white/90' : 'text-[#2d2d2d]'}`}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs; 