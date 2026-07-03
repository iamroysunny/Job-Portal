import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  IndianRupee,
  Briefcase,
  Eye,
  Send,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";
import InputField from "../../components/Input/InputField";
import TextareaField from "../../components/Input/TextareaField";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (jobId) getJobDetails();
  }, [jobId]);

  const getJobDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
      );

      if (response.data) {
        setFormData({
          jobTitle: response.data.jobTitle || "",
          location: response.data.location || "",
          category: response.data.category || "",
          jobType: response.data.jobType || "",
          description: response.data.description || "",
          requirements: response.data.requirements || "",
          salaryMin: response.data.salaryMin || "",
          salaryMax: response.data.salaryMax || "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch job details");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim())
      errors.jobTitle = "Job title is required";

    if (!formData.location.trim())
      errors.location = "Location is required";

    if (!formData.category)
      errors.category = "Category is required";

    if (!formData.jobType)
      errors.jobType = "Job type is required";

    if (!formData.description.trim())
      errors.description = "Description is required";

    if (!formData.requirements.trim())
      errors.requirements = "Requirements are required";

    if (!formData.salaryMin)
      errors.salaryMin = "Minimum salary required";

    if (!formData.salaryMax)
      errors.salaryMax = "Maximum salary required";

    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
     setIsSubmitting(true);

const payload = {
  title: formData.jobTitle,
  location: formData.location,
  category: formData.category,
  type: formData.jobType,
  description: formData.description,
  requirements: formData.requirements,
  salaryMin: Number(formData.salaryMin),
  salaryMax: Number(formData.salaryMax),
};

      if (jobId) {
        await axiosInstance.put(
          API_PATHS.JOBS.UPDATE_JOB(jobId),
          payload
        );

        toast.success("Job updated successfully");
      } else {
      await axiosInstance.post(
  API_PATHS.JOBS.POST_JOB,
  payload
        );

        toast.success("Job posted successfully");
      }

      navigate("/employer-dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview
          formData={formData}
          setIsPreview={setIsPreview}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gray-40 p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6">

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {jobId ? "Edit Job" : "Post a new job"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Fill out the form below to create your job posting
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreview(true)}
                disabled={!isFormValid()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5"
              >
                {/* Job Title */}
                <InputField
                  label="Job Title"
                  id="jobTitle"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  error={errors.jobTitle}
                  required
                  icon={Briefcase}
                />

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>

                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />

                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter location"
                    />
                  </div>

                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Category + Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>

                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select Category</option>

                      {CATEGORIES?.map((cat, index) => (
                        <option key={index} value={cat?.value}>
                          {cat?.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Job Type
                    </label>

                    <select
                      value={formData.jobType}
                      onChange={(e) =>
                        handleInputChange("jobType", e.target.value)
                      }
                      className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select Job Type</option>

                      {JOB_TYPES?.map((type, index) => (
                        <option key={index} value={type?.value}>
                          {type?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <TextareaField
                  label="Job description"
                  id="description"
                  placeholder="Describe the role and responsibility..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  error={errors.description}
                  rows={8}
                  required
                />

                <TextareaField
                  label="Requirements"
                  id="requirements"
                  placeholder="List key qualification and skills..."
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  error={errors.requirements}
                  rows={8}
                  required
                />

                {/* Salary */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Range
                  </label>

                  <div className="grid grid-cols-2 gap-5">
                    {["salaryMin", "salaryMax"].map((field, index) => (
                      <div key={field} className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <IndianRupee className="w-4 h-4 text-gray-500" />
                        </div>

                        <input
                          type="number"
                          placeholder={index === 0 ? "Min" : "Max"}
                          value={formData[field]}
                          onChange={(e) =>
                            handleInputChange(field, e.target.value)
                          }
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />

                    {isSubmitting
                      ? "Submitting..."
                      : jobId
                      ? "Update Job"
                      : "Post Job"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;