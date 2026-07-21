import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export function ProtectedRoute(){

const {user,loading}=useAuth();


if(loading){

return (
<p className="p-8 text-slate-600">
Loading your account...
</p>
);

}


if(!user){

return (
<Navigate 
to="/login"
replace
/>
);

}


return <Outlet/>;

}