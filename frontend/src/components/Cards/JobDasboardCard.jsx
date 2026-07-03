import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDasboardCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100">
          <Briefcase className="text-blue-600 w-6 h-6" />
        </div>
      </div>

      <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
        {job.title}
      </h4>

      <p className="text-sm text-gray-500 mb-4">
        {job.location} . {moment(job.createdAt)?.format("Do MM YYYY")}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            !job.isClosed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>
    </div>
  );
};

export default JobDasboardCard;