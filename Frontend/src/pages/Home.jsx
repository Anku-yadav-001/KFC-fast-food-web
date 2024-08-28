import { useState, useEffect } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import threeline from "../assets/threeline.svg";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import axios from "axios"
import { Link } from "react-router-dom";
export function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselData,setCarouselData] =useState([])
  const [menuData,setMenuData]=useState([])
  const [featuredData,setFeaturedData] = useState([])

 async function fetchCarouselData(){
    try {
      let response = await axios.get("http://localhost:8080/carousel/list-carousel-data")
      setCarouselData(response.data.items); 
    } catch (error) {
      console.log("failed to carousel data from backend");
      
    }
  }

  async function fetchMenuData(){
    try {
      let response = await axios("http://localhost:8080/menu/list-menu-items")
      setMenuData(response.data.items)
      
    } catch (error) {
      console.log("failed to fetch menu data");
  
    }
  }

  async function fetchFeaturedData(){
    try {
      let response = await axios("http://localhost:8080/featured/list-featured-item")
      setFeaturedData(response.data.items)
    } catch (error) {
      console.log("failed to fetch featured data");
    }
  }

  useEffect(() => {
    fetchCarouselData()
    fetchMenuData()
    fetchFeaturedData()
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Navbar />
      <div className="mt-[14vh] relative">
        <div className="flex justify-end">
          <div className="relative overflow-hidden w-[90%]">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselData.map((slide, index) => (
                <div
                  key={index}
                  className="carousel-slide flex-shrink-0 w-full h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div
                    className={`carousel-content ${
                      currentIndex === index ? "carousel-content-active" : ""
                    } p-8 text-white`}
                  >
                    <h1 className="carousel-heading text-5xl font-bold mb-2 text-black">
                      {slide.heading}
                    </h1>
                    <p className="carousel-paragraph mb-4 text-black py-5">
                      {slide.paragraph}
                    </p>
                    <a
                      href={slide.buttonLink}
                      className="carousel-button inline-block px-6 py-2 bg-red-600 text-white rounded-full w-[30%] text-center"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-20 flex space-x-2 z-10">
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
        <div className="bg-[#202124] w-full py-4 text-white text-center">
          <p className="mx-56 truncate-text text-[12px]">
            (terms & Conditions) 
            {/* {carouselData[currentIndex].termsText} */}
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-[80%]">
            <div className="flex justify-between my-7">
              <div className="font-bold text-3xl">MENU</div>
              <div className="flex items-center">
                <Link to="/menu" className="hover:text-blue-700">Full Menu </Link><BiSolidRightArrow />
              </div>
            </div>
            <div className="flex justify-between w-full overflow-x-hidden">
              {menuData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-shrink-0 w-[17%] cursor-pointer">
                  <img src={item.img} alt="" className="w-40" />
                  <p className="font-bold text-center my-3">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[80%]">
            <div className="flex justify-between my-7">
              <div className="font-bold text-3xl">Featured</div>
              <div className="flex items-center">
                <Link to="/featured">See All Offers </Link><BiSolidRightArrow />
              </div>
            </div>
            <div className="flex overflow-x-auto w-full custom-scrollbar">
              {featuredData.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[25%] p-2 cursor-pointer"
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

        <div className="flex justify-center mt-12 bg-[#e4002b] h-[137vh] overflow-hidden">
          <div className="w-[80%] text-center">
            <img src={threeline} alt="" className="h-14 w-[15%] ml-[43%]"/>
            <p className="font-bold text-sm text-white m-5">OUR FOOD</p>
            <h1 className="font-bold text-8xl text-white">WE MAKE IT THE <br/>HARD WAY</h1>
            <p className="text-white m-4">See what goes into making our world famous fried chicken.</p>
            <button className="px-8 py-2 bg-[#37383a] rounded-full text-white font-bold m-4">Learn More</button>
            <img src="https://images.ctfassets.net/9tka4b3550oc/1FQSRLVXt2Q1lvXXkOyW6U/f306561ef7bfc5ab7c84a739a46d3629/Food_09.png?q=75&w=1280" alt="" className="w-[70%] ml-[15%] z-0 "/>
            <div className="absolute flex justify-between items-center mt-[-24.2%]  bg-[#e4002b] w-[80%] py-[8px]">
              <div className="font-bold text-white text-xl">FINGER LICKIN' GOOD® IS NOW JUST A FEW CLICKS AWAY</div>
              <div>
                <button className="px-8 py-2 bg-white rounded-full font-bold m-4">Start Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
