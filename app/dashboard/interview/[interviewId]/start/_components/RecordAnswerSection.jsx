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

  const UpdateUserAnswer=async()=>{
    console.log(userAnswer)
      
    setLoading(true)
    const feedbackPrompt="Question"+mockInterviewQuestion[activeQuestionIndex]?.Question+
        ",user answer:"+userAnswer+"Depends on question and user answer for given interview questions"+
        "please give us rating for answer and feedback as area of improvement as any"+
        "in just 3 to 5 lines to improve it in JSON format with rating with field and feebback feed";
  
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(mockJsonResp)
  
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
  
        const resp=await db.insert(UserAnsere)
        .values({
          mockIDRef:interviewData?.mockID,
          question:mockInterviewQuestion[activeQuestionIndex]?.Question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          created:moment().format('DD-MM-yyyy')
  
        })
        if(resp)
        {
          toast('User Answerrecorder successfully')
        }
        setUserAnswer('');
        setLoading(false);

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
