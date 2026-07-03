import { useEffect, useState } from "react";
import { Briefcase, Users, TrendingUp, CheckCircle2, Plus, Building2 } from "lucide-react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import JobDasboardCard from "../../components/Cards/JobDasboardCard.jsx";
import ApplicantDashboardCard from "../../components/Cards/ApplicantDashboardCard.jsx";

const Card = ({ className, children, title, subtitle, headerAction }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {headerAction}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0 rounded-2xl p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <p>{title}</p>
          <p>{value}</p>

          {trend && (
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <Icon />
      </div>
    </Card>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [dashboardData] = useState({
    counts: {
      totalActiveJobs: 0,
      totalApplications: 0,
      totalHired: 0,
      trends: {
        totalApplicants: 0,
      },
      trend: {
        totalHired: 0,
      },
    },

    data: {
      recentJobs: [
        {
          title: "Frontend Developer",
          location: "Kolkata",
          createdAt: new Date(),
          isClosed: false,
        },
        {
          title: "Backend Developer",
          location: "Remote",
          createdAt: new Date(),
          isClosed: true,
        },
      ],

      recentApplications: [
        {
          applicant: { name: "Sunny Roy" },
          position: "Frontend Developer",
          time: "2 hours ago",
        },
        {
          applicant: { name: "Rahul Das" },
          position: "Backend Developer",
          time: "5 hours ago",
        },
      ],
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout activeMenu="">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto pt-0">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-none">
              Welcome back!
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your jobs today.
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <StatCard
              title="Active Jobs"
              value={dashboardData?.counts?.totalActiveJobs}
              icon={Briefcase}
              trend={true}
              trendValue={`${dashboardData?.counts?.totalActiveJobs}`}
              color="blue"
            />

            <StatCard
              title="Total Applicants"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trend={true}
              trendValue={`${dashboardData?.counts?.trends?.totalApplicants || 0}`}
              color="green"
            />

            <StatCard
              title="Hired"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trend={true}
              trendValue={`${dashboardData?.counts?.trend?.totalHired || 0}`}
              color="purple"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <Card
              title="Recent Job Posts"
              subtitle="Your latest job posting"
              headerAction={
                <button
                  className="text-sm font-medium text-blue-600"
                  onClick={() => navigate("/manage-job")}
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs?.length > 0 ? (
                  dashboardData?.data?.recentJobs?.slice(0, 3)?.map((job, index) => (
                    <JobDasboardCard
                      key={index}
                      job={job}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No recent jobs found.
                  </p>
                )}
              </div>
            </Card>

            <Card
              title="Recent Applications"
              subtitle="Latest Candidate Applications"
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications?.length > 0 ? (
                  dashboardData?.data?.recentApplications?.slice(0, 3)?.map((item, index) => (
                    <ApplicantDashboardCard
                      key={index}
                      applicant={item.applicant}
                      position={item.position}
                      time={item.time}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No recent applications found.
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card
            title="Quick Actions"
            subtitle="Common tasks to get you started"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: "Post new job",
                  icon: Plus,
                  color: "bg-blue-50 text-blue-700",
                  path: "/post-job",
                },
                {
                  title: "Review applications",
                  icon: Users,
                  color: "bg-green-50 text-green-700",
                  path: "/manage-job",
                },
                {
                  title: "Company settings",
                  icon: Building2,
                  color: "bg-orange-50 text-orange-700",
                  path: "/company-profile",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;