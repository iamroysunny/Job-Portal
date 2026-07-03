import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-blue-600" />
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-sm">
          Finding amazing opportunities...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;