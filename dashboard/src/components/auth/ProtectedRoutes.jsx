import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../api/authApi";

function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // Check user authentication
    checkAuth();
  }, []);

  // While authentication is being checked
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // If user is not authenticated,
  // redirect to Frontend login page
  if (!isAuthenticated) {
    window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/login`;
    return null;
  }

  // If authenticated, allow access to protected routes
  return <Outlet />;
}

export default ProtectedRoutes;