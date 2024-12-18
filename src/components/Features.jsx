import React from "react";
import { FaPalette, FaSearch, FaShareAlt, FaMagic } from "react-icons/fa";
import "./animations.css"; // Import animations CSS

const Features = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-600">PaletteBloom?</span>
          </h2>
          <p className="text-lg text-gray-700">
            Explore, create, and share stunning color palettes to fuel your designs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Feature 1 - Explore Palettes */}
          <div className="p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp">
            <FaSearch className="text-5xl text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">Explore Palettes</h3>
            <p className="text-gray-700 leading-relaxed">
              Discover a wide range of curated and unique color palettes for any project.
            </p>
          </div>

          {/* Feature 2 - Create Palettes */}
          <div className="p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp delay-150">
            <FaPalette className="text-5xl text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">Create Your Own</h3>
            <p className="text-gray-700 leading-relaxed">
              Generate unique palettes with one click or fine-tune every color to perfection.
            </p>
          </div>

          {/* Feature 3 - Share Palettes */}
          <div className="p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp delay-300">
            <FaShareAlt className="text-5xl text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">Share Instantly</h3>
            <p className="text-gray-700 leading-relaxed">
              Seamlessly share your favorite palettes with teams, friends, or online communities.
            </p>
          </div>

          {/* Feature 4 - Instant Inspiration */}
          <div className="p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp delay-450">
            <FaMagic className="text-5xl text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">Instant Inspiration</h3>
            <p className="text-gray-700 leading-relaxed">
              Get inspired with endless combinations of colors designed to spark creativity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
