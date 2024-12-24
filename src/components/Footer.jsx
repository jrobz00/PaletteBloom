import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 text-gray-700">
      <div className="container mx-auto px-6 text-center">
        {/* Social Links */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/PaletteBloom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.713-2.164-10.141-5.144-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.809 2.107-6.102 2.107-.396 0-.788-.023-1.174-.068 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.001-7.5 14.001-14 0-.213-.004-.425-.014-.636.961-.694 1.796-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.789-1.75-1.764s.784-1.764 1.75-1.764 1.75.789 1.75 1.764-.784 1.764-1.75 1.764zm13.5 10.268h-3v-4.5c0-1.083-.417-1.826-1.417-1.826-.764 0-1.166.534-1.358 1.048-.073.171-.091.409-.091.647v4.631h-3s.039-7.519 0-8.268h3v1.164c.4-.615 1.113-1.492 2.711-1.492 1.981 0 3.455 1.296 3.455 4.083v4.513z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Centered Copyright Text */}
        <p className="text-sm text-gray-500">
          &copy; 2024 PaletteBloom. All rights reserved. - Made with ❤️ by Joseph Robinson
        </p>
      </div>
    </footer>
  );
};

export default Footer;
