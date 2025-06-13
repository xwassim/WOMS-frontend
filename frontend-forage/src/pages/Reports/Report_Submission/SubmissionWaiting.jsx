import React from 'react';

const SubmissionWaiting = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Soumission en cours</h2>
        <p className="text-gray-600 mt-2">Veuillez patienter...</p>
      </div>
    </div>
  );
};

export default SubmissionWaiting;