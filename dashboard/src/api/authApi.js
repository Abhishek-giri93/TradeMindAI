const API_URL = import.meta.env.VITE_API_URL;

// ============================================================
// GET CURRENT USER
// ============================================================

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",

    // IMPORTANT:
    // Browser automatically sends the HttpOnly
    // accessToken cookie with this request.
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch current user"
    );
  }

  return data.user;
};

// ============================================================
// LOGOUT USER
// ============================================================

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",

      // IMPORTANT:
      // Sends the HttpOnly accessToken cookie to the backend.
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Logout failed."
      );
    }

    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};