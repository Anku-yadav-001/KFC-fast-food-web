import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export function AllItems() {
  const [featuredData, setFeaturedData] = useState([]);

  async function fetchFeaturedData() {
    try {
      let response = await axios(`http://localhost:8080/menu-category/list-category-items`);
      setFeaturedData(response.data.categories);
    } catch (error) {
      console.log("Failed to fetch featured data", error);
    }
  }

  useEffect(() => {
    fetchFeaturedData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-[25vh] w-full flex justify-center">
        <div className="w-[80%]">
            <h1 className="font-bold text-3xl py-3">YOU CAN FIND ALL THE ITEMS HERE</h1>
          {featuredData.map((itemList, index) => (
            <div key={index} className="mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {itemList.items.map((item, ind) => (
                  <div key={ind} className="flex flex-col items-center border border-gray-400 rounded-md bg-gray-200 cursor-pointer p-2 text-center">
                    <img src={item.img} alt={item.title} className="w-[60%] h-auto"/>
                    <h1 className="mt-2 text-lg font-semibold">{item.title}</h1>
                    <p className="mt-1 text-gray-500">Cal: {item.cal}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
//real