import React from 'react';

export default function VideoCard({ video, onAnalyze }) {
  return (
    <div className="bg-pink-200 p-3 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded mb-2 object-cover w-full h-40"
      />
      <h3 className="text-sm font-bold mb-1 truncate text-pink-500">{video.title}</h3>
      <p className="text-xs text-gray-500 mb-2">{video.channel}</p>
      <button
        onClick={onAnalyze}
        className="w-full bg-pink-300 hover:bg-pink-400 text-gray-800 py-1 rounded transition"
      >
        Check Pulse
      </button>
    </div>
  );
}
