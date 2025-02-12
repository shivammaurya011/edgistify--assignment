import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import RootLayout from '../layout/RootLayout';
import { fetchCategories } from '../features/categoriesSlice';
import { fetchProducts } from '../features/productSlice';
import defaultImage from "../assets/default.png"

function Shop() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: RootState) => state.products);
  const { categories } = useAppSelector((state: RootState) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter and sort logic
  const filteredProducts = products
    .filter((product) => !selectedCategory || product.category.name === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <RootLayout>
      <div className="flex w-full p-6">
        {/* Sidebar (Filters) */}
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filter Options</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Sort by Category</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category?._id}
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    selectedCategory === category?.name ? 'bg-green-500 text-white' : 'bg-white'
                  }`}
                  onClick={() => setSelectedCategory(category?.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Sorting */}
          <div>
            <h3 className="text-lg font-medium mb-2">Sort by Price</h3>
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="default">Default Sorting</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-3/4 px-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium">
              Total Products: {filteredProducts.length}
            </p>
            <div>
              <label className="mr-2 text-gray-700">Sort By</label>
              <select
                className="p-2 border rounded-md"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="default">Default Sorting</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategory && (
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md">
                {selectedCategory}
              </span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-red-500 font-medium"
              >
                ✖
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product?._id} className="bg-white shadow-md p-4 rounded-lg">
                <img
                  src={defaultImage}
                  alt={product?.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{product?.name}</h3>
                <p className="text-gray-700">${product.price.toFixed(2)}</p>
                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16 bg-gray-50">
        <div className="flex flex-wrap justify-between items-center text-center md:text-left gap-8">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'Free shipping for orders above $200' },
            { icon: '💳', title: 'Flexible Payment', desc: 'Multiple payment options available' },
            { icon: '🛠️', title: '24/7 Support', desc: 'We’re here to help anytime' },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-4xl text-green-500">{feature.icon}</div>
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

export default Shop;
