import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // NEW

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError(null);

    emailjs
      .sendForm(
        'service_jn832mc',
        'template_8zgfytp',
        formRef.current,
        'S_pETm6q3Dt-65CbO'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
          setError("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#101828] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#1E293B] p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-[#FACC15]">Contact Us</h1>
        <p className="mb-6 text-[#CBD5E1]">We’d love to hear from you! Fill out the form and we’ll get back to you shortly.</p>

        {sent && <p className="text-green-400 mb-4">Message sent successfully!</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="user_name"
              id="name"
              className="w-full px-4 py-2 rounded-xl bg-[#0F172A] text-white border border-[#3ABFF8] focus:outline-none focus:ring-2 focus:ring-[#3ABFF8]"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="user_email"
              id="email"
              className="w-full px-4 py-2 rounded-xl bg-[#0F172A] text-white border border-[#3ABFF8] focus:outline-none focus:ring-2 focus:ring-[#3ABFF8]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-2 rounded-xl bg-[#0F172A] text-white border border-[#3ABFF8] focus:outline-none focus:ring-2 focus:ring-[#3ABFF8]"
              placeholder="Your message"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-[#3ABFF8] hover:bg-[#0ea5e9] text-[#101828] font-semibold py-2 px-6 rounded-xl transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-[#101828]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  />
                </svg>
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
