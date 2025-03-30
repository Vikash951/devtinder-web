const UserCard = ({data})=>{
    const {firstName , lastName , photoUrl , gender , age , skills , about} = data;
    return (
        <div className="card bg-base-100 w-80 shadow-2xl border border-black m-2 p-2 mx-auto">
            <figure className=" ">
                <img className="w-50 h-50 rounded-lg"
                src= {photoUrl}
                alt="Shoes" />
            </figure>
            <div className="flex flex-col justify-center items-center m-2">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <h2>About: {about}</h2>
                <h2>Skills: {skills}</h2>
                <span>{gender}, {age}</span>
            </div>
            <div className="flex gap-3 justify-center  ">
                <button className="bg-blue-600 p-2 rounded m-2">Ignore</button>
                <button className="bg-pink-600 p-2 rounded m-2">Interested</button>
            </div>
        </div>
    )
}

export default UserCard;