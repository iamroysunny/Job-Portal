import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = ({
  requiredRole,
}) => {
  const location =
    useLocation();

  // Get Token
  const token =
    localStorage.getItem(
      "token"
    ) ||
    sessionStorage.getItem(
      "token"
    );

  // Get User
  const userData =
    localStorage.getItem(
      "user"
    );

  const user = userData
    ? JSON.parse(userData)
    : null;

  // Debug
  console.log(
    "Token:",
    token
  );
  console.log(
    "User:",
    user
  );
  console.log(
    "User Role:",
    user?.role
  );
  console.log(
    "Required Role:",
    requiredRole
  );

  // If not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  // Role Check
  if (
    requiredRole &&
    user?.role !==
      requiredRole
  ) {
    console.log(
      "Role mismatch"
    );

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Allow Access
  return <Outlet />;
};

export default ProtectedRoute;