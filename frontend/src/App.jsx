import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import LandingPage from './pages/LandingPage/LandingPage';
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import JobSeekerDashboard from "./pages/Jobseeker/JobSeekerDashboard";
import JobDetails from "./pages/Jobseeker/JobDetails";
import SavedJobs from "./pages/Jobseeker/SavedJobs";
import UserProfile from "./pages/Jobseeker/UserProfile";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import ManageJob from "./pages/Employer/ManageJobs";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import ProtectedRoute from "./routers/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          {/* ✅ Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Job Seeker Routes */}
          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile" element={<UserProfile />} />

          {/* ✅ Employer Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="employer" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-job" element={<ManageJob />} />
            <Route path="/application-viewer" element={<ApplicationViewer />} />
            <Route path="/compnay-profile" element={<EmployerProfilePage />} />
          </Route>

          {/* ✅ Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          style: { fontSize: "13px" },
        }}
      />
    </div>
  );
};

export default App;