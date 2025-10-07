import { set } from "date-fns";
import { useState } from "react";

const ProgressUploadSimulator = () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadId, setUploadId] = useState(null);

    const startUpload = () => {
  setIsUploading(true);
  setProgress(0);
  
  // Simulate upload progress with intervals
  const interval = setInterval(() => {
    setProgress(prevProgress => {
      const newProgress = prevProgress + Math.random() * 15 + 5; // Random chunks
      
      // Complete upload when we reach 100%
      if (newProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        return 100;
      }
      
      return newProgress;
    });
  }, 300); // Update every 300ms for smooth animation
};

// Function to reset progress
const resetProgress = () => {
  setProgress(0);
  setIsUploading(false);
};
    const CancelUpload = () => {};
    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">File Upload Simulator</h2>
      
      {/* Progress Bar Container */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text and Status */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-blue-600">{progress}%</span>
        <div className="text-sm text-gray-600 mt-2">
          {isUploading && "📤 Uploading file..."}
          {!isUploading && progress === 0 && "📁 Ready to upload"}
          {!isUploading && progress > 0 && progress < 100 && "⏸️ Upload paused"}
          {!isUploading && progress === 100 && "✅ Upload complete!"}
        </div>
      </div>

      {/* Control buttons */}
<div className="flex justify-center gap-3">
  <button 
    onClick={startUpload}
    disabled={isUploading || progress === 100}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    {isUploading ? 'Uploading...' : 'Start Upload'}
  </button>
  
  <button 
    onClick={resetProgress}
    disabled={isUploading}
    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Reset
  </button>
</div>
    </div>
    )
};
export default ProgressUploadSimulator;