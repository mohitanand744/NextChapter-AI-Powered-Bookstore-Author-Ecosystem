import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComingSoonModal from "../../Modal/ComingSoonModal";

const Footer = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <footer className="relative rounded-t-[3rem] py-8 text-tan bg-coffee overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" 
      />
      <div className="relative z-10 container px-4 mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-12 gap-2">
          {/* About Section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="flex-shrink-0 w-36 mb-4">
              <Link to="/nextChapter">
                <img
                  className="object-cover w-full h-full"
                  src="/images/logo-transperant-light.png"
                  alt="BookStore Logo"
                />
              </Link>
            </div>
            <p className="font-medium text-tan/90 text-md">
              Welcome to our bookstore! We provide a wide range of books across
              all genres, from fiction to self-help. Explore, read, and grow
              with us.
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-span-6 lg:mx-auto md:col-span-6 lg:col-span-3">
            <h3 className="mb-4 text-lg font-bold text-tan">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/nextChapter/aboutUs"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter/books"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  Browse Books
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div className="col-span-6 md:col-span-6 lg:col-span-3">
            <h3 className="mb-4 text-lg font-bold text-tan">Buy Books</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/nextChapter/books"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  Hindi Books
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter/books"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  English Books
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter/books"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  Fantasy
                </Link>
              </li>
              <li>
                <Link
                  to="/nextChapter/books"
                  className="text-tan/80 transition text-md hover:text-cream "
                >
                  Other
                </Link>
              </li>
            </ul>
          </div>
          {/* Newsletter Section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h3 className="mb-4 text-lg font-bold text-tan">
              Stay Updated
            </h3>
            <p className="mb-4 font-medium text-tan/90 text-md">
              Subscribe to our newsletter for the latest books and offers.
            </p>
            <form className="relative flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-coffee bg-tan/10 border border-tan/20 rounded-full focus:outline-none focus:border-tan/40 placeholder:text-tan/50"
              />
              <button
                type="submit"
                className="absolute right-0 px-4 py-2 text-coffee transition bg-tan rounded-r-full hover:bg-cream hover:scale-105 font-bold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="font-medium text-tan/80 text-md">
            &copy; {new Date().getFullYear()} BookStore. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            {/* Facebook */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsComingSoonOpen(true); }}
              className="transition hover:text-tan "
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.785 4.658-4.785 1.325 0 2.464.099 2.796.143v3.243h-1.918c-1.505 0-1.796.715-1.796 1.762v2.311h3.59l-.467 3.622h-3.123V24h6.116c.731 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsComingSoonOpen(true); }}
              className="transition hover:text-tan "
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.835 9.835 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.664 2.475c0 1.708.869 3.213 2.19 4.099a4.904 4.904 0 0 1-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.828a4.902 4.902 0 0 1-2.224.084 4.936 4.936 0 0 0 4.604 3.42A9.867 9.867 0 0 1 0 20.898a13.918 13.918 0 0 0 7.548 2.212c9.057 0 14.002-7.514 14.002-14.026 0-.213-.005-.426-.015-.637A10.025 10.025 0 0 0 24 4.557z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsComingSoonOpen(true); }}
              className="transition hover:text-tan "
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.346 3.608 1.32.975.976 1.258 2.243 1.32 3.609.058 1.265.07 1.646.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.346 2.633-1.32 3.608-.976.975-2.243 1.258-3.609 1.32-1.265.058-1.646.07-4.849.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.346-3.608-1.32-.975-.976-1.258-2.243-1.32-3.609-.058-1.265-.07-1.646-.07-4.849s.012-3.584.07-4.85c.062-1.366.346-2.633 1.32-3.608.976-.975 2.243-1.258 3.609-1.32 1.265-.058 1.646-.07 4.849-.07M12 0C8.741 0 8.332.015 7.052.072c-1.616.071-3.09.362-4.368 1.64C1.392 2.908 1.101 4.382 1.03 5.998.973 7.278.957 7.688.957 12s.015 4.722.072 6.002c.071 1.616.362 3.09 1.64 4.368 1.278 1.278 2.752 1.569 4.368 1.64 1.28.058 1.689.072 6.002.072s4.722-.015 6.002-.072c1.616-.071 3.09-.362 4.368-1.64 1.278-1.278 1.569-2.752 1.64-4.368.058-1.28.072-1.689.072-6.002s-.015-4.722-.072-6.002c-.071-1.616-.362-3.09-1.64-4.368-1.278-1.278-2.752-1.569-4.368-1.64C16.722.015 16.312 0 12 0z" />
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zM18.406 4.594a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsComingSoonOpen(true); }}
              className="transition hover:text-tan "
              aria-label="YouTube"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.499 6.186a2.994 2.994 0 0 0-2.1-2.117C19.653 3.5 12 3.5 12 3.5s-7.654 0-9.399.57a2.994 2.994 0 0 0-2.1 2.116C0 8.154 0 12.001 0 12.001s0 3.847.501 5.813a2.994 2.994 0 0 0 2.1 2.117c1.745.569 9.399.569 9.399.569s7.653 0 9.399-.57a2.994 2.994 0 0 0 2.1-2.116c.501-1.966.501-5.813.501-5.813s.001-3.847-.501-5.815zm-13.683 9.098V8.717l6.518 3.288-6.518 3.279z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </footer>
  );
};

export default Footer;


