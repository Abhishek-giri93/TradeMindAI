import { Navigate , Outlet } from "react-router-dom";
import { useState , useEffect} from "react";
import { getCurrentUser } from "../../api/authApi";

function ProtectedRoutes(){
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const checkAuth = async ()=>{
      try{
        await getCurrentUser();
        setIsAuthenticated(true);
      }
      catch(error){
        console.log("Authentication check failed :", error);
        setIsAuthenticated(false);
      }
      finally{
        setLoading(false);
      }
    } 
    // calling checkAuth-
    checkAuth();
  }, [])

  if(loading){
    return <div>Checking authentication...</div>
  }

  if(!isAuthenticated){
    window.location.href="http://localhost:3001/login";
    return null;
  }
  return <Outlet />

}

export default ProtectedRoutes;