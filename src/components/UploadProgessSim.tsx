import { useState } from "react";

const ProgressUploadSimulator = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newVal = prevProgress + Math.random() * 15 + 5;

        if (newVal >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }

        return newVal;
      });
    }, 300);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow max-w-md mx-auto text-card-foreground transition-colors">
      <h2 className="text-2xl font-bold text-center mb-6">
        File Upload Simulator
      </h2>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            className="h-full transition-all duration-300 ease-out bg-primary dark:bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-primary">
          {Math.round(progress)}%
        </span>

        <div className="text-sm text-muted-foreground mt-2">
          {isUploading && "📤 Uploading file..."}
          {!isUploading && progress === 0 && "📁 Ready to upload"}
          {!isUploading && progress > 0 && progress < 100 && "⏸️ Upload paused"}
          {!isUploading && progress === 100 && "✅ Upload complete!"}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={startUpload}
          disabled={isUploading || progress === 100}
          className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? "Uploading..." : "Start Upload"}
        </button>

        <button
          onClick={resetProgress}
          disabled={isUploading}
          className="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/70 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProgressUploadSimulator;
