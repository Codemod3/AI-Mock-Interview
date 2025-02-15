import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [voices, setVoices] = useState([]);

  // Fetch available voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);

      // Select a male UK voice (preferably Google UK English Male)
      const maleUKVoice =
        voices.find((voice) => voice.name === "Google UK English Male") ||
        voices.find((voice) => voice.lang.includes("en-GB") && voice.name.includes("Male")) ||
        voices[0]; // Fallback to first available voice

      if (maleUKVoice) {
        speech.voice = maleUKVoice;
      }

      speech.rate = 1; // Normal speed
      speech.pitch = 1; // Base pitch

      window.speechSynthesis.speak(speech);
    } else {
      alert("Browser does not support text-to-speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center m-2 cursor-pointer
              ${activeQuestionIndex === index && "bg-blue-500 text-white"}`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>

        {/* Speaker Icon to Read the Question Aloud */}
        <button onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}>
          <Volume2 className="cursor-pointer text-gray-700 hover:text-black transition" />
        </button>

        <div className="border rounded-lg p-5 bg-blue-100 mt-10">
          <h2 className="flex gap-2 items-center text-blue-700">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
