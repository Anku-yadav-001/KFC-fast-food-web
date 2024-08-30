import { Footer } from "../components/Footer";
import { Navbar1 } from "../components/Navbar1";

export function Bag() {
  return (
    <>
      <div>
        <Navbar1 />
        <div className="mt-[20vh] flex justify-center">
          <div className="w-[90%] sm:w-[80%] flex flex-col sm:flex-row justify-between h-auto sm:h-[70vh]">
            <div className="mt-[10%] sm:ml-[8%] w-full text-center sm:text-left">
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
                YOUR BAG IS <br /> EMPTY. LET'S <br /> START AN ORDER!
              </h1>
              <button className="px-8 sm:px-10 py-2 rounded-full bg-[#e4002b] text-white font-bold my-6 sm:my-10">
                Start Order
              </button>
            </div>
            <div className="w-full flex justify-center sm:justify-end mt-6 sm:mt-0">
              <img
                src="https://www.kfc.com/_next/static/images/empty-bucket-835c4f452fae1420a288523f2c1ead2b.png"
                alt=""
                className="w-[70%] sm:w-[80%]"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
