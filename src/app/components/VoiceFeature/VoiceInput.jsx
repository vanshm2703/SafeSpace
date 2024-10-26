// components/VoiceInput.js
import { useEffect, useState } from 'react';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { toast } from 'react-hot-toast';

export default function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        setAudioChunks(current => [...current, event.data]);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Error accessing microphone');
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Process the recorded audio
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        const response = await fetch('/api/voice', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (result.isEmergency) {
          toast.success('Emergency detected! Sending alert...');
          // Call your emergency API
          await fetch('/api/emergency', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: "Emergency Help Required!",
              location: "User's location" // You can add location detection here
            })
          });
        }

      } catch (error) {
        console.error('Error processing voice:', error);
        toast.error('Error processing voice');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  return (
    <div>
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center"
      >
        <KeyboardVoiceOutlinedIcon />
        <span className="ml-2">
          {isRecording ? 'Recording...' : 'Hold to Talk'}
        </span>
      </button>
    </div>
  );
}