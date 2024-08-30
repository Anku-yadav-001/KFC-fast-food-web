import kfcsafe from "../assets/kfcsafe.svg";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <div className="w-full bg-[#202124] flex justify-center">
      <div className="w-[90%] md:w-[80%] py-10">
        <div className="text-white">
          <p className="text-[12px] md:text-[14px]">Calorie Statement</p>
          <p className="text-[12px] md:text-[14px]">
            2,000 calories a day is used for general nutrition advice, but calorie needs vary. Additional nutrition information available upon request in-store and on kfc.com. Prices,
            <br className="hidden md:block" />
            participation, and product availability may vary. For allergen information, visit our Special Diets page. We prepare and serve products containing egg, milk, soy, wheat
            <br className="hidden md:block" />
            or other allergens. Our products are prepared on shared equipment and in the same kitchen area, and we cannot guarantee that cross-contact with allergens will not
            <br className="hidden md:block" />
            occur.
          </p>
          <p className="text-[12px] md:text-[14px] py-5 md:py-10">
            Pepsi, Pepsi Globe, Mtn Dew, Mtn Dew Sweet Lightning, Starry are registered trademarks of PepsiCo, Inc.
            <br className="hidden md:block" />
            Dr Pepper is a registered trademark of Dr Pepper/Seven Up, Inc.
          </p>
          <p className="text-[12px] md:text-[14px] py-2">CAPRI-SUN® and the Pouch Shape™ are licensed trademarks of the Capri Sun Group</p>
        </div>

        <div className="flex flex-wrap justify-between text-white mt-8 text-[12px] md:text-[13px]">
          <div className="w-full md:w-auto md:flex-[1_1_20%]">
            <img src={kfcsafe} alt="KFC Safe" className="w-[50%] md:w-[70%] mx-auto md:mx-0" />
          </div>
          <div className="text-center w-full md:w-auto md:flex-[1_1_15%] mt-5 md:mt-0 md:text-left ">
            <p className="font-semibold">KFC Food</p>
            <p>Menu</p>
            <p>Full Nutrition Guide</p>
            <p>Nutrition Calculator</p>
            <p>Food Allergies & Sensitivity</p>
          </div>
          <div className="text-center w-full md:w-auto md:flex-[1_1_15%] mt-5 md:mt-0 md:text-left">
            <p className="font-semibold">Company</p>
            <p>About KFC</p>
            <p>How We Make Chicken</p>
            <p>KFC Foundation</p>
            <p>Company Responsibility</p>
            <p>Franchise a KFC</p>
            <p>Responsible Disclosure</p>
            <p>KFC Newsroom</p>
          </div>
          <div className="text-center w-full md:w-auto md:flex-[1_1_15%] mt-5 md:mt-0 md:text-left">
            <p className="font-semibold">Careers</p>
            <p>Restaurant Careers</p>
            <p>Corporate Careers</p>
            <p>Culture</p>
            <p>Growth</p>
          </div>
          <div className="text-center w-full md:w-auto md:flex-[1_1_15%] mt-5 md:mt-0 md:text-left">
            <p className="font-semibold">Resources</p>
            <p>FAQs</p>
            <p>Contact Us</p>
            <p>KFC App</p>
          </div>
          <div className="text-center w-full md:w-auto md:flex-[1_1_15%] mt-5 md:mt-0 md:text-left">
            <p className="font-semibold">Find a KFC</p>
            <p>Find a KFC</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between text-white text-[12px] md:text-[13px] my-10 items-center">
          <div className="text-center md:text-left mb-5 md:mb-0">
            <p>
              <span>Privacy Policy</span> | <span>Terms of Use</span> | <span>Our Cookies and Ads</span> | <span>Do Not Sell or Share My Personal Information</span> |
              <br className="hidden md:block" />
              <span>Accessibility Statement</span> | <span>KFC Rewards Terms</span> | <span>FAQ</span>
            </p>
            <p>Build: KFC08022024:4c021709</p>
          </div>
          <div className="text-center md:text-left mb-5 md:mb-0">
            <p>
              Copyright © KFC Corporation 2024 <br className="hidden md:block" /> All Rights Reserved
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <FaInstagram className="m-2 h-8 w-8 border-2 rounded-full p-2" />
            <FaFacebook className="m-2 h-8 w-8 border-2 rounded-full p-2" />
            <FaXTwitter className="m-2 h-8 w-8 border-2 rounded-full p-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
