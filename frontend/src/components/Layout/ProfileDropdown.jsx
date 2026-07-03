import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
    isOpen,
    onToggle,
    avatar = "",
    companyName = "",
    email = "",
    onLogout,
    userRole,
}) => {

    const navigate = useNavigate();

    return <div className="relative">
        <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2"
        >
            {avatar ?(
                <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <span className="font-medium">
                        {companyName?.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}

            <div className="">
                <p className="font-medium text-sm">
                    {companyName}
                </p>

                <p className="text-xs text-gray-500">
                    Employer
                </p>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-3 border-b">
                    <p className="font-medium">
                        {companyName}
                    </p>

                    <p className="text-sm text-gray-500">
                        {email}
                    </p>
                </div>

                <button
                type="button"
                onClick={() =>
                    navigate(
                        userRole === 'jobseeker'
                        ? '/profile'
                        : '/companyProfile'
                    )
                }
                className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                    View Profile
                </button>

                <div className="border-t">
                    <button
                    type="button"
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        )}
    </div>
};

export default ProfileDropdown;