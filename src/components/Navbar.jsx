import {useSelector , useDispatch   } from "react-redux";
import { Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";


const Navbar =  ()=>{

    const user =  useSelector((store) => store.user);

    //console.log(user);

    // const {firstName , photoUrl} = user;
    // console.log(firstName , photoUrl)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            await axios.post(BASE_URL + "/logout" , {} , {withCredentials : true});
            dispatch(removeUser());
            return navigate("/login");
        }
        catch(err){
            console.log(err);
        }
       
    }

    return (<div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
            <Link to = "/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>

        {user && <div className="flex gap-2">
            <p className="mt-2">Welcome, {user?.firstName}</p>
            <div className="dropdown dropdown-end mx-5">
              
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                   {user && <div className="w-10 rounded-full">
                        <img
                        alt="Tailwind CSS Navbar component"
                        src= { user?.photoUrl }/>
                    </div> }
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <Link  to = "/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><Link to="/">Feed</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><Link to="/connections">Connections</Link></li>
                    <li><Link  onClick = {handleLogout}>Logout</Link></li>
                </ul>
            </div>
        </div>}
    </div>)
}

export default Navbar