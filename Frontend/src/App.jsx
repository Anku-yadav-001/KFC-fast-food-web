import React, { useEffect, useState } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { Loader } from "./components/Loader";
import { Menu } from "./pages/Menu";
import { AuthMessage } from "./pages/AuthMessage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {
        loading?<Loader/>:
        <div className="">
          <AllRoutes />
        </div>
     
        }
        {/* <Menu/> */}
      
    </>
  );
}

export default App;
