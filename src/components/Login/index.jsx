import React, { useState } from "react";

const Login = () => {
  const [inputText, setInputText] = useState("");
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [offers, setOffers] = useState(false);

  const handleSendOtp = () => {
    console.log("Mobile:", inputText, "Offers:", offers);
  };

  const handleLoginWithType = () => {
    setLoginWithEmail(!loginWithEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Enter {loginWithEmail ? "Email" : "Mobile Number"}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We will send you an OTP to verify your{" "}
          {loginWithEmail ? "email" : "number"}
        </p>

        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
          {!loginWithEmail && (
            <span className="px-3 text-gray-700 border-r-[1px]">+91</span>
          )}
          <input
            type="text"
            placeholder={loginWithEmail ? "Email Id" : "Mobile Number"}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3 py-2 focus:outline-none"
          />
        </div>

        <label className="flex items-center mb-4 text-gray-700">
          <input
            type="checkbox"
            checked={offers}
            onChange={() => setOffers(!offers)}
            className="w-4 h-4 mr-2 text-[#0f4a51] border-gray-300 rounded focus:ring-[#15676e]"
          />
          Send me order updates and offers
        </label>

        {/* Send OTP Button */}
        <button
          onClick={handleSendOtp}
          className="w-full py-3 bg-[#0f4a51] text-white font-semibold rounded-md hover:bg-[#15676e] transition-colors cursor-pointer"
        >
          Send OTP →
        </button>

        {/* Login with Email */}
        <div className="mt-4">
          <button
            type="button"
            className="text-blue-600 hover:underline !text-sm cursor-pointer"
            onClick={handleLoginWithType}
          >
            Login with {!loginWithEmail ? "Email" : "Mobile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
