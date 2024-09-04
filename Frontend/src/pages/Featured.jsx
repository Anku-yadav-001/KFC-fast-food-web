import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { FiAlertCircle, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const [featuredData, setFeaturedData] = useState([]);
  const [currentId, setCurrentId] = useState("66cee0d64ef2a2a075e8d030");
  const [productName, setProductName] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const menuCategories = [
    { name: 'Deals', id: "66cee0d64ef2a2a075e8d030" },
    { name: 'Featured', id: "66cee8a34ef2a2a075e8d051" },
    { name: 'Combos', id: "66cf33e22197c93b35c2bb23" },
    { name: 'Family Meals', id: "66cf375d2197c93b35c2bb3a" },
    { name: 'Fried Chicken', id: "66cf39bf2197c93b35c2bb4f" },
    { name: 'Tenders', id: "66cf3b722197c93b35c2bb63" },
    { name: 'Nuggets', id: "66cf51512197c93b35c2bbcc" },
    { name: 'Pot Pies & Bowls', id: "66cf54042197c93b35c2bbfc" },
  ];

  async function fetchFeaturedData() {
    try {
      let response = await axios(`https://kfc-fast-food-web.onrender.com/menu-category/list-category-items/sub-categories/${currentId}`);
      setFeaturedData(response.data.category.items);
    } catch (error) {
      console.log("Failed to fetch featured data");
    }
  }

  useEffect(() => {
    fetchFeaturedData();
  }, [currentId]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 flex flex-col md:mt-40 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="relative lg:w-1/5 p-4 lg:pr-6">
            <button
              className="lg:hidden text-2xl text-gray-700 mt-20"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
              <h2 className="font-bold text-2xl sm:text-3xl mb-4">KFC MENU</h2>
            <div className={`lg:block ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
              <ul className="space-y-2">
                {menuCategories.map((category, index) => (
                  <li
                    key={index}
                    className="text-md cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      setCurrentId(category.id);
                      setProductName(category.name);
                      setIsMenuOpen(false); 
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-4/5 p-4">
            <div className="flex flex-col lg:flex-row items-center bg-gray-100 p-6 rounded-lg border border-gray-300 mb-8">
              <div className="lg:w-3/5">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">50% OFF CHICKEN SANDWICHES</h3>
                <button className="bg-red-600 text-white py-2 px-4 rounded-full">
                  Select Store To Redeem
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  Only available on KFC.com or KFC app for participating stores (before taxes, tips & fees). Excludes Chicken sandwich. Must redeem offer via... Terms & Conditions
                </p>
              </div>
              <img
                src="https://images.ctfassets.net/9tka4b3550oc/4mAE9sE0Hynd5JyGTTL3qh/c3cc89d22d41048791e78d03cb0c8e48/test_3.png"
                alt="Promo"
                className="w-full lg:w-2/5 rounded-lg mt-4 lg:mt-0"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 uppercase">{productName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white border border-gray-300 rounded-md p-4 cursor-pointer"
                  onClick={()=>navigate("/order-items")}
                >
                  <img src={item.img} alt={item.title} className="w-full h-40 object-cover mb-2 rounded-md" />
                  <p className="font-bold text-lg mb-1">{item.title}</p>
                  <p className="text-sm mb-1">Cal.: {item.cal}</p>
                  <p className="flex items-center text-sm text-gray-600">Set Location For Pricing <FiAlertCircle className="ml-1" /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Featured;
