import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, AlertCircle } from "lucide-react";
import litImage from "../../assets/LIT.jpg";
import logo from "../../assets/logo.png";
import ErrorModal from "../ErrorModal";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email";
    return errors;
  };

  const errors = validate();

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            You have logged in successfully.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
              });
            }}
            className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      email: formData.email,
      fullName: formData.fullName,
    };
    try {

      const response = await fetch("https://lit-x57y.onrender.com/api/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/waitlist-dashboard", { state: { fullName: formData.fullName } });
      } else {
        setModalMessage(data.error);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage(error.message);
      setShowErrorModal(true);
    }
  };
  
  

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${litImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {showErrorModal && (
        <ErrorModal
          message={modalMessage}
          onClose={() => setShowErrorModal(false)}
        />
      )}
      <div className="h-max max-w-2xl p-6">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-y-auto">
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="h-20 mx-auto my-0 flex justify-center items-center"
            />
            <h2 className="text-3xl font-bold text-purple-800 mb-2">
              Welcome Back to Ladies in Tech
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur("fullName")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.fullName && errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="Betty White"
              />
              {touched.fullName && errors.fullName && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </div>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.email && errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="example@email.com"
              />
              {touched.email && errors.email && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;