import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const WaitlistDashboard = () => {
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();  // Get the state passed from the form
  const { fullName } = location.state || {};  // Extract the full name

  useEffect(() => {
    // Start fading out the confetti after 8 seconds
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 8000);

    return () => {
      clearTimeout(fadeOutTimer); // Cleanup timer on component unmount
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {isVisible && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "opacity 2s ease-in-out",
            opacity: isVisible ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          <Confetti width={width} height={height} />
        </div>
      )}
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Waitlist Dashboard
        </h1>
        {/* Display the user's name here */}
        {fullName ? (
          <p className="text-lg text-gray-600">
            Thank you for registering, {fullName}! You are on the waitlist for the launch of LIT.
          </p>
        ) : (
          <p className="text-lg text-gray-600">
            Thank you for registering! You are on the waitlist for the launch of LIT.
          </p>
        )}
        <p className="text-gray-500 mt-2">
          We'll notify you as soon as the site is live.
        </p>
      </div>
    </div>
  );
};

export default WaitlistDashboard;
