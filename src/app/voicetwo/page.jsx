// components/GroqChat.jsx
'use client';
import { useState, useRef } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

const GroqChat = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatBoxRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('api/users/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResponse(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
      {/* Blurred Colored Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-300 opacity-50 rounded-full filter blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white space-y-8 p-6 max-w-4xl w-full">
        <h1 className="text-4xl font-bold">AI Assistant</h1>
        <p className="text-gray-400 bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg">
          Ask me anything and I'll help you out!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 p-4 rounded-lg bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white"
            style={{ backdropFilter: 'blur(10px)' }}
          />
          <button
            type="submit"
            disabled={loading || !userInput.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Processing...' : 'Send Message'}
          </button>
        </form>

        {error && (
          <div className="bg-red-500 bg-opacity-70 text-white px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {response && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Response</h2>
            <div className="chat-box space-y-4 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg max-h-96 overflow-y-auto" ref={chatBoxRef}>
              <p className="text-left whitespace-pre-wrap">{response}</p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => navigator.clipboard.writeText(response)} 
                  className="text-gray-400 hover:text-white transition"
                  title="Copy to clipboard"
                >
                  <ContentPasteOutlinedIcon />
                </button>
                <hr className="border-gray-700 w-full ml-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroqChat;