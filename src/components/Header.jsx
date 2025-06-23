import { useNavigate } from "react-router-dom";

import { UserCircle2 } from "lucide-react";

import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();


  const handleClick = () => navigate("/form");



  return (
  <header className="w-full bg-white dark:bg-gray-900 py-10 px-4 relative">
  <Navbar />

  {/* Inner content container - center the content but background still covers full screen */}
  <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5">
    <h1 className="text-3xl sm:text-4xl font-bold text-white-800">
      Welcome to <span className="text-blue-600">Peer Learning Platform</span>
    </h1>

    <p className="max-w-2xl text-gray-200 text-base sm:text-lg font-normal leading-relaxed">
      Share your expertise with peers by contributing to a growing collection of student-led sessions and topic explanations.
    </p>

    <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md transition"
    >
      Post your learning +
    </button>
  </div>

  {/* User Icon Dropdown - keep it positioned */}
  {/* <div className="absolute top-4 right-4">
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
    >
      <UserCircle2 className="w-8 h-8" />
    </button>

    {showMenu && (
      <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-xl p-4 z-10 space-y-3 text-left">
        <p className="font-semibold text-gray-800">{fullName}</p>
        <p className="text-sm text-gray-600">📧 {email}</p>
        <p className="text-sm text-gray-600">📱 {phone}</p>
        {username !== "" && <p className="text-sm text-gray-600">👤 {username}</p>}

        <hr />

        <button
          onClick={() => navigate(`/performance/${email}`)}
          className="w-full text-left text-blue-600 hover:underline"
        >
          📊 View Your Performance
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="w-full text-left text-purple-600 hover:underline"
        >
          🏆 View Leaderboard
        </button>
      </div>
    )}
  </div> */}
</header>

  );
};

export default Header;
