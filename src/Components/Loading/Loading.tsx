import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-ring loading-lg text-teal-500"></span>
        <p className="text-gray-600 text-sm font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
