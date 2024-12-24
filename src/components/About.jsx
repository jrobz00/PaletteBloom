import React from "react";

const About = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Content - Image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://i.imgur.com/GNTrYx0.jpeg" // Replace with your actual image
              alt="About Us"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Content - Text */}
        <div className="md:w-1/2 text-left md:ml-12 lg:ml-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
           <span className="text-black">About</span><span className="text-blue-600">Us</span><span className="text-black">?</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            PaletteBloom helps you discover and generate color palettes for all your creative
            needs. Whether it's for websites, branding, or design projects, we bring you
            the perfect blend of inspiration and functionality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
