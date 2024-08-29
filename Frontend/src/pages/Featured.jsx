import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { FiAlertCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';

const Featured = () => {
    const [featuredData,setFeaturedData] = useState([])
    const [currentId,setCurrentId] = useState("66cee0d64ef2a2a075e8d030")
    const [productName,setProductName] = useState()

  const menuCategories = [
   { name: 'Deals',id:"66cee0d64ef2a2a075e8d030"},
    { name:'Featured',id:"66cee8a34ef2a2a075e8d051"},
    { name:'Combos',id:"66cf33e22197c93b35c2bb23"},
   { name: 'Family Meals',id:"66cf375d2197c93b35c2bb3a"},
   { name: 'Fried Chicken',id:"66cf39bf2197c93b35c2bb4f"},
   { name: 'Tenders',id:"66cf3b722197c93b35c2bb63"},
   { name: 'Nuggets',id:"66cf51512197c93b35c2bbcc"},
   { name: 'Pot Pies & Bowls',id:"66cf54042197c93b35c2bbfc"},
  ];
  
  async function fetchFeaturedData(){
    try {
      let response = await axios(`http://localhost:8080/menu-category/list-category-items/sub-categories/${currentId}`)
      setFeaturedData(response.data.category.items)
    } catch (error) {
      console.log("failed to fetch featured data");
    }
  }
  

  useEffect(()=>{
        fetchFeaturedData()
  },[featuredData])

  return (<>
  <Navbar/>
    <div className="flex mt-[25vh] justify-center">
      <div className='w-[85%] flex'>
      <div className="w-1/5 p-4">
        <h2 className="font-bold text-3xl mb-4">KFC MENU</h2>
        <ul>
          {menuCategories.map((category, index) => (
            <li key={index} className="mb-2 text-md cursor-pointer hover:text-blue-600" onClick={()=>{setCurrentId(category.id);setProductName(category.name)}}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/5 p-4">
        <div className="flex items-center justify-between bg-gray-100 p-6 rounded-lg h-[30vh] border border-gray-300">
          <div>
            <h3 className="text-2xl font-bold  my-6 mx-4">50% OFF CHICKEN SANDWICHES</h3>
            <button className="bg-red-600 text-white py-2 px-4 rounded-full my-2 mx-5">
              Select Store To Redeem
            </button>
          </div>
          <img src="https://images.ctfassets.net/9tka4b3550oc/4mAE9sE0Hynd5JyGTTL3qh/c3cc89d22d41048791e78d03cb0c8e48/test_3.png" alt="Promo" className="w-[25%] rounded-lg ml-5" />
        </div>
            <p className="mt-3 text-sm text-gray-500 ">
              Only available on KFC.com or KFC app for participating stores (before taxes, tips & fees). Excludes Chicken sandwich. Must redeem offer via... Terms & Conditions
            </p>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 uppercase">{productName}</h3>
          <div className="grid grid-cols-3 gap-6">
          {featuredData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0 w-[100%] p-2 cursor-pointer"
                >
                  <img src={item.img} alt="" className="w-[80%] h-auto text-center" />
                  <p className="font-bold my-2 text-[17px]">{item.title}</p>
                  <p className="text-[12px] my-2">Cal.: {item.cal}</p>
                  <p className="flex items-center">Set Location For Pricing. <FiAlertCircle className="mt-1"/></p>
                </div>
              ))}
          </div>
        </div>
      </div>
    
    </div>      
    </div>
    <Footer/>
    </>
  );
};

export default Featured;
