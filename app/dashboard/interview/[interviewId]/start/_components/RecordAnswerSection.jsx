"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/geminiAiModel'
import { db } from '@/utils/db'
import { UserAnsere } from '@/utils/schema'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer]=useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
      results.map((result)=>(
        setUserAnswer(prevAns=>prevAns+result?.transcript)
      ))
  },[results])

  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10)
    {
      UpdateUserAnswer();
    }
  },[userAnswer])

  const StartStopREcording=async()=>{
    if(isRecording)
    {
      stopSpeechToText()
      if(userAnswer?.length<10)
        {
          setLoading(false);
          toast('Error wjilr saving your answer, Please record again')
          return;
        }
    }
    else{
      startSpeechToText();

    }
      
    
  }

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
  
    setLoading(true);
  
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.Question}, 
    User Answer: ${userAnswer}. 
    Please provide a rating and feedback (in 3-5 lines) in JSON format like this: 
    {"rating": 7, "feedback": "Your answer is good, but you can improve by adding more details."}`;
  
    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let mockJsonResp = await result.response.text(); // Ensure text is awaited
  
      console.log("Raw Response:", mockJsonResp);
  
      // ✅ Fix: Clean JSON response
      mockJsonResp = mockJsonResp.replace(/```json|```/g, "").trim(); 
  
      // ✅ Fix: Validate JSON before parsing
      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(mockJsonResp);
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError, "Response:", mockJsonResp);
        toast("Error processing feedback. Please try again.");
        setLoading(false);
        return;
      }
  
      console.log("Parsed JSON:", JsonFeedbackResp);
  
      // ✅ Database Insert
      const resp = await db.insert(UserAnsere).values({
        mockIDRef: interviewData?.mockID,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback || "No feedback provided",
        rating: JsonFeedbackResp?.rating || 0,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        created: moment().format("DD-MM-yyyy"),
      });
  
      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error in UpdateUserAnswer:", error);
      toast("An error occurred while saving your answer.");
    } finally {
      setLoading(false);
    }
  

  }
  return (
    <div className='flex items-center jsutify-cenetr flex-col'>
       <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
      <Image src={'/webcam.png'} width={200} height={200}
      className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height:300,
        width:'100%',
        zIndex:10,
      }}
      />
    </div>
    <Button variant="outlined" className="my-10 flex gap-2 border border-gray-500" 
    onClick={StartStopREcording}>
    {isRecording?
      <h2 className='text-red-600 flex gap-2'>
        <Mic/>Stop Recording
      </h2>
      :
      'Record Answer'
    }</Button>

  
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
   
  )
}

export default RecordAnswerSection
