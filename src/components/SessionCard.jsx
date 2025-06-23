import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, ArrowBigUp } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

const SessionCard = ({ onClick, topic, sem, name, subject, _id, email, upvotes, viewed = [] }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes.length);
  const [upvotesArr, setUpvotesArr] = useState(upvotes);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useUser();
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    if (user?.emailAddresses?.length > 0) {
      setLoggedInEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/form`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ _id }),
});

      const resp = await res.json();
      console.log(resp);
    } catch (err) {
      console.error("Error deleting file", err);
    } finally {
      window.location.reload();
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${_id}`);
  };

  const handleUpvotes = async (e) => {
    e.stopPropagation();
   const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userEmail: loggedInEmail, id: _id }),
});


    const data = await res.json();
    if (res.ok) {
      setUpvotesArr(data.upvotes);
      setHasUpvoted(data.upvoted);
      setUpvotesCount(data.count);
    }
  };

  return (
  <div
  onClick={onClick}
  className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 w-full max-w-md hover:scale-[1.03] hover:rotate-[0.5deg] transition-all duration-300 ease-in-out cursor-pointer group"
>
  {/* Upvote Button */}
  <button
    className={`absolute top-3 right-3 flex items-center gap-1 text-sm px-3 py-1 rounded-full font-semibold shadow transition-all
      ${upvotesArr.includes(loggedInEmail)
        ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-500 shadow-yellow-500/40'
        : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-yellow-100 hover:shadow-md'}
    `}
    onClick={handleUpvotes}
  >
    <ArrowBigUp
      size={20}
      className={`transition-transform duration-150 ${
        hasUpvoted ? 'fill-yellow-700 text-yellow-700' : 'text-gray-500'
      }`}
    />
    {upvotesCount}
  </button>

  {/* View Badge */}
  <div className="absolute top-3 left-3 px-3 py-1 text-sm rounded-full bg-white/70 text-gray-800 border border-white/30 shadow-md backdrop-blur-md">
    👁️ {viewed.length} {viewed.length === 1 ? 'view' : 'views'}
  </div>

  <div className="space-y-2 mt-6">
    <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm transition-all group-hover:text-cyan-300">
      📌 {topic}
    </h2>
    <p className="text-sm text-gray-200">🎓 <span className="font-semibold text-white">Semester:</span> {sem}</p>
    <p className="text-sm text-gray-200">📘 <span className="font-semibold text-white">Subject:</span> {subject}</p>
    <p className="text-sm text-gray-200">🙋‍♂️ <span className="font-semibold text-white">Contributed by:</span> {name}</p>
  </div>
  <br />
    <button
      onClick={onClick}
      className="px-4 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-full font-semibold shadow hover:shadow-cyan-500 transition-all"
    >
      👁️ View
    </button>
  <div className="flex flex-wrap gap-3 justify-center items-center mt-4">
    {loggedInEmail === email && (
      <button
        onClick={handleEdit}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow hover:shadow-indigo-500 transition-all"
      >
        <Pencil size={18} />
        Edit
      </button>
    )}
       {loggedInEmail === email && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDialog(true);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-900 text-white rounded-full shadow-md hover:shadow-red-700 transition-all"
      >
        <Trash2 size={18} />
        Delete
      </button>
    )}

    <ConfirmDialog
      open={showDialog}
      onOpenChange={setShowDialog}
      onConfirm={handleDelete}
      onCancel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDialog(false);
      }}
    />
  </div>
</div>

  );
};

export default SessionCard;
