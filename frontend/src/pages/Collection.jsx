import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

function Collection() {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType,setSortType]= useState('relavent')

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }

    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if(showSearch && search){
            productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }

        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {

        let fpCopy = filterProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    }



    useEffect(() => {
        applyFilter();
    }, [category, subCategory,search,showSearch,products]);

    useEffect(()=>{
        sortProduct();
    },[sortType])




    return (
      <div className="flex flex-col sm:flex-row gap-8 pt-10 px-4 sm:px-10 border-t">
    
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full sm:w-64"
        >
          <div className="bg-white border rounded-2xl shadow-md p-5 transition-all duration-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowFilter(!showFilter)}
            >
              <p className="text-lg font-bold text-gray-800 tracking-wide">Filters</p>
              <img
                className={`h-4 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
                src={assets.dropdown_icon}
                alt="Toggle"
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
                      {['Men', 'Women', 'Kids'].map((cat) => (
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
    
                  {/* Type clothes */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Type</p>
                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                      {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
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
    
        {/* ПРОДУКТИ */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
    
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filterProducts.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <ProductItem
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
    
    
}

export default Collection;