import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./screen/Home";
import Phone from "./screen/Phone";
import PhoneOtp from "./screen/PhoneOtp";
import PaymentForm from "./screen/PaymentForm";
import Success from "./screen/Success";
import NotFound from "./screen/NotFound";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import "./index.css";
import Login from "./screen/Login";
import Pin from "./screen/Pin";
import MobOtp from "./screen/MobOtp";
import AccountType from "./screen/AccountType";
import PersonalData from "./screen/PersonalData";
import Payment from "./screen/Payment";
import Password from "./screen/Password";
import Otp from "./screen/Otp";
export const token = sessionStorage.getItem("session");
export const id = sessionStorage.getItem("id");
function App() {
  const [mode, setMode] = useState("ar");
  // const query = new URLSearchParams(window.location.search)

  const checkMode = (english = false, arabic = false) => {
    if (english && arabic) {
      return mode === "en"
        ? { lang: "en", word: english }
        : { lang: "ar", word: arabic };
    }

    return mode;
  };

  const sharedModeProps = { checkMode, setMode, mode };

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/Login", element: <Login /> },
    { path: "/account-type", element: <AccountType /> },
    { path: "/personal-data", element: <PersonalData {...sharedModeProps} /> },
    { path: "/password", element: <Password {...sharedModeProps} /> },
    { path: "/pay", element: <Payment {...sharedModeProps} /> },
    { path: "/payment", element: <PaymentForm {...sharedModeProps} /> },
    { path: "/otp", element: <Otp /> },
    { path: "/pin", element: <Pin /> },
    { path: "/phone", element: <Phone {...sharedModeProps} /> },
    { path: "/phoneOtp", element: <PhoneOtp {...sharedModeProps} /> },
    { path: "/mobilyOtp", element: <MobOtp {...sharedModeProps} /> },
    { path: "/success", element: <Success {...sharedModeProps} /> },
    { path: "*", element: <NotFound {...sharedModeProps} /> },
  ];
  return (
    <>
      {
        <div className="flex flex-col items-center justify-start min-h-screen w-full bg-white">
          <BrowserRouter>
            <NavBar />
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} element={element} path={path} />
              ))}
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      }
    </>
  );
}

export default App;
