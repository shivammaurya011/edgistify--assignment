import RootLayout from "../layout/RootLayout";
import heroImage from "../assets/heroImage.png";
import discountImage1 from "../assets/discountImage1.png"
import discountImage2 from "../assets/discountImage2.png"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { fetchCategories } from "../features/categoriesSlice";
import { fetchProducts, Product } from "../features/productSlice";
import { RootState } from "../app/store";
import defaultImage from "../assets/default.png"
import { FiHeart } from "react-icons/fi";


function Home() {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state: RootState) => state.products);
  const { categories } = useAppSelector((state: RootState) => state.categories);
  const [watchlistItems, setWatchlistItems] = useState<Product[]>([]);
const [cartItems, setCartItems] = useState<Product[]>([]);

// Load initial state from localStorage
useEffect(() => {
  const savedWatchlist = localStorage.getItem("watchlist");
  const savedCart = localStorage.getItem("cart");
  setWatchlistItems(savedWatchlist ? JSON.parse(savedWatchlist) : []);
  setCartItems(savedCart ? JSON.parse(savedCart) : []);
}, []);

// Modified watchlist handler
const toggleWatchlist = (product: Product) => {
  const updated = watchlistItems.some(item => item._id === product._id)
    ? watchlistItems.filter(item => item._id !== product._id)
    : [...watchlistItems, product];
  
  localStorage.setItem("watchlist", JSON.stringify(updated));
  setWatchlistItems(updated);
};

// Modified cart handlers
const handleAddToCart = (product: Product) => {
  const existing = cartItems.find(item => item._id === product._id);
  const updated = existing
    ? cartItems.map(item => 
        item._id === product._id 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      )
    : [...cartItems, { ...product, quantity: 1 }];
  
  localStorage.setItem("cart", JSON.stringify(updated));
  setCartItems(updated);
};

const handleQuantityChange = (productId: string, delta: number) => {
  const updated = cartItems
    .map(item => 
      item._id === productId 
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    )
    .filter(item => item.quantity > 0);
  
  localStorage.setItem("cart", JSON.stringify(updated));
  setCartItems(updated);
};
  useEffect(() => {
      dispatch(fetchCategories());
      dispatch(fetchProducts());
    }, [dispatch]);
 
  return (
    <RootLayout>
      <section className="relative flex items-center justify-center bg-gray-100  px-6 pt-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-gray-900 space-y-6">
            <div className="bg-green-500 text-white px-4 py-2 inline-block rounded-md shadow-md">
              <h3 className="text-lg font-semibold tracking-wide">
                Your Trusted Online Flower Shop
              </h3>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              The Ultimate{" "}
              <span className="text-green-500">Flower Shopping</span>{" "}
              Destination
            </h1>

            <p className="text-lg text-gray-600">
              Fresh, hand-picked flowers delivered to your doorstep with love.
              Choose from our wide range of beautiful arrangements.
            </p>

            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition">
              Shop Now
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Beautiful Flowers"
              className="w-full max-w-md md:max-w-lg "
            />
          </div>
        </div>
      </section>

      {/* Occasions Section */}
<section id="categories" className="container mx-auto px-6 py-16 bg-gray-50">
  {/* Heading */}
  <div className="text-center mb-12">
    <h3 className="text-gray-500 text-lg font-medium tracking-wide uppercase">
      Occasion
    </h3>
    <h2 className="text-4xl font-bold text-gray-900">
      Shop by <span className="text-green-500">Occasions</span>
    </h2>
  </div>

  {/* Categories List */}
  {/* Categories List */}
<div className="flex flex-wrap justify-center gap-6 text-center">
  {categories.map((category, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out group cursor-pointer hover:shadow-lg hover:scale-105"
    >
      <h3 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-green-500 tracking-wide transition-colors">
        {category.name}
      </h3>
    </div>
  ))}
</div>

</section>


      {/* Product Section */}
<section id="products" className="container mx-auto px-6 py-16 bg-gray-100">
  {/* Heading and Button */}
  <div className="flex justify-between items-center mb-12">
    <div>
      <h5 className="text-gray-500 text-lg font-medium uppercase tracking-wide">
        Our Products
      </h5>
      <h2 className="text-4xl font-bold text-gray-900">
        Our <span className="text-green-500">Top Selling Products</span>
      </h2>
    </div>
    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
      View All Products
    </button>
  </div>

  {/* Product Grid */}
  <div className="grid md:grid-cols-4 gap-8">
  {products?.map((product, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={defaultImage}
          alt={product.name}
          className="w-full h-60"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {product.category.name}
          </span>
          <span className="text-lg font-semibold">${product.price?.toFixed(2).toLocaleString()}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="text-yellow-500 mt-1">⭐ {5}</p>
      </div>
      <div className="pb-4 px-4 flex justify-between items-center">
  <button
    onClick={() => toggleWatchlist(product)}
    className="text-gray-600 hover:text-green-500 transition"
  >
    {watchlistItems.some(item => item._id === product._id) ? (
      <FiHeart size={20} className="text-red-500" />
    ) : (
      <FiHeart size={20} />
    )}
  </button>

  {cartItems.some(item => item._id === product._id) ? (
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
      <button
        onClick={() => handleQuantityChange(product._id, -1)}
        className="text-gray-600 hover:text-green-500"
      >
        -
      </button>
      <span className="text-sm font-medium">
        {cartItems.find(item => item._id === product._id)?.quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(product._id, 1)}
        className="text-gray-600 hover:text-green-500"
      >
        +
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleAddToCart(product)}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
    >
      Add to Cart
    </button>
  )}
</div>
    </div>
  ))}
</div>

</section>


      <section id="categories" className="container mx-auto px-6 bg-gray-50 py-16">
  <div className="grid md:grid-cols-2 gap-8">
    {/* Discount Card 1 */}
    <div className="flex bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      <div className="p-8 flex flex-col justify-center">
        <h5 className="text-lg font-semibold text-gray-600 bg-gray-50 px-4 py-1 rounded-full uppercase tracking-wide">Flat 20% Discount</h5>
        <h2 className="text-4xl font-bold text-gray-900 leading-tight mt-2">Lovely Fresh Bouquets</h2>
        <p className="text-gray-600 mt-4">
          Beautifully arranged fresh flowers for your special moments.
        </p>
        <button className="mt-6 bg-green-500 text-white py-3 px-6 rounded-full font-medium hover:bg-green-600 transition duration-300">
          Shop Now →
        </button>
      </div>
      <img src={discountImage1} alt="Discount 1" className="w-1/2 object-cover" />
    </div>

    {/* Discount Card 2 */}
    <div className="flex bg-green-600 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      <div className="p-8 flex flex-col justify-center">
        <h5 className="text-lg font-semibold uppercase bg-green-500 px-4 py-1 rounded-full tracking-wide">Flat 25% Discount</h5>
        <h2 className="text-4xl font-bold leading-tight mt-2">Pure Bloom Collection</h2>
        <p className="mt-4">
          A premium selection of elegant and fresh floral arrangements.
        </p>
        <button className="mt-6 bg-white text-green-600 py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition duration-300">
          Shop Now →
        </button>
      </div>
      <img src={discountImage2} alt="Discount 2" className="w-1/2 object-cover" />
    </div>
  </div>
</section>

{/* Testimonial Section */}
<section className="bg-gray-100 py-16">
  <div className="container mx-auto text-center px-6">
    {/* Heading */}
    <h3 className="text-gray-500 text-lg font-medium uppercase tracking-wide">
      Testimonials
    </h3>
    <h2 className="text-4xl font-bold text-gray-900">
      What Our <span className="text-green-500">Customers Say</span>
    </h2>
    
    {/* Testimonials Grid */}
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      {[
        {
          name: "John Doe",
          role: "CEO, TechCorp",
          text: "Absolutely fantastic service! The quality and attention to detail exceeded my expectations.",
          image: "https://i.pravatar.cc/100?img=1",
          rating: 5,
        },
        {
          name: "Emily Smith",
          role: "Marketing Director",
          text: "This was one of the best experiences I’ve had. Highly recommended for anyone looking for top-notch service.",
          image: "https://i.pravatar.cc/100?img=2",
          rating: 4.5,
        },
        {
          name: "David Wilson",
          role: "Freelance Designer",
          text: "Superb quality and timely delivery. I couldn’t be happier with the results!",
          image: "https://i.pravatar.cc/100?img=3",
          rating: 5,
        },
      ].map((testimonial, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          {/* User Image */}
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full mb-4 border-4 border-green-500"
          />
          
          {/* User Name & Role */}
          <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>

          {/* Rating Stars */}
          <div className="flex mt-2">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <svg
                key={starIndex}
                xmlns="http://www.w3.org/2000/svg"
                fill={starIndex < Math.floor(testimonial.rating) ? "gold" : "gray"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="gold"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.75l2.16 6.638h6.964l-5.632 4.243 2.16 6.638-5.632-4.243-5.632 4.243 2.16-6.638-5.632-4.243h6.964L12 3.75z"
                />
              </svg>
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 mt-3 italic">"{testimonial.text}"</p>
        </div>
      ))}
    </div>
  </div>
</section>
      

      {/* Features Section */}
<section id="features" className="container mx-auto px-6 py-16 bg-gray-50">
  <div className="flex flex-wrap justify-between items-center text-center md:text-left gap-8">
    {[
      { icon: "🚚", title: "Free Shipping", desc: "Free shipping for orders above $200" },
      { icon: "💳", title: "Flexible Payment", desc: "Multiple payment options available" },
      { icon: "🛠️", title: "24/7 Support", desc: "We’re here to help anytime" },
    ].map((feature, index) => (
      <div key={index} className="flex items-center gap-4 w-full md:w-auto">
        {/* Feature Icon */}
        <div className="text-4xl text-green-500">{feature.icon}</div>

        {/* Feature Title & Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{feature.title}</h2>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Newsletter Section */}
<section className="bg-gray-100 py-16 px-6 text-center">
  <div className="max-w-2xl mx-auto">
    <h3 className="text-lg font-medium text-gray-700 mb-2 uppercase tracking-wide">
      Our Newsletter
    </h3>
    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
      Subscribe to Get <span className="text-green-500">Exclusive Offers & Updates</span>
    </h2>
    <p className="mt-2 text-gray-600">
      Get 20% off on your first order just by subscribing to our newsletter.
    </p>

    {/* Email Input Box */}
    <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-auto flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
      />
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300">
        Subscribe
      </button>
    </div>
  </div>
</section>

    </RootLayout>
  );
}

export default Home;
