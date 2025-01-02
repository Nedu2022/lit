import PropTypes from "prop-types";
import { AlertCircle, X } from "lucide-react";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-96 max-w-full rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-800 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">Error</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



// Add PropTypes validation
ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;

