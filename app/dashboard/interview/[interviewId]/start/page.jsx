"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";

function StartInterview() {
  const params = useParams(); // ✅ No need to await, it is already available
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

  console.log("Params received in StartInterview:", params); // 🔍 Debugging

  useEffect(() => {
    if (params?.interviewId) {
      console.log("Fetching interview details for ID:", params.interviewId);
      GetInterviewDetails(params.interviewId);
    } else {
      console.warn("No interviewId in params");
    }
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    console.log("Getting interview details...");
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockID, interviewId));

    console.log("Fetched Interview Data:", result);

    if (result.length > 0) {
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log("Questions fetched:", jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } else {
      console.warn("No interview found for ID:", interviewId);
    }
  };

  return (
    
    <div >
      <h2 className="text-lg font-bold">Interview Start</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <QuestionsSection 
      mockInterviewQuestion={mockInterviewQuestion} 
      activeQuestionIndex={activeQuestionIndex}
      />

      <RecordAnswerSection
      mockInterviewQuestion={mockInterviewQuestion} 
      activeQuestionIndex={activeQuestionIndex}
      interviewData={interviewData}
      
      />
      
      </div>
      <div className='flex justify-end gap-6 pt-0'>
        {activeQuestionIndex>0&&
        <Button onClick={()=> setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
        Next Question
      </Button>
      }

          {activeQuestionIndex==mockInterviewQuestion?.length-1&&
          <Button>End Interview</Button>}
        
      </div>
      
    </div>
  );
}

export default StartInterview;
