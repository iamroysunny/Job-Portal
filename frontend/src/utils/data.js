import {
    Search,
    FileText,
    MessageSquare,
    BarChart3,
    Shield,
    Clock,
    Briefcase,
    Award,
    Users,
    UserCheck,
    ClipboardList,
    TrendingUp,
    LayoutDashboard,
    Plus,
    Building2
} from "lucide-react";


// Job Seeker Features
export const jobSeekerFeatures = [
    {
        icon: Search,
        title: "Smart Job Matching",
        description:
            "AI-powered algorithm matches you with relevant opportunities based on your skills and preferences."
    },
    {
        icon: FileText,
        title: "Resume Builder",
        description:
            "Create professional resumes with intuitive templates."
    },
    {
        icon: MessageSquare,
        title: "Direct Messaging",
        description:
            "Communicate directly with recruiters in real-time."
    },
    {
        icon: BarChart3,
        title: "Application Tracking",
        description:
            "Track your job applications and monitor their progress."
    },
    {
        icon: Shield,
        title: "Secure Profile",
        description:
            "Your data is protected with strong privacy controls."
    },
    {
        icon: Clock,
        title: "Real-time Alerts",
        description:
            "Get instant notifications for new job postings."
    },
    {
        icon: Briefcase,
        title: "Job Management",
        description:
            "Save jobs, apply later, and manage everything in one place."
    },
    {
        icon: Award,
        title: "Skill Recognition",
        description:
            "Showcase your achievements to stand out."
    }
];


// Employer Features
export const employerFeatures = [
    {
        icon: Users,
        title: "Candidate Management",
        description:
            "Manage and organize all applicants in one dashboard."
    },
    {
        icon: UserCheck,
        title: "Smart Candidate Matching",
        description:
            "AI recommends the best candidates for your job openings."
    },
    {
        icon: ClipboardList,
        title: "Job Posting",
        description:
            "Create and publish job listings easily."
    },
    {
        icon: MessageSquare,
        title: "Direct Communication",
        description:
            "Chat with candidates in real-time."
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
            "Track applications and hiring performance."
    },
    {
        icon: Shield,
        title: "Secure Hiring",
        description:
            "Keep your hiring data safe and protected."
    },
    {
        icon: Clock,
        title: "Interview Scheduling",
        description:
            "Schedule and manage interviews efficiently."
    },
    {
        icon: TrendingUp,
        title: "Hiring Insights",
        description:
            "Improve hiring with data-driven insights."
    }
];


// Navigation Menu (FIXED)
export const NAVIGATION_MENU = [
    {
        id: 1,
        label: "Dashboard",
        path: "/employer-dashboard",
        icon: LayoutDashboard
    },
    {
        id: 2,
        label: "Post Job",
        path: "/post-job",
        icon: Plus
    },
    {
        id: 3,
        label: "Manage Jobs",
        path: "/manage-job",
        icon: Briefcase
    },
    {
        id: 4,
        label: "Company Profile",
        path: "/compnay-profile",
        icon: Building2
    }
];


// Categories
export const CATEGORIES = [
    { value: "Engineering", label: "Engineering" },
    { value: "Design", label: "Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Operations", label: "Operations" },
    { value: "Product Management", label: "Product Management" },
    { value: "Data Science", label: "Data Science" }
];


// Job Types
export const JOB_TYPES = [
    { value: "Remote", label: "Remote" },
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" }
];


// Salary Range
export const SALARY_RANGE = [
    { value: "0-3", label: "Less than ₹3 LPA" },
    { value: "3-6", label: "₹3 - ₹6 LPA" },
    { value: "6-10", label: "₹6 - ₹10 LPA" },
    { value: "10-15", label: "₹10 - ₹15 LPA" },
    { value: "15+", label: "₹15+ LPA" }
];