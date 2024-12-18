import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Vision = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-gray-700">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-blue-600">Vision</span>
          </h1>
          <p className="text-lg text-gray-600">
            A glimpse into the future we aspire to build.
          </p>
        </div>

        {/* Vision Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://i.imgur.com/6W5MMno.png" // Replace with your actual image
              alt="Vision"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right: Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering Creators, Innovators, and Dreamers
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              At <span className="font-bold text-blue-600">PaletteBloom</span>, we envision a world
              where creativity flows without boundaries. Our mission is to
              provide tools that bridge the gap between imagination and
              realization, empowering individuals and teams to bring their
              visions to life.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-4">
              <li>
                <span className="font-bold text-gray-900">Innovation First:</span> Constantly evolve
                our platform with cutting-edge features like AI-powered tools,
                advanced customizations, and seamless integrations.
              </li>
              <li>
                <span className="font-bold text-gray-900">Global Reach:</span> Foster a global
                community of creators, designers, and developers who inspire and
                learn from one another.
              </li>
              <li>
                <span className="font-bold text-gray-900">Sustainability:</span> Develop sustainable
                practices and tools to ensure our impact remains positive for
                people and the planet.
              </li>
              <li>
                <span className="font-bold text-gray-900">Empowerment:</span> Offer intuitive and
                powerful tools for users at every skill level, from beginners to
                professionals.
              </li>
            </ul>
            <div className="mt-8">
              {/* Use Link to navigate to the About page */}
              <Link
                to="/about" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
