import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">Edgistify</h1>
          <p className="mt-2 text-gray-400">
          Empowering businesses with modern solutions for seamless shopping and growth online.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <a href="/shop" className="hover:text-green-500 transition">Shop</a>
          <a href="/about" className="hover:text-green-500 transition">About</a>
          <a href="/contact" className="hover:text-green-500 transition">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/shivammaurya011" target="_blank" className="text-gray-400 hover:text-green-500 transition">
              <FiFacebook size={20} />
            </a>
            <a href="https://x.com/shivammaurya011" target="_blank" className="text-gray-400 hover:text-green-500 transition">
              <FiTwitter size={20} />
            </a>
            <a href="https://www.instagram.com/shivammaurya011/" target="_blank" className="text-gray-400 hover:text-green-500 transition">
              <FiInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/shivammaurya011/" target="_blank" className="text-gray-400 hover:text-green-500 transition">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Edgistify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
