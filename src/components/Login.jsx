import { useState } from "react";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {

    const [emailId , setEmailId] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () =>  {
        try{
            const res = await axios.post(BASE_URL + "/login" , {emailId , password} , {withCredentials : true});

            const userData = { ...res.data }; 
           
            dispatch(addUser(userData));
            navigate("/");
        }
        catch(err){
            if (err.response) {
                setError(err?.response?.data?.message);  // Set error message from backend
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="flex justify-center my-20">
            <div className="card card-dash bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your Email Id?</legend>
                            <input type="email" className="input" placeholder="Type here" value = {emailId} onChange = {(e) => setEmailId(e.target.value)}/>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your Password? </legend>
                            <input type="password" className="input" placeholder="Type here" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                        </fieldset>
                    </div>
                    {error && <p className="text-red-500">{error}</p> }
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;