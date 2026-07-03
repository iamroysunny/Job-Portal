import {
  MapPin,
  ArrowLeft,
  Building2,
  Clock,
  IndianRupee,
  Users,
  Users2,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";

const currencies = [
  {
    value: "INR",
    label: "₹",
  },
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "GBP",
    label: "£",
  },
];

const JobPostingPreview = ({
  formData,
  setIsPreview,
}) => {
  const { user } = useAuth();

  const category =
    CATEGORIES.find(
      (c) =>
        c.value ===
        (formData.category ||
          formData.catagory)
    )?.label;

  const jobType =
    JOB_TYPES.find(
      (j) =>
        j.value ===
        formData.jobType
    )?.label;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Job Preview
            </h2>

            <button
              onClick={() =>
                setIsPreview(false)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium text-slate-700">
                Back to edit
              </span>
            </button>
          </div>

          {/* Main Card */}
          <div className="p-6">
            <div className="bg-gradient-to-br from-violet-50 to-slate-50 border border-slate-200 rounded-3xl p-7">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {formData.jobTitle}
                  </h1>

                  <div className="flex items-center gap-2 text-slate-600 mb-6">
                    <MapPin className="w-5 h-5 text-violet-600 shrink-0" />

                    <span className="text-base font-medium">
                      {formData.isRemote
                        ? "Remote"
                        : formData.location}
                    </span>

                    {formData.isRemote &&
                      formData.location && (
                        <span className="text-slate-500">
                          •{" "}
                          {
                            formData.location
                          }
                        </span>
                      )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-3">

                    {category && (
                      <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium">
                        {category}
                      </span>
                    )}

                    {jobType && (
                      <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                        {jobType}
                      </span>
                    )}

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Posted Today
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Logo */}
                <div className="flex items-center justify-center shrink-0 self-center">
                  {user?.companyLogo ? (
                    <img
                      src={user.companyLogo}
                      alt="Company Logo"
                      className="w-24 h-24 rounded-3xl object-cover border border-slate-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                      <Building2 className="w-10 h-10 text-slate-500" />
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Content Section */}
            <div className="px-0 pb-8 space-y-8">
              {/* Salary Section */}
<div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-5 md:p-6">
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-sm text-gray-500">Compensation</p>

      <h3 className="text-lg md:text-xl font-bold text-gray-900">
        {currencies.find((c) => c.value === formData.currency)?.label}
        {formData.salaryMin.toLocaleString()} -{" "}
        {currencies.find((c) => c.value === formData.currency)?.label}
        {formData.salaryMax.toLocaleString()}
        <span className="text-sm font-medium text-gray-500 ml-1">
          Per year
        </span>
      </h3>
    </div>

    <div className="bg-emerald-100 rounded-full px-4 py-2 inline-flex items-center gap-2 shrink-0">
      <span className="text-emerald-700 text-sm font-medium">
        Competitive
      </span>
    </div>
  </div>
</div>

{/* Job Description */}
<div className="space-y-3 mt-6">
  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
    <span className="text-base md:text-lg">About this role</span>
  </h3>

  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
      {formData.description}
    </div>
  </div>
</div>

{/* Requirements */}
<div className="space-y-3 mt-6">
  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
    <span className="text-base md:text-lg">
      What we are looking for
    </span>
  </h3>

  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-5">
    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
      {formData.requirements}
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;