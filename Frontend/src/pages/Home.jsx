import { useState, useEffect } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import threeline from "../assets/threeline.svg";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

export function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  async function fetchCarouselData() {
    try {
      let response = await axios.get("http://localhost:8080/carousel/list-carousel-data");
      setCarouselData(response.data.items);
    } catch (error) {
      console.log("Failed to fetch carousel data from backend");
    }
  }

  async function fetchMenuData() {
    try {
      let response = await axios("http://localhost:8080/menu/list-menu-items");
      setMenuData(response.data.items);
    } catch (error) {
      console.log("Failed to fetch menu data");
    }
  }

  async function fetchFeaturedData() {
    try {
      let response = await axios("http://localhost:8080/featured/list-featured-item");
      setFeaturedData(response.data.items);
    } catch (error) {
      console.log("Failed to fetch featured data");
    }
  }

  useEffect(() => {
    fetchCarouselData();
    fetchMenuData();
    fetchFeaturedData();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselData.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Navbar />
      <div className="mt-[14vh] relative">
        <div className="flex justify-end">
          <div className="relative overflow-hidden w-full md:w-[90%]">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselData.map((slide, index) => (
                <div
                  key={index}
                  className="carousel-slide flex-shrink-0 w-full h-48 sm:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div
                    className={`carousel-content ${
                      currentIndex === index ? "carousel-content-active" : ""
                    } p-4 sm:p-8 text-white`}
                  >
                    <h1 className="carousel-heading text-2xl sm:text-5xl font-bold mb-2 text-black">
                      {slide.heading}
                    </h1>
                    <p className="carousel-paragraph mb-4 text-black py-2 sm:py-5 text-sm sm:text-base">
                      {slide.paragraph}
                    </p>
                    <a
                      href={slide.buttonLink}
                      className=" carousel-button inline-block px-4 py-2 sm:px-6 bg-red-600 text-white rounded-full w-[60%] sm:w-[30%] text-center text-xs sm:text-sm"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#202124] w-full py-2 sm:py-4 text-white text-center text-xs sm:text-sm">
          <p className="mx-2 sm:mx-56 truncate-text">
            (terms & Conditions)
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-[95%] md:w-[80%]">
            <div className="flex justify-between my-4 sm:my-7">
              <div className="font-bold text-xl sm:text-3xl">MENU</div>
              <div className="flex items-center">
                <Link to="/menu" className="hover:text-blue-700 text-sm sm:text-base">
                  Full Menu
                </Link>
                <BiSolidRightArrow className="ml-1 text-sm sm:text-base" />
              </div>
            </div>
            <div className="flex justify-between w-full overflow-x-auto">
              {menuData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0 w-[30%] sm:w-[17%] cursor-pointer"
                >
                  <img src={item.img} alt="" className="w-24 sm:w-40" />
                  <p className="font-bold text-center my-2 sm:my-3 text-xs sm:text-base">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="flex justify-center my-12 sm:my-24">
          <div className="w-[95%] md:w-[80%]">
            <div className="flex justify-between my-4 sm:my-7">
              <div className="font-bold text-xl sm:text-3xl">FEATURED</div>
              <div className="flex items-center">
                <Link to="/featured" className="hover:text-blue-700 text-sm sm:text-base">
                  See All
                </Link>
                <BiSolidRightArrow className="ml-1 text-sm sm:text-base" />
              </div>
            </div>
            <div className="flex justify-between w-full overflow-x-auto">
              {featuredData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0 w-[30%] sm:w-[17%] cursor-pointer"
                >
                  <img src={item.img} alt="" className="w-24 sm:w-40" />
                  <p className="font-bold text-center my-2 sm:my-3 text-xs sm:text-base">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-12 bg-[#e4002b] py-12 sm:py-24">
          <div className="w-[95%] md:w-[80%] text-center">
            <img
              src={threeline}
              alt=""
              className="h-12 sm:h-14 w-[30%] sm:w-[15%] mx-auto"
            />
            <p className="font-bold text-xs sm:text-sm text-white mt-4">
              OUR FOOD
            </p>
            <h1 className="font-bold text-3xl sm:text-8xl text-white mt-2 sm:mt-5">
              WE MAKE IT THE
              <br />
              HARD WAY
            </h1>
            <p className="text-white mt-4 sm:mt-5 text-xs sm:text-base">
              See what goes into making our world famous fried chicken.
            </p>
            <button className="px-4 sm:px-8 py-2 bg-[#37383a] rounded-full text-white font-bold mt-4 sm:mt-5">
              Learn More
            </button>
            <img
              src="https://images.ctfassets.net/9tka4b3550oc/1FQSRLVXt2Q1lvXXkOyW6U/f306561ef7bfc5ab7c84a739a46d3629/Food_09.png?q=75&w=1280"
              alt=""
              className="w-full sm:w-[70%] mx-auto mt-6 sm:mt-8"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 bg-[#e4002b] w-full sm:w-[80%] py-2 sm:py-4 mx-auto">
              <div className="font-bold text-white text-sm sm:text-xl text-center sm:text-left">
                FINGER LICKIN' GOOD® IS NOW JUST A FEW CLICKS AWAY
              </div>
              <button className="mt-2 sm:mt-0 px-4 sm:px-8 py-2 bg-white rounded-full font-bold text-center">
                Start Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
