import { useState, useEffect } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import threeline from "../assets/threeline.svg";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
export function Menu() {
  const [menuData, setMenuData] = useState([])

  async function fetchMenuData() {
    try {
      let response = await axios("http://localhost:8080/menu/list-menu-items")
      setMenuData(response.data.items)

    } catch (error) {
      console.log("failed to fetch menu data");

    }
  }


  useEffect(() => {
    fetchMenuData()
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-[24vh] relative">
        <div className="flex justify-center">
          <div className="w-[80%]">
            <div className="flex justify-start my-7">
              <div className="font-bold text-3xl">KFC MENU</div>
            </div>
            <div className="grid grid-cols-5 gap-4 my-5">
              {menuData.map((item, index) => (
                <div key={index} className="border border-gray-400 rounded-md cursor-pointer">
                  <img src={item.img} alt={item.title} className="w-40 mx-auto" />
                  <p className="font-bold text-center  bg-gray-200 py-4 rounded-md bottom-0">{item.title}</p>
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
