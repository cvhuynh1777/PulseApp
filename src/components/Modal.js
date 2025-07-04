import React from 'react';

export default function Modal({ title, onClose, children }) {
  console.log('Modal rendered:', title);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-pink-100 bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full z-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-pink-400">Analysis: {title}</h2>
          <button
            onClick={onClose}
            className="text-xl px-3 py-1 rounded-full bg-pink-300 hover:bg-pink-400 text-gray-800 transition"
          >
            ✖
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
