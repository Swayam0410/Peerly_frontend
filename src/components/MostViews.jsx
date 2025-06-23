import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const MostViews=()=>{
  const navigate=useNavigate();
  const user=useUser();
    const [arr,setArr]=useState([])
      const fetchData = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/`;
    const res = await fetch(url);
    const resp = await res.json();
    console.log(resp);
    const resp1=resp.sort((a, b) => b.viewed.length - a.viewed.length);
    setArr(resp1);
  } catch (err) {
    console.log("error fetching stored data", err);
  }
};
     const addClick=async({_id,email})=>{
  try {
    const res=await fetch(`${import.meta.env.VITE_API_URL}/addview`,{
      method:"PATCH",
       headers: { "Content-Type": "application/json" },
       body:JSON.stringify({_id,email}),
    });

    const resp=await res.json();
    console.log(resp.viewsCount);
  } catch (err) {
    console.log("error patching data ",err);
  }
 }


 const handleClick = (entry) => {
    navigate(`/article/${entry._id}`, {
      state: { entry },
    });
    console.log("hello");
  };
useEffect(()=>{
    fetchData();
},[]);
    return (
  <div className="container mx-auto px-4 py-6 text-white">
    {/* Heading */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-whote">🔥 Most Viewed Sessions</h1>
      <p className="text-gray-200 mt-2 text-lg">Here are the sessions everyone’s checking out!</p>
    </div>

    {/* Sessions Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {arr.map((a) => (
        <SessionCard
          key={a._id}
          onClick={() => {
            addClick({ _id: a._id, email: user.user?.primaryEmailAddress?.emailAddress });
            handleClick(a);
          }}
          {...a}
        />
      ))}
    </div>
  </div>
);

}
export default MostViews;