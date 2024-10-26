// components/TextInput.js
import { useState } from 'react';

const TextInput = ({ onInput }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    onInput(e.target.value);
  };

  return (
    <textarea
    value={text}
    onChange={handleChange}
    placeholder="Type your message here..."
    className="w-full h-24 p-4 rounded-lg bg-gray-800 bg-opacity-70 backdrop-blur-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    style={{ backdropFilter: 'blur(10px)' }} // Optional for ensuring blur
  />
  

  );
};

export default TextInput;
