import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">

        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-6">

          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-pink-100 p-2 rounded-xl">
                <Briefcase className="text-pink-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Job India
              </h3>
            </div>

            <p className="text-sm text-gray-600 max-w-md">
              Connecting talented professionals with innovative companies worldwide.
              Your career success is our mission.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-4">
            <p className="text-sm text-gray-900">
              © {new Date().getFullYear()} Time To Program
            </p>
            <p className="text-xs text-gray-800">
              Made with ❤️ by Sunny
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;