// // pages/index.js
// 'use client'
// import { useState } from 'react';
// import TextInput from '../components/VoiceFeature/TextInput';
// import VoiceInput from '../components/VoiceFeature/VoiceInput';
// import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
// // import { analyzeSentiment } from '../lib/sentimentAnalysis';
// // import { isPanicDetected } from '../utils/panicDetection';

// const Home = () => {
//   const [input, setInput] = useState('');

//   const handleTextInput = async (text) => {
//     setInput(text);
//     const sentiment = await analyzeSentiment(text);
//     if (isPanicDetected(sentiment.score)) {
//       await fetch('/api/makeCall', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ to: 'emergency_contact_number' }),
//       });
//     }
//   };

//   const handleAudioInput = async (audioBlob) => {
//     // Process audio to text, analyze sentiment, and detect panic
//     // Convert audioBlob to text using a service like Google Speech API
//   };

//   return (
//     <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
//   {/* Blurred Colored Shapes */}
//   <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 opacity-40 rounded-full filter blur-3xl"></div>
//     <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-2xl"></div>
//     <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 opacity-40 rounded-full filter blur-3xl"></div>
//     <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-300 opacity-50 rounded-full filter blur-2xl"></div>
//   </div>

//   {/* Main Content */}
//   <div className="relative z-10 text-center text-white space-y-6 p-6">
//     <h1 className="text-4xl font-bold">Emotion Tracker</h1>

//     <TextInput
//       onInput={handleTextInput}
//       className="w-full h-24 p-4 rounded-lg bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//       style={{ backdropFilter: 'blur(10px)' }} // Optional for ensuring blur
//       placeholder="Type your emotion here..."
//     />

//     <VoiceInput
//       onAudioInput={handleAudioInput}
//       className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
//     //   label={isRecording ? 'Stop Recording' : 'Start Recording'}
//     >
//         <KeyboardVoiceOutlinedIcon/> Hello
//     </VoiceInput>
//   </div>
// </div>


//   );
// };

// export default Home;
