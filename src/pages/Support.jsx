import React from "react";

const Support = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-gray-700">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Need <span className="text-blue-600">Help?</span>
          </h1>
          <p className="text-lg text-gray-600">
            We're here to assist you every step of the way.
          </p>
        </div>

        {/* Support Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
            <ul className="space-y-6">
              <li>
                <h3 className="text-lg font-semibold text-gray-900">
                  How can I reset my password?
                </h3>
                <p className="text-gray-700">
                  You can reset your password by clicking on the "Forgot
                  Password" link on the login page and following the
                  instructions.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-900">
                  Where can I upgrade my plan?
                </h3>
                <p className="text-gray-700">
                  You can upgrade your plan by visiting the{" "}
                  <a href="/prices" className="text-blue-600 underline">
                    Pricing Page
                  </a>
                  .
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-900">
                  How do I export my palettes?
                </h3>
                <p className="text-gray-700">
                  Use the export feature on the palette generator page to save
                  your palettes as JSON, CSS, or TXT files.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-gray-900">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-700">
                  Yes, you can cancel your subscription anytime by visiting your
                  account settings.
                </p>
              </li>
            </ul>
          </div>

          {/* Right: Contact Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-6">
              If you have any questions or need further assistance, feel free to
              reach out to our support team.
            </p>
            <ul className="space-y-4">
              <li>
                <span className="font-bold text-gray-900">Email:</span>{" "}
                <a
                  href="mailto:support@palettebloom.com"
                  className="text-blue-600 underline"
                >
                  support@palettebloom.com
                </a>
              </li>
              <li>
                <span className="font-bold text-gray-900">Phone:</span>{" "}
                <a href="tel:+1234567890" className="text-blue-600 underline">
                  +1 234 567 890
                </a>
              </li>
              <li>
                <span className="font-bold text-gray-900">Live Chat:</span>{" "}
                <a href="/chat" className="text-blue-600 underline">
                  Start a Chat
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Troubleshooting Resources */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Troubleshooting Resources
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Explore our guides and resources to resolve common issues.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/guides"
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-900 font-medium transition"
            >
              User Guides
            </a>
            <a
              href="/troubleshooting"
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-900 font-medium transition"
            >
              Troubleshooting
            </a>
            <a
              href="/community"
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-900 font-medium transition"
            >
              Community Forum
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
