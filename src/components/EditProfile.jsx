import { useState } from "react";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import { BASE_URL } from "../utils/constant";
import UserCard from "./userCard";

const EditProfile = ({user} ) => {

    const [error , setError] = useState("");

    const [firstName , setFirstName] = useState(user.firstName);
    const [lastName , setLastName] = useState(user.lastName);
    const [age , setAge] = useState(user.age);
    const [gender , setGender] = useState(user.gender);
    const [photoUrl , setPhotoUrl] = useState(user.photoUrl);
    const [skills , setSkills] = useState(user.skills);
    const [about , setAbout] = useState(user.about);
    const [toast , setToast] = useState(false);

    

    const dispatch = useDispatch();
    

    const handleProfile = async () =>  {
        setError("");
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit" , {firstName , lastName , photoUrl , gender , age , skills , about } , {withCredentials : true});

            dispatch(addUser(res?.data?.data));
            
            setToast(true);

            setTimeout(() => {
                setToast(false);
            }, 3000);
        }
        catch(err){
            console.log(err);
            if (err.response) {
                setError(err?.response?.data);  // Set error message from backend
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }
  return (
    <>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-6 ml-50">
            <div className="flex justify-center my-20">
                <div className="card card-dash bg-base-300 w-96 ">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" placeholder="Type here" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name </legend>
                                <input type="text" className="input" placeholder="Type here" value = {lastName} onChange = {(e) => setLastName(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" className="input" placeholder="Type here" value = {age} onChange = {(e) => setAge(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender </legend>
                                <input type="text" className="input" placeholder="Type here" value = {gender} onChange = {(e) => setGender(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills</legend>
                                <input type="text" className="input" placeholder="Type here" value = {skills} onChange = {(e) => setSkills(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <input type="text" className="input" placeholder="Type here" value = {about} onChange = {(e) => setAbout(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo Url</legend>
                                <input type="text" className="input" placeholder="Type here" value = {photoUrl} onChange = {(e) => setPhotoUrl(e.target.value)}/>
                            </fieldset>
                        </div>
                        {error && <p className="text-red-500">{error}</p> }
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <UserCard data = {{firstName , lastName , photoUrl , gender , age , skills , about }} />
    </div>
        {toast && <div className="fixed top-5 right-5  text-white py-2 px-4 rounded-lg shadow-lg">
        <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
        </div>
        </div>}
    </>
  )
}

export default EditProfile;