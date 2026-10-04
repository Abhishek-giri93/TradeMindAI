const API_URL = import.meta.env.VITE_API_URL;

export const getHoldings = async () => {
  const response = await fetch(`${API_URL}/holdings`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "Holdings API error:",
      data
    );

    throw new Error(
      data.error ||
      data.message ||
      "Failed to fetch holdings"
    );
  }

  return data;
};