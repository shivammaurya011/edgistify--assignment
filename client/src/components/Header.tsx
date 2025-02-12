import { useState, useRef, useEffect } from "react";
import { FiHeart, FiMenu, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/authSlice";
import { useToast } from "./ToastContext";
import { RootState } from "../app/store";
import { Product } from "../features/productSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: RootState) => state.products);
  const { addToast } = useToast();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showSearch, setShowSearch] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlistItems, setWatchlistItems] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    setWatchlistItems(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    setCartItems(saved ? JSON.parse(saved) : []);
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Refs for dropdowns
  const searchRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      )
        setShowSearch(false);

      if (
        watchlistRef.current &&
        !watchlistRef.current.contains(event.target as Node)
      )
        setShowWatchlist(false);

      if (cartRef.current && !cartRef.current.contains(event.target as Node))
        setShowCart(false);

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      )
        setShowProfile(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">Edgistify</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-green-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-green-600 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="relative flex space-x-4">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              className="text-gray-700 hover:text-green-600 transition"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FiSearch size={20} />
            </button>
            {showSearch && (
              <div className="absolute top-12 -right-32 bg-white shadow-lg p-4 rounded-md w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul className="mt-2">
                  {filteredProducts.slice(0, 5).map((product) => (
                    <li
                      key={product._id}
                      className="p-2 hover:bg-gray-200 rounded-md"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/*  */}
          <div className="relative" ref={watchlistRef}>
            <button
              onClick={() => {
                const saved = JSON.parse(
                  localStorage.getItem("watchlist") || "[]"
                );
                setWatchlistItems(saved);
                setShowWatchlist(!showWatchlist);
              }}
            >
              <FiHeart size={20} />
            </button>
            {showWatchlist && (
              <div className="absolute top-12 -right-23 bg-white shadow-lg p-4 rounded-md w-64">
                <h3 className="font-semibold mb-2">Watchlist</h3>
                <ul>
                  {watchlistItems.map((item) => (
                    <li
                      key={item._id}
                      className="p-2 hover:bg-gray-200 rounded-md"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem("cart") || "[]");
                setCartItems(saved);
                setShowCart(!showCart);
              }}
            >
              <FiShoppingCart size={20} />
            </button>
            {showCart && (
              <div className="absolute top-12 -right-14 bg-white shadow-lg p-4 rounded-md w-64">
                <h3 className="font-semibold mb-2">Cart</h3>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-2 hover:bg-gray-200 rounded-md">
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="text-gray-700 hover:text-green-600 transition"
              onClick={() =>
                isAuthenticated
                  ? setShowProfile(!showProfile)
                  : navigate("/login")
              }
            >
              <FiUser size={20} />
            </button>
            {showProfile && (
              <div className="absolute top-12 -right-5 bg-white shadow-lg rounded-md w-64 p-4 border border-gray-200">
                {/* User Info */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-3 flex flex-col space-y-2">
                  <button onClick={()=>navigate('/profile')} className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-green-100 rounded-lg transition duration-200">
                    <FiUser size={18} className="text-green-500" />
                    <span>Profile</span>
                  </button>
                  <button onClick={()=>navigate('/dashboard')} className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-green-100 rounded-lg transition duration-200">
                    <FiMenu size={18} className="text-green-500" />
                    <span>Dashboard</span>
                  </button>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    setShowProfile(false);
                    addToast("Logout successful!", "success");
                  }}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
