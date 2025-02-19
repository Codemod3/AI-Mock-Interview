import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

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
        voices.find(
          (voice) =>
            voice.lang.includes("en-GB") && voice.name.toLowerCase().includes("male")
        ) ||
        voices[0]; // Fallback to first available voice

      if (maleUKVoice) {
        speech.voice = maleUKVoice;
      }

      speech.rate = 1; // Normal speed
      speech.pitch = 1; // Base pitch

      // Update state when speech starts and ends
      speech.onstart = () => {
        setIsSpeaking(true);
      };
      speech.onend = () => {
        setIsSpeaking(false);
      };
      speech.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(speech);
    } else {
      alert("Browser does not support text-to-speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        {/* Questions Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center m-2 cursor-pointer ${
                activeQuestionIndex === index && "bg-blue-600 text-white"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>

        {/* Current Question */}
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>

        {/* Responsive Video Container */}
        <div className="relative mb-5 mx-auto w-full max-w-[500px] aspect-[5/3]">
          <video
            key={isSpeaking ? "talking" : "idle"}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-lg"
          >
            <source
              // When speaking, play talking.mp4; otherwise, play listning.mp4
              src={isSpeaking ? "/talking.mp4" : "/listning.mp4"}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Speaker Icon to read the question aloud */}
        <button
          onClick={() =>
            textToSpeech(
              mockInterviewQuestion[activeQuestionIndex]?.Question
            )
          }
        >
          <Volume2 className="cursor-pointer text-white-700 hover:text-red-500 transition" />
        </button>
      </div>
    )
  );
}

export default QuestionsSection;
