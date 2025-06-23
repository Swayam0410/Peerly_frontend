import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { toast } from "react-hot-toast";
import { marked } from "marked";


const EditForm = () => {
    const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

      const [formData, setFormData] = useState({
    name: "",
    college_id: "",
    subject: "",
    sem: "",
    topic: "",
    description: "",
    email: "",
    upvotes:[]
  });
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/edit/${id}`);
        if (!res.ok) throw new Error("Session not found");
        const data = await res.json();
        console.log(data);
        setFormData(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchSession();
  }, [id]);
  const analyzeContent = async (text) => {
  setLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();
    console.log("Suggestions:", data.suggestion);
    setAiSuggestion(data.suggestion);
  } catch (error) {
    console.error("Error analyzing content:", error);
  } finally {
    setLoading(false);
  }
};

function formatSuggestion(text) {
  return marked.parse(text);
}


const handleAnalyze = async () => {

  toast.loading("Analyzing content...");

  try {
    await analyzeContent(formData.description);
    toast.dismiss(); // Remove loading toast
    toast.success("AI suggestions generated!");
  } catch (err) {
    toast.dismiss();
    toast.error("Failed to analyze content.",err);
  }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update session");

      console.log("Session updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error updating session", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          ✏️ Edit Your Session
        </h2>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 text-black"
          />
          
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">College ID</label>
          <input
            type="text"
            name="college_id"
            value={formData.college_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm  text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm  text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Semester</label>
          <input
            type="number"
            name="sem"
            value={formData.sem}
            min={1}
            max={8}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm  text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm  text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

    

        <div>
  <label className="block font-semibold text-gray-700">Your Content</label>
<div className="rounded-xl overflow-hidden shadow-md">
  <ReactQuill
    value={formData.description}
    onChange={(value) =>
      setFormData((prev) => ({ ...prev, description: value }))
    }
    placeholder="Explain your topic here"
    theme="snow"
    className="text-black rounded-xl bg-white shadow-md"
   style={{ maxHeight: "auto" }} // Let it grow
    
  />
  </div>

  <style>
    {`
      .ql-editor {
        font-size: 1.2rem;
        max-height: 400px;
        padding: 1rem;
      }
    `}
  </style>
</div>

<button
  type="button"
  onClick={handleAnalyze}
  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
>
  Analyze with AI 🤖
</button>

{loading && (
  <div className="text-blue-700 font-medium mt-2 animate-pulse">
    🤖 Generating suggestions...
  </div>
)}

{aiSuggestion && (
  <div className="bg-gray-100 border border-blue-300 rounded-md p-4 mt-4">
    <h3 className="text-lg font-semibold text-blue-800 mb-2">
      💡 AI Suggestions:
    </h3>
<div
  className="text-gray-800 prose max-w-none"
  dangerouslySetInnerHTML={{ __html: formatSuggestion(aiSuggestion) }}
></div>

  </div>
)}


        

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700  text-black text-white font-semibold rounded-lg shadow-md transition"
          >
            ✅ Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
