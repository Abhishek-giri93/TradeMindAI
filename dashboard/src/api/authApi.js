const API_URL="http://localhost:3000";

export const getCurrentUser = async ()=>{
  const response = await fetch(`${API_URL}/auth/me`, {
    method : "GET",
    credentials : "include"
  })

  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Failed to fetch current user");
  }
  return data.user;
}

export const logoutUser = async()=>{
  const response = await fetch(`${API_URL}/auth/logout`, {
    method : "POST",
    credentials : "include"
  })
  const data =await response.json();
  if(!response.ok){
    throw new Error(data.message || "Logout failed.")
  }
}