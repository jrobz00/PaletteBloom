import React from "react";

const Mission = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-gray-700">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-blue-600">Mission</span>
          </h1>
          <p className="text-lg text-gray-600">
            Driving innovation and creativity for a better tomorrow.
          </p>
        </div>

        {/* Mission Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Creating Tools that Inspire
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              At <span className="font-bold text-blue-600">PaletteBloom</span>, our mission is to enable
              creators, designers, and developers to achieve their highest potential. We are
              committed to building a platform that fuels creativity, drives innovation,
              and inspires collaboration.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-4">
              <li>
                <span className="font-bold text-gray-900">Empowering Creativity:</span> Provide
                accessible tools that help users turn their ideas into reality.
              </li>
              <li>
                <span className="font-bold text-gray-900">Seamless Collaboration:</span> Foster
                environments where individuals and teams can work together effortlessly.
              </li>
              <li>
                <span className="font-bold text-gray-900">Accessibility for All:</span> Ensure
                inclusivity by designing tools that cater to users of all skill levels.
              </li>
              <li>
                <span className="font-bold text-gray-900">Continuous Innovation:</span> Adapt and
                evolve with emerging technologies to stay ahead of the curve.
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="#features"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
              >
                Explore Our Features
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://i.imgur.com/6W5MMno.png" // Replace with your actual image
              alt="Mission"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
