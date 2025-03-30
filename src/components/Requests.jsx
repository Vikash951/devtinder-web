import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest , addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status , _id) => {
        try{    
            console.log(BASE_URL + "/request/review/" + status + "/" + _id);
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
              );
            console.log(res);
            dispatch(removeRequest(_id));
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/:userId/requests/received", { withCredentials: true });
            
            dispatch(addRequests(res?.data?.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;
    if (requests.length === 0) {
        return <h1 className="flex justify-center items-center font-bold mt-10 text-3xl mb-10">No Requests Found</h1>;
    }
    

    return (
        <div className="text-center my-10 px-4">
            <h1 className="font-bold text-3xl mb-6">Requests</h1>
            <div className="flex flex-col items-center gap-8">
                {requests.map((request) => {
                    const { _id , firstName, lastName, photoUrl,  about } = request.fromUserId;

                    return (
                        <div key={firstName} className="bg-white shadow-lg rounded-lg p-6 flex items-center border border-gray-200 hover:shadow-xl transition-shadow w-full max-w-md">
                            <img
                                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover mr-4"
                                src={photoUrl}
                                alt="Profile"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{firstName + " " + lastName}</h2>
                                <p className="text-gray-600 text-sm mt-2">{about}</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-blue-600 p-2 rounded text-white" onClick={() => reviewRequest("rejected" , request._id)}>Reject</button>
                                <button className="bg-pink-600 p-2 rounded text-white" onClick={() => reviewRequest("accepted" , request._id)}>Accept</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;
