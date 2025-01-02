import { useState } from "react";
import { Check, AlertCircle, Upload } from "lucide-react";
import litImage from "../../assets/LIT.jpg";
import logo from "../../assets/logo.png";
import ErrorModal from "./ErrorModal";


const BeautifulForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    level: "",
    department: "",
    interestedCourse: "",
    image: null
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");

  const courses = [
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Robotics",
    "Cloud Computing"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email";
    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      errors.phone = "Invalid phone number";
    if (!formData.level) errors.level = "Level is required";
    if (!formData.department) errors.department = "Department is required";
    if (!formData.interestedCourse)
      errors.interestedCourse = "Course selection is required";
    if (!formData.image) errors.image = "Profile image is required";
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
            Registration Complete!
          </h2>
          <p className="text-gray-600">
            Your registration has been submitted successfully.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                level: "",
                department: "",
                interestedCourse: "",
                image: null
              });
              setPreviewImage(null);
            }}
            className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Register Another Member
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      level: formData.level,
      department: formData.department,
      interestedCourse: formData.interestedCourse,
      image: formData.image ? formData.image.name : "" // Send image name or empty string
    };
  
    try {
      const response = await fetch("http://localhost:5300/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataToSend)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          setModalMessage(errorData.error); 
          setShowErrorModal(true); 
        }
        return;
      }
  
      await response.json();
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        level: "",
        department: "",
        interestedCourse: "",
        image: null
      });
      setPreviewImage(null);
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
        backgroundAttachment: "fixed"
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
              Want to be a Member of Ladies in Tech?
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.phone && errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="08012345678"
              />
              {touched.phone && errors.phone && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                onBlur={() => handleBlur("department")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.department && errors.department
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
                placeholder="Computer Science"
              />
              {touched.department && errors.department && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.department}
                </div>
              )}
            </div>
            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                onBlur={() => handleBlur("level")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.level && errors.level
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
              >
                <option value="">Select Level</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
              {touched.level && errors.level && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.level}
                </div>
              )}
            </div>

            {/* Interested Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interested Course
              </label>
              <select
                name="interestedCourse"
                value={formData.interestedCourse}
                onChange={handleChange}
                onBlur={() => handleBlur("interestedCourse")}
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.interestedCourse && errors.interestedCourse
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-200"
                } focus:outline-none focus:ring-4 transition-all`}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {touched.interestedCourse && errors.interestedCourse && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.interestedCourse}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-2 text-center">
                  {previewImage ? (
                    <div className="mx-auto">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData((prev) => ({ ...prev, image: null }));
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-700"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-upload"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {touched.image && errors.image && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.image}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Submit Application</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeautifulForm;
