import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react"; 
import CommentSection from "./Comments";
import { useUser } from "@clerk/clerk-react";


const Article = () => {
  const publishableKey = import.meta.env.VITE_MURF_API_KEY;
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const entry = location.state.entry || location.state.post || {};

  const [comments, setComments] = useState(entry.comments);

  // 🧠 Summarize and then call generateAudio
  const summarizeContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generatesummary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: entry.description,
          topic: entry.topic,
          subject: entry.subject
        }),
      });

      const data = await res.json();
      console.log("Summary:", data.summary);
      await generateAudio(data.summary);
    } catch (error) {
      console.error("Summary Error:", error);
    }
  };

  // 🔊 Call Murf API
  const generateAudio = async (text) => {
    setAudioUrl("");
    try {
      const response = await fetch("https://api.murf.ai/v1/speech/generate", {
        method: "POST",
        headers: {
          "api-key": publishableKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voiceId: "en-US-terrell",
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Murf Error:", errText);
        return;
      }

      const data = await response.json();
      console.log("Audio response:", data);
      setAudioUrl(data.audioFile);
    } catch (error) {
      console.error("Audio generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.user) {
      const email = user.user.emailAddresses[0].emailAddress;
      setLoggedInEmail(email);
    }
  }, [user]);

  if (!entry) {
    return (
      <div className="text-center mt-10 text-red-500">No data found.</div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 md:px-20 bgCol">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{entry.topic}</h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4">
            <p><strong>Contributed by:</strong> {entry.name}</p>
            <p><strong>College ID:</strong> {entry.college_id}</p>
            <p><strong>Subject:</strong> {entry.subject}</p>
          </div>
        </div>

        <div
          className="prose max-w-none text-lg leading-relaxed text-gray-700 mx-auto"
          dangerouslySetInnerHTML={{ __html: entry.description }}
        />

        {entry.email === loggedInEmail && (
          <button
            onClick={() => navigate(`/edit/${entry._id}`)}
            className="text-black border-blur-300 border-4 bg-blue-400"
          >
            Edit Content
          </button>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={summarizeContent}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "🔄 Generating Audio..." : "🔊 Generate an AI summarized Audio"}
          </button>

          {audioUrl && !isLoading && (
            <div className="mt-4">
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}
        </div>
      </div>

      <CommentSection initialComments={comments} sessionemail={entry.email} />
    </div>
  );
};

export default Article;
