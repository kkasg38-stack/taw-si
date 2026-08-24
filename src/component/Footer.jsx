import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const isPay = pathname === "/pay";
    const isOtp = pathname === "/otp";

  if (isPay || isOtp) return;
  else{
     return (
       <footer className="bg-white border-t border-gray-200 py-6 w-full">
         <div className="container mx-auto text-center">
           <p className="text-gray-600 text-lg">© 2025 حكومة قطر</p>
         </div>
       </footer>
     );
  }
   
};

export default Footer;
