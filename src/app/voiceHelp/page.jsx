'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';

const AudioRecorder = () => {
    const [status, setStatus] = useState('Not Connected');
    const [transcript, setTranscript] = useState('');
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const socketRef = useRef(null);
    const streamRef = useRef(null);
    const threateningWords = ['help', 'attack', 'threat', 'danger', 'violence'];


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


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                return alert('Browser not supported');
            }

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm',
            });
            mediaRecorderRef.current = mediaRecorder;

            const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
                'token',
                'dab6086ceea614a8f498fdbb0d0e7cf219be9bb7',
            ]);
            socketRef.current = socket;

            socket.onopen = () => {
                setStatus('Connected');
                mediaRecorder.start(1000);
                mediaRecorder.ondataavailable = async (event) => {
                    if (event.data.size > 0 && socket.readyState === 1) {
                        socket.send(event.data);
                    }
                };
            };

            socket.onmessage = (message) => {
                const received = JSON.parse(message.data);
                const transcriptText = received.channel.alternatives[0].transcript;

                if (transcriptText && received.is_final) {
                    setTranscript((prev) => prev + transcriptText + ' ');

                    threateningWords.forEach(word => {
                        if (transcriptText.toLowerCase().includes(word)) {
                            // alert(`Threat detected: "${word}" in your speech!`);
                            router.push('/Location')
                        }
                    });
                }
            };

            socket.onclose = () => {
                console.log('WebSocket closed');
                setStatus('Not Connected');
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                setStatus('Error Connecting');
            };

        } catch (error) {
            console.error('Error accessing audio:', error);
            setStatus('Error accessing microphone');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (socketRef.current) {
            socketRef.current.close();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setStatus('Not Connected');
    };

    const toggleRecording = async () => {
        if (!recording) {
            await startRecording();
        } else {
            stopRecording();
        }
        setRecording(!recording);
    };

    // Cleanup when component unmounts
    useEffect(() => {
        return () => {
            stopRecording();
        };
    }, []);

    return (<>
    
    <nav className="flex justify-between items-center p-6 bg-black text-white">
          <div className="text-xl font-bold">Women Safety</div>
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
  <div className="relative z-10 text-center text-white space-y-8 p-6 max-w-md w-full">
    <p id="status" className="text-lg font-semibold">{status}</p>
    <p id="transcript" className="text-gray-300">{transcript}</p>
    <button
      className="p-4 border border-gray-600 bg-gray-200 hover:bg-gray-300 font-semibold text-black rounded-lg transition duration-300"
      onClick={toggleRecording}
    ><KeyboardVoiceOutlinedIcon/>&nbsp;&nbsp;
      {recording ? 'Stop Recording' : 'Start Recording'}
    </button>
  </div>
</div>


        </>
    );
};

export default AudioRecorder;