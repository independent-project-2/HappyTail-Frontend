
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Loading() {

   const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);


  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <img
        src="/assets/Images/piclogo.png"
        alt="Loading..."
        className="w-100 h-100 mb-4 animate-pulse"
      />
    </div>
  );
}
