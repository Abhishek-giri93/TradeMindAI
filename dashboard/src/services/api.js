// ==========================================
// API BASE URL
// ==========================================

const API_BASE_URL = import.meta.env.VITE_API_URL;


// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  return data;
};