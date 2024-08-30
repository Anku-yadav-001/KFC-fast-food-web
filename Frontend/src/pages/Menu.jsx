import { useState, useEffect } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import threeline from "../assets/threeline.svg";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";

export function Menu() {
  const [menuData, setMenuData] = useState([]);

  async function fetchMenuData() {
    try {
      let response = await axios("http://localhost:8080/menu/list-menu-items");
      setMenuData(response.data.items);
    } catch (error) {
      console.log("Failed to fetch menu data");
    }
  }

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-40 relative px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg">
            <div className="flex justify-start my-7">
              <h1 className="font-bold text-2xl sm:text-3xl">KFC MENU</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
              {menuData.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded-md cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="font-bold text-center bg-gray-200 py-4">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
