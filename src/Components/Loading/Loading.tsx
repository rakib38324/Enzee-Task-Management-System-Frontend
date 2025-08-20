import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-start ">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Pulse text */}
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>

        {/* Bouncing dots */}
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
