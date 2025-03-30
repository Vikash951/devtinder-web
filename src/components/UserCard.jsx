import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({data})=>{
    const {_id , firstName , lastName , photoUrl , gender , age , skills , about} = data;
    const dispatch = useDispatch();

    const handleSendRequest = async (status , userId) => {
        try{
            await axios.post(BASE_URL + "/request/send/" + status + "/" + userId , {} , {withCredentials:true});
            dispatch(removeUserFromFeed(userId));
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="card bg-base-100 w-80 shadow-2xl border border-gray-200 m-2 p-2 mx-auto">
            <figure className=" ">
                <img className="w-50 h-50 rounded-lg"
                src= {photoUrl}
                alt="Shoes" />
            </figure>
            <div className="flex flex-col justify-center items-center m-2">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <h2><span className="font-bold my-1">About: </span>{about}</h2>
                <h2><span className="font-bold my-1">Skills: </span> {skills}</h2>
                <span className="font-bold">{gender}, {age}</span>
            </div>
            <div className="flex gap-3 justify-center  ">
                <button className="bg-blue-600 p-2 rounded m-2" onClick={() => handleSendRequest("ignored" , _id)}>Ignore</button>
                <button className="bg-pink-600 p-2 rounded m-2" onClick={() => handleSendRequest("interested" , _id)}>Interested</button>
            </div>
        </div>
    )
}

export default UserCard;