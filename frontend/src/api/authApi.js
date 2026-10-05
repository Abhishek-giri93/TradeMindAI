const API_URL = process.env.REACT_APP_API_URL;

// ============================================================
// REGISTER USER
// ============================================================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    // Allows cookies to be handled for cross-origin requests
    credentials: "include",

    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.errors?.[0] ||
      data.message ||
      "Registration failed"
    );
  }

  return data;
};

// ============================================================
// LOGIN USER
// ============================================================

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    // IMPORTANT:
    // Backend sends JWT as an HttpOnly cookie.
    // Browser will store the cookie automatically.
    credentials: "include",

    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  // Debug: check backend response
  console.log("Login API response:", data);

  if (!response.ok) {
    throw new Error(
      data.errors?.[0] ||
      data.message ||
      "Login failed"
    );
  }

  // IMPORTANT:
  // Do NOT check data.token here.
  //
  // The JWT is NOT returned in the JSON response.
  // It is stored by the browser as an HttpOnly cookie.
  //
  // Example backend response:
  // {
  //   message: "Logged in successfully",
  //   userId: 1,
  //   name: "...",
  //   email: "..."
  // }

  return data;
};