import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const IndividualPerformance = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [viewUpvotedOnly, setViewUpvotedOnly] = useState(false);

const fetchData = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/performance/${email}`);
    
    if (!res.ok) {
      // If the user doesn't exist, treat it as empty data
      setPosts([]);
      return;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid JSON response from backend");
    }

    const data = await res.json();

    // If backend returns null or undefined, fallback to empty array
    setPosts(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching performance data:", err);
    setPosts([]); // Prevent app crash and allow rendering with zeros
  }
};


  useEffect(() => {
    fetchData();
  }, [email]);

  const totalUploads = posts.length;
  const totalUpvotes = posts.reduce((acc, post) => acc + (post.upvotes?.length || 0), 0);
  const totalComments = posts.reduce((acc, post) => acc + (post.comments?.length || 0), 0);

  const filteredPosts = viewUpvotedOnly
    ? posts.filter((post) => (post.upvotes?.length || 0) > 0)
    : posts;

  const handleLeaderboardClick = () => {
    const collegeId = posts[0]?.college_id;
    if (collegeId) {
      navigate(`/leaderboard?college=${collegeId}`);
    } else {
      alert("College ID not found");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 md:px-20 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Your Dashboard</h2>

        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-100 text-blue-800 rounded-xl py-6">
            <p className="text-4xl font-bold">{totalUploads}</p>
            <p className="mt-1 text-lg">Total Uploads</p>
          </div>
          <div
            onClick={() => setViewUpvotedOnly(!viewUpvotedOnly)}
            className="bg-green-100 text-green-800 rounded-xl py-6 cursor-pointer hover:bg-green-200"
          >
            <p className="text-4xl font-bold">{totalUpvotes}</p>
            <p className="mt-1 text-lg">Total Upvotes</p>
            <small className="text-xs">
              {viewUpvotedOnly ? "Viewing only upvoted" : "Click to view only upvoted"}
            </small>
          </div>
          <div className="bg-purple-100 text-purple-800 rounded-xl py-6">
            <p className="text-4xl font-bold">{totalComments}</p>
            <p className="mt-1 text-lg">Total Comments</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Your Posts</h3>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500 text-center">No {viewUpvotedOnly ? "upvoted" : ""} posts found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredPosts.map((post) => (
                <li
                  key={post._id}
                  className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50"
                >
                  <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
                    onClick={() =>
                      navigate(`/article/${post._id}`, {
                        state: { post },
                      })
                    }
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{post.topic}</p>
                      <p className="text-sm text-gray-500">
                        Subject: {post.subject} | Semester: {post.sem}
                      </p>
                      <p className="text-xs text-gray-400">
                        Posted on: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        💬 Comments: {post.comments?.length || 0}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Views:{post.viewed?.length || 0}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm text-gray-600">
                        👍 Upvotes: {post.upvotes?.length || 0}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-6 text-center">
          <button
            onClick={handleLeaderboardClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
          >
            Proceed to College Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualPerformance;
