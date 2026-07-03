import { Clock } from "lucide-react";

const ApplicantDashboardCard = ({ applicant, position, time }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900">{applicant.name}</h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboardCard;