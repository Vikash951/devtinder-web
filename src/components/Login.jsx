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
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");

    const [showLogin , setShowLogin] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () =>  {
        try{
            const res = await axios.post(BASE_URL + "/login" , {emailId , password} , {withCredentials : true});

           
            dispatch(addUser(res.data));
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

    const handleSignUp = async () => {
        try{
            const res = await axios.post(BASE_URL + "/signup" , {firstName , lastName , emailId , password} , {withCredentials : true});
            dispatch(addUser(res?.data?.data));
            navigate("/profile");
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center my-20">
            <div className="card card-dash bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title justify-center">{showLogin ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!showLogin && <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your First Name?</legend>
                            <input type="email" className="input" placeholder="Type here" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}/>
                        </fieldset>}
                        {!showLogin && <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your Last Name?</legend>
                            <input type="email" className="input" placeholder="Type here" value = {lastName} onChange = {(e) => setLastName(e.target.value)}/>
                        </fieldset>}
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
                        <button className="btn btn-primary"  onClick=  {showLogin ? handleLogin : handleSignUp}>{showLogin ? "Login" : "Sign Up"}</button>
                    </div>
                    <div>
                        {!showLogin && (
                            <p className="mt-2 ">
                                <span className="font-bold">Already registered? </span>
                                <button className="cursor-pointer" onClick={() => setShowLogin(true)}>Login </button>
                            </p>
                        )}
                        {showLogin && (
                            <p className="">
                                <span className="font-bold">New User? </span>
                                <button className="cursor-pointer" onClick={() => setShowLogin(false)}> Signup </button>
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;