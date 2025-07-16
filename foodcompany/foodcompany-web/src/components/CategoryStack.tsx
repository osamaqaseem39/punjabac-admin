import React from "react";

interface CategoryData {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  variant?: "left" | "right";
}

interface CategoryStackProps {
  categories: CategoryData[];
}

export type { CategoryData };

const STICKY_HEADER_HEIGHT = 88; // px, adjust if your header is taller/shorter
const CARD_OFFSET = 100; // px, vertical offset between cards

const CategoryStack: React.FC<CategoryStackProps> = ({ categories }) => {
  return (
    <div className="relative flex flex-col items-center" style={{ scrollBehavior: 'smooth', paddingTop: STICKY_HEADER_HEIGHT }}>
      {categories.map((cat, idx) => {
        return (
          <section
            key={cat.title}
            className={`flex w-[1600px] rounded-3xl overflow-hidden min-h-[350px] bg-[#ede7de] shadow-lg animate-fade-in-up${idx !== categories.length - 1 ? ' mb-8' : ''} self-center`}
            style={{
              position: "sticky",
              top: `${STICKY_HEADER_HEIGHT}px`, // Each card is higher than the previous
              zIndex: idx + 1, // First card at the bottom, next cards above
              boxShadow: idx !== 0 ? "0 8px 32px rgba(0,0,0,0.08)" : undefined,
              transition: 'top 0.5s cubic-bezier(0.4,0,0.2,1)',
              animationDelay: `${idx * 200}ms`,
            }}
          >
            {/* Variant: image left or right */}
            {cat.variant === "left" ? (
              <>
                <div className="w-1/2 h-full flex items-center justify-center bg-gray-200">
                  <img src={cat.image} alt={cat.title} className="object-cover w-full h-full" />
                </div>
                <div className="w-1/2 flex flex-col justify-center p-10">
                  <h2 className="text-4xl font-bold mb-4 text-[#2d2d2d]">{cat.title}</h2>
                  <p className="mb-6 text-lg text-[#2d2d2d]">{cat.description}</p>
                  {cat.buttonText && (
                    <button className="px-6 py-3 rounded-full bg-[#405a4d] text-white font-semibold hover:bg-[#2e3e2c] transition w-48">
                      {cat.buttonText}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-1/2 flex flex-col justify-center p-10">
                  <h2 className="text-4xl font-bold mb-4 text-[#2d2d2d]">{cat.title}</h2>
                  <p className="mb-6 text-lg text-[#2d2d2d]">{cat.description}</p>
                  {cat.buttonText && (
                    <button className="px-6 py-3 rounded-full bg-[#405a4d] text-white font-semibold hover:bg-[#2e3e2c] transition w-48">
                      {cat.buttonText}
                    </button>
                  )}
                </div>
                <div className="w-1/2 h-full flex items-center justify-center bg-gray-200">
                  <img src={cat.image} alt={cat.title} className="object-cover w-full h-full" />
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default CategoryStack; 