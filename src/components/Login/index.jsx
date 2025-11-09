import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SimpleOtpInput = React.forwardRef(
  ({ name, value, onChange, maxLength, autoFocus = false }, ref) => (
    <input
      ref={ref}
      name={name}
      type="tel"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      autoFocus={autoFocus}
      className="h-12 text-center text-xl rounded-md border border-gray-300 w-full focus:border-[#0f4a51] focus:ring-1 focus:ring-[#0f4a51]"
    />
  )
);

// --- Login Component ---
const Login = () => {
  const navigate = useNavigate();

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const firstOtpInputRef = useRef(null);
  const primaryColor = "#0f4a51";
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (showOtpSection && firstOtpInputRef.current) {
      firstOtpInputRef.current.focus();
    }
  }, [showOtpSection]);

  const validationSchema = Yup.object().shape({
    contactValue: loginWithEmail
      ? Yup.string()
          .email("Invalid email format.")
          .required("Email is required.")
      : Yup.string()
          .required("Mobile number is required.")
          .matches(/^[0-9]+$/, "Mobile number must only contain digits.")
          .min(10, "Mobile number must be exactly 10 digits.")
          .max(10, "Mobile number must be exactly 10 digits."),
    wantsOffers: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      contactValue: "",
      wantsOffers: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSendingOtp(true);
      setOtpError("");

      console.log("OTP API Call Payload:", values);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setShowOtpSection(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        setIsSendingOtp(false);
      }
    },
  });

  const handleOtpSubmit = async () => {
    const enteredOtp = otpValues.join("");
    setOtpError("");

    if (enteredOtp.length !== 6) {
      setOtpError("Please enter the full 6-digit OTP.");
      return;
    }

    setIsVerifyingOtp(true);

    console.log("Verify OTP API Call Payload:", enteredOtp);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (enteredOtp === "123456") {
        console.log("OTP verified successfully! Redirecting...");
        navigate("/");
      } else {
        setOtpError("Invalid OTP. Please try again.");
        setOtpValues(Array(6).fill(""));
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Verification failed due to a network error.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleLoginWithType = () => {
    setLoginWithEmail(!loginWithEmail);
    setShowOtpSection(false);
    setOtpValues(Array(6).fill(""));
    setOtpError("");

    formik.resetForm({
      values: {
        contactValue: "",
        wantsOffers: formik.values.wantsOffers,
      },
    });
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]*$/.test(value)) return;

    if (otpError) setOtpError("");

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < otpValues.length - 1) {
      const nextInput = document.querySelector(`[name="otp${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const fieldType = loginWithEmail ? "email" : "tel";
  const placeholderText = loginWithEmail ? "Email Id" : "Mobile Number";
  const inputError = formik.touched.contactValue && formik.errors.contactValue;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {!showOtpSection ? (
          /* --- LOGIN INPUT SECTION --- */
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-2">
              Enter {loginWithEmail ? "Email" : "Mobile Number"}
            </h1>
            <p className="text-center text-gray-600 mb-6">
              We will send you an OTP to verify your{" "}
              {loginWithEmail ? "email" : "number"}
            </p>

            <div
              className={`flex items-center border rounded-md overflow-hidden mb-1 ${
                inputError ? "border-red-500" : "border-gray-300"
              }`}
            >
              {!loginWithEmail && (
                <span className="px-3 text-gray-700 border-r-[1px]">+91</span>
              )}
              <input
                id="contactValue"
                name="contactValue"
                type={fieldType}
                placeholder={placeholderText}
                value={formik.values.contactValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={loginWithEmail ? undefined : 10}
                className="flex-1 px-3 py-2 focus:outline-none placeholder-gray-400"
              />
            </div>

            {inputError && (
              <p className="text-red-500 text-sm mb-4">
                {formik.errors.contactValue}
              </p>
            )}

            <label className="flex items-center mb-4 text-gray-700">
              <input
                id="wantsOffers"
                name="wantsOffers"
                type="checkbox"
                checked={formik.values.wantsOffers}
                onChange={formik.handleChange}
                className="w-4 h-4 mr-2 text-[#0f4a51] border-gray-300 rounded focus:ring-[#15676e]"
              />
              Send me order updates and offers
            </label>

            <button
              type="submit"
              disabled={isSendingOtp || !formik.isValid}
              className={`w-full py-3 text-white font-semibold rounded-md transition-colors cursor-pointer ${
                isSendingOtp || !formik.isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0f4a51] hover:bg-[#15676e]"
              }`}
            >
              {isSendingOtp ? "Sending..." : "Send OTP →"}
            </button>
          </form>
        ) : (
          /* --- OTP SECTION --- */
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-2 text-center">
              Verify Your Identity
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Please enter the 6-digit OTP sent to {formik.values.contactValue}.
            </p>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-6 gap-2 w-full max-w-md mb-2">
                {otpValues.map((value, index) => (
                  <SimpleOtpInput
                    key={index}
                    ref={index === 0 ? firstOtpInputRef : null}
                    name={`otp${index}`}
                    value={value}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength={1}
                  />
                ))}
              </div>

              {/* Display OTP Error Message */}
              {otpError && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  {otpError}
                </p>
              )}

              <button
                type="button"
                onClick={handleOtpSubmit} // Use the new submit handler
                className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${
                  otpValues.join("").length === 6 && !isVerifyingOtp
                    ? `bg-[${primaryColor}] hover:bg-[#15676e] cursor-pointer`
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={otpValues.join("").length !== 6 || isVerifyingOtp}
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="flex mt-2 items-center justify-center text-sm">
                <p className="mr-2 text-gray-600">Did Not Receive The OTP?</p>
                <button
                  type="button"
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => console.log("Resend OTP logic here")}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline !text-sm cursor-pointer"
            onClick={handleLoginWithType}
          >
            {showOtpSection
              ? "Change Number/Email"
              : `Login with ${!loginWithEmail ? "Email" : "Mobile"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
