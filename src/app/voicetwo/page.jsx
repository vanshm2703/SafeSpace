// components/GroqChat.jsx
'use client';
import { useState, useRef, useEffect } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const GroqChat = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatBoxRef = useRef(null);

  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const [log, setLog] = useState(true);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function buttonHandle(){
    router.push('/login');
  }


  useEffect(() => {
    const storedUser = localStorage.getItem('loggin');
    setLog(storedUser ? true : false);
  }, []);

  const handleProfileClick = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleLogout = async (e) => {
    try {
      await axios.get('/api/users/logout');
      localStorage.removeItem('loggin');
      setLog(false);
      setShowLogoutMenu(false);
      router.push("/login");
    } catch (error) {
      console.log("Logout Error: ", error.message);
      toast.error("Logout Error");
    }
  };

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

  return (<>
  
  <nav className="flex justify-between items-center p-6  bg-black text-white">
          <a href={'/home'} className="text-xl font-bold">SafeSpace</a>
            <ul className="flex space-x-6">
            <li><a href="/aiTry" className="hover:text-gray-400">Law</a></li>
              <li><a href="/policyMail" className="hover:text-gray-400">Policy</a></li>
              <li><a href="/Location" className="bg-red-500 p-2 border rounded-md hover:text-red-900">SOS</a></li>
            </ul>
            <div className="flex items-center">
              {log ? (
                <>
                  <span className="mr-4">Welcome</span>
                  <div style={{ cursor: "pointer" }} onClick={handleProfileClick} className='bg-gray-700 flex justify-center items-center rounded-full h-12 w-12'>
                    <AccountCircleOutlinedIcon className="scale-150" />
                  </div>
                  {showLogoutMenu && (
                    <div className="absolute bg-black border overflow-hidden border-gray-300 rounded-md mt-2">
                      <button onClick={handleLogout} className="px-3 py-2 text-white hover:bg-gray-800">
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* <button */}
                    {/* onClick={() => setIsSheetOpen(true)}
                    className="px-4 py-2 bg-white text-black rounded-md" */}
                  {/* > */}
                    <button>Start</button>
                    
                  {/* </button> */}
                </>
              )}
            </div>
          </nav>
          
          
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
    </>
  );
};

export default GroqChat;
