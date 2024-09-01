import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { Footer } from "../components/Footer";

export function Career() {
  const [career, setCareers] = useState([]);

  async function fetchCareerData() {
    try {
      const response = await axios("http://localhost:8080/career/all-career-options");
      setCareers(response.data.items);
    } catch (error) {
      console.error("Error fetching career data:", error);
    }
  }

  useEffect(() => {
    fetchCareerData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[400px] mt-40"
        style={{
          backgroundImage:
            "url('https://images.ctfassets.net/9tka4b3550oc/5tRiGfQXCdlrlRXDVPWdYT/79fca81cf69dad4129d7f6c0e9c873f9/hero-careers.jpg?w=1680')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center px-4">
            JOIN OUR KFC FAMILY
          </h1>
          <p className="text-white text-center mt-4 md:text-lg px-4">
            You can start searching for jobs on the map or scroll to learn more about working at KFC.
          </p>
        </div>
      </div>
      <div className="w-full bg-slate-900 h-18 py-3 text-center text-white font-bold">
        Start your career with KFC, we are waiting for you
      </div>

      <div className="flex w-full justify-center">
        <div className="w-[90%] md:w-[80%] mt-14">
          <p className="font-bold py-2 text-center md:text-left">READY TO APPLY?</p>
          <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left">CHOOSE A RESTAURANT JOB</h1>
          <div className="flex overflow-x-auto space-x-4 py-6 custom-scrollbar">
            {career.map((ele, index) => (
              <div
                key={index}
                className="relative min-w-[200px] sm:min-w-[250px] md:min-w-[300px] flex-shrink-0"
              >
                <img
                  src={ele.img}
                  alt={ele.title}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h1 className="text-white text-base sm:text-lg font-bold">{ele.title}</h1>
                  <p className="text-white mt-2 text-sm sm:text-base">{ele.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center md:text-left">
            <p className="font-bold py-2">RESTAURANT</p>
            <h1 className="font-bold text-2xl md:text-3xl">INTERVIEW PROCESS</h1>
            <p className="text-gray-500">
              At KFC, we know your time is valuable and want to prepare you for what
              <br className="hidden md:block" />
              is next! See what happens after you fill out an application for one of our
              <br className="hidden md:block" />
              Restaurant Opportunities. Note: Most KFC restaurants are operated by
              <br className="hidden md:block" />
              independent franchisees who have their own hiring and benefits
              <br className="hidden md:block" />
              guidelines. These requirements may vary by location, and you’ll learn
              <br className="hidden md:block" />
              more when you meet with the hiring manager.
            </p>
          </div>

          <hr className="my-10" />
          <div className="space-y-10">
            {[
              { number: "01", title: "APPLICATION", desc: "Your application will be reviewed by the restaurant leader." },
              { number: "02", title: "SCHEDULING", desc: "One of the restaurant leaders will reach out to schedule an interview!" },
              { number: "03", title: "INTERVIEW", desc: "You will meet with a restaurant leader to go over your experience and learn more about the job opening. Don’t be afraid to ask questions!" }
            ].map((step, idx) => (
              <div key={idx}>
                <p className="text-gray-500 font-bold">{step.number}</p>
                <h1 className="font-bold text-2xl md:text-3xl">{step.title}</h1>
                <p className="text-gray-400">{step.desc}</p>
                {idx < 2 && <hr className="my-10" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4 mt-10">
            <div className="max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-2/3">
                <img
                  src="https://images.ctfassets.net/9tka4b3550oc/51fyOnDnrgeXWqP1B2Zsih/7d9b6da24b0c8ba9e84fcb2342539bda/banner-card-corporate-careers.jpg?q=75&w=1680"
                  alt="Corporate Careers"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/3 p-8">
                <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">Explore</h2>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Corporate Careers</h1>
                <p className="text-gray-600 mb-4">
                  At our Restaurant Support Center, in Louisville, KY, we support our brand in every aspect of the business! We take great pride in serving our franchises, restaurant teams and guests.
                </p>
                <p className="text-gray-600 mb-8">
                  We invite you to learn more about how you can be your best self, make a difference, and have fun at KFC Corporate.
                </p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
