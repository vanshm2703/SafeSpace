// pages/api/analyzeAudio.js
import { LlamaAI } from 'your-llama-ai-library'; // Replace with actual Llama AI library
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const analyzeAudio = async (audioBuffer) => {
  // Process the audio buffer with Llama AI
  const result = await LlamaAI.processAudio(audioBuffer);
  return result; // { isDistress: true/false, message: "Help!" }
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the audio file.' });
    }

    const audioFile = files.audio[0]; // Assuming it's saved in files.audio
    const audioBuffer = fs.readFileSync(audioFile.filepath); // Read the audio file

    const analysisResult = await analyzeAudio(audioBuffer);
    res.status(200).json(analysisResult);
  });
}