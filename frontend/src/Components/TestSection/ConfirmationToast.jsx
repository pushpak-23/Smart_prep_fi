import React from "react";

const ConfirmationToast = ({ onConfirm, onClose, checked, setChecked }) => (
  <div className="p-4 sm:p-6 md:p-8 lg:p-10">
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 md:mb-4">
      Proceed to Next Section
    </h2>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 text-purple-600">
      Please confirm that you are ready to proceed to the next section.
    </p>
    <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
      <input
        type="checkbox"
        id="confirm-checkbox"
        className="form-checkbox mr-2"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label
        htmlFor="confirm-checkbox"
        className="text-xs sm:text-sm md:text-base lg:text-lg"
      >
        I am ready to proceed.
      </label>
    </div>
    <div className="flex flex-col sm:flex-row justify-center">
      <button
        onClick={onClose}
        className="bg-red-400 hover:bg-red-500 text-white p-2 rounded mb-2 sm:mb-0 sm:mr-2 text-xs sm:text-sm md:text-base lg:text-lg"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mb-2 sm:mb-0 sm:mr-2 text-xs sm:text-sm md:text-base lg:text-lg"
        disabled={!checked}
      >
        Confirm
      </button>
    </div>
  </div>
);

export default ConfirmationToast;
