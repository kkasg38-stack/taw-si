import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          dir="rtl"
        >
          تم التسجيل بنجاح!
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed" dir="rtl">
          تم تفعيل حسابك على بوابة التوثيق الوطني (توثيق) بنجاح. يمكنك الآن
          استخدام جميع الخدمات المتاحة.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Info Box */}
        <div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          dir="rtl"
        >
          <p className="text-sm text-blue-800">
            سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني ورقم جوالك المسجل.
          </p>
        </div>

        {/* Return Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          العودة إلى الصفحة الرئيسية
        </button>

        {/* Logo */}
        <div className="mt-8">
          <img
            src="/logo.jpeg"
            alt="Tawtheeq Logo"
            className="h-16 mx-auto opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
