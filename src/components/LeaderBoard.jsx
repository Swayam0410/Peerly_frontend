import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const LeaderBoard=()=>{
  const navigate=useNavigate();
  const [data,setData]=useState([]);

  const fetchData=async ()=>{
    try{

      const d= await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
     const json = await d.json(); // await here
     console.log(json,100);
    setData(json);
    }catch(err){
      console.log("error fetching leaderboard data ", err);
    }
  }
  useEffect(()=>{
    fetchData();
    console.log(data);
  },[]);
return (
  <div className="min-h-screen px-6 py-10 bg-gray-50">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-500 drop-shadow-md">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Top sessions with the most upvotes from learners!
        </p>
      </div>

      {data.length===0 ? (
        <p className="text-center text-gray-500">Loading leaderboard...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800 text-sm uppercase">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Upvotes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-indigo-50 transition duration-200"
                onClick={()=>navigate(`/performance/${user._id}`)}
              
              >
                <td className="p-3 font-semibold text-gray-700">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td className="p-3 text-black">{user.name}</td>
                <td className="p-3 text-sm text-gray-500">{user._id}</td>
                <td className="p-3 font-semibold text-indigo-600">
                  {user.totalUpvotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

}

export default LeaderBoard