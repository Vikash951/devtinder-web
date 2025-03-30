import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connections);

  console.log(connection);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) {
    return;
  }

  if (connection.length === 0) {
    return <h1 className="text-center text-3xl font-bold my-10">No connection found</h1>;
  }

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-6">Connections</h1>
      <div className="flex flex-col items-center gap-8">
        {connection.map((connect) => {
          const { firstName, lastName, photoUrl, about , age , gender } = connect;
          console.log(connect);

          return (
            <div key={firstName} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border border-gray-200 hover:shadow-xl transition-shadow w-full max-w-md">
              <img
                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
                src={photoUrl}
                alt="Profile"
              />
              <h2 className="mt-4 text-xl font-semibold">{firstName + " " + lastName}</h2>
              {age && gender && <p className="mt-2">{age + " " + gender}</p>}
              <p className="text-gray-600 text-sm mt-2 text-center px-4">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
