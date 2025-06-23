import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { UserCircle2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");

  const fullName = user?.fullName || "Anonymous";
  const email = user?.primaryEmailAddress?.emailAddress || "Not Provided";
  const phone = user?.phoneNumbers?.[0]?.phoneNumber || "Not Provided";
  const username = user?.username || "";

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const navLinkClass = (target) =>
    path === target
      ? "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-500 md:p-0"
      : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent";

  return (
    <nav className="bg-[#101828] fixed w-full z-20 top-0 start-0 border-b border-gray-700 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-semibold text-white">Peerly</span>
        </div>

        {/* Right Actions (Mobile menu + Profile dropdown) */}
        <div className="flex items-center gap-4 md:order-2 relative">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 text-[#CBD5E1] hover:text-white"
            >
              <UserCircle2 className="w-8 h-8" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1E293B] border border-[#334155] shadow-xl rounded-xl p-4 z-10 space-y-3 text-left text-[#CBD5E1]">
                <p className="font-semibold text-white">{fullName}</p>
                <p className="text-sm text-[#94A3B8]">📧 {email}</p>
                <p className="text-sm text-[#94A3B8]">📱 {phone}</p>
                {username && (
                  <p className="text-sm text-[#94A3B8]">👤 {username}</p>
                )}

                <hr className="border-[#334155]" />

                <button
                  onClick={() => navigate(`/performance/${email}`)}
                  className="w-full text-left text-blue-400 hover:text-blue-300"
                >
                  📊 View Your Performance
                </button>

                <button
                  onClick={() => navigate("/leaderboard")}
                  className="w-full text-left text-purple-400 hover:text-purple-300"
                >
                  🏆 View Leaderboard
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-700 rounded-lg bg-[#1E293B] md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li onClick={() => navigate("/")}>
              <a href="#" className={navLinkClass("/")}>Home</a>
            </li>
            <li onClick={() => navigate("/highlyrated")}>
              <a href="#" className={navLinkClass("/highlyrated")}>Most Liked</a>
            </li>
            <li onClick={() => navigate("/mostviews")}>
              <a href="#" className={navLinkClass("/mostviews")}>Most Viewed</a>
            </li>
            <li onClick={() => navigate("/new")}>
              <a href="#" className={navLinkClass("/new")}>New to Old</a>
            </li>
            <li onClick={() => navigate("/leaderboard")}>
              <a href="#" className={navLinkClass("/leaderboard")}>Leaderboard</a>
            </li>
            <li onClick={() => navigate("/contact")}>
              <a href="#" className={navLinkClass("/contact")}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
