import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion, AnimatePresence } from 'framer-motion';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let copy = products.slice();

    if (showSearch && search) {
      copy = copy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      copy = copy.filter(item => category.includes(item.category));
    }

    if (subcategory.length > 0) {
      copy = copy.filter(item => subcategory.includes(item.subcategory));
    }

    setFilterProducts(copy);
  };

  const sortProduct = () => {
    let copy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 px-4 sm:px-10 border-t">
      {/* Sidebar Filters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full sm:w-64"
      >
        <div className="bg-white border rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
            <p className="text-lg font-bold text-gray-800 tracking-wide">Filters</p>
            <img
              className={`h-4 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt="toggle"
            />
          </div>

          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-5 space-y-6 overflow-hidden"
              >
                {/* Categories */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Categories</p>
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
                    {['Men', 'Women', 'Kids'].map(cat => (
                      <label key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={cat}
                          onChange={toggleCategory}
                          className="accent-indigo-500"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Type</p>
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
                    {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
                      <label key={sub} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={sub}
                          onChange={toggleSubCategory}
                          className="accent-indigo-500"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3 py-1 rounded-md"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
