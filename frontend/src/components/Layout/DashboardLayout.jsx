import { useState, useEffect } from "react";
import {
  Briefcase,
  Building2,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropdown from "../../components/Layout/ProfileDropdown";

const NavagationItem = ({
  item,
  isActive,
  onClick,
  isCollapsed,
}) => {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() =>
        onClick(item.path)
      }
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-50"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {Icon && (
        <Icon
          className={`h-5 w-5 flex-shrink-0 ${
            isActive
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        />
      )}

      {/* Sidebar Text */}
      {!isCollapsed && (
        <span className="ml-3 truncate">
          {item.label}
        </span>
      )}
    </button>
  );
};

const DashboardLayout = ({
  activeMenu,
  children,
}) => {
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeNavItem, setActiveNavItem] =
    useState(
      activeMenu ||
        "dashboard"
    );

  const [
    profileDropdownOpen,
    setProfileDropdownOpen,
  ] = useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  // Responsive behavior
  useEffect(() => {
    const handleResize =
      () => {
        const mobile =
          window.innerWidth <
          760;

        setIsMobile(
          mobile
        );

        if (!mobile) {
          setSidebarOpen(
            false
          );
        }
      };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside =
      () => {
        if (
          profileDropdownOpen
        ) {
          setProfileDropdownOpen(
            false
          );
        }
      };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, [
    profileDropdownOpen,
  ]);

  const handleNavigation = (
    itemPath
  ) => {
    console.log(
      "Navigating to:",
      itemPath
    );

    setActiveNavItem(
      itemPath
    );

    navigate(itemPath);

    if (isMobile) {
      setSidebarOpen(
        false
      );
    }
  };

  const toggleSidebar =
    () => {
      setSidebarOpen(
        !sidebarOpen
      );
    };

  const sidebarCollapsed =
    false;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${
          sidebarCollapsed
            ? "w-16"
            : "w-64"
        } bg-white border-r border-gray-200 shadow-md`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed ? (
            <Link
              className="flex items-center gap-2"
              to="/"
            >
              <div className="bg-blue-500 p-2 rounded-lg text-white">
                <Briefcase className="w-5 h-5" />
              </div>

              <span className="text-xl font-bold text-gray-800">
                JobIndia
              </span>
            </Link>
          ) : (
            <div className="flex justify-center">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={
                toggleSidebar
              }
            >
              <X />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {NAVIGATION_MENU?.map(
            (item) => (
              <NavagationItem
                key={item.id}
                item={item}
                isActive={
                  activeNavItem ===
                  item.path
                }
                onClick={
                  handleNavigation
                }
                isCollapsed={
                  sidebarCollapsed
                }
              />
            )
          )}
        </div>

        {/* Logout */}
        <div className="absolute bottom-5 left-0 w-full px-4">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50"
            onClick={
              logout
            }
          >
            <LogOut className="w-5 h-5" />

            {!sidebarCollapsed && (
              <span>
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 min-h-screen ${
          !isMobile
            ? "ml-64"
            : "ml-0"
        }`}
      >
        {/* Topbar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          {isMobile && (
            <button
              type="button"
              onClick={
                toggleSidebar
              }
            >
              <Menu />
            </button>
          )}

          <h1 className="font-semibold text-lg capitalize">
            {activeMenu}
          </h1>

          {/* Profile Dropdown */}
          <ProfileDropdown
            isOpen={
              profileDropdownOpen
            }
            onToggle={(e) => {
              e.stopPropagation();
              setProfileDropdownOpen(
                !profileDropdownOpen
              );
            }}
            avatar={
              user?.avatar || ""
            }
            companyName={
              user?.name || ""
            }
            email={
              user?.email || ""
            }
            onLogout={logout}
          />
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;