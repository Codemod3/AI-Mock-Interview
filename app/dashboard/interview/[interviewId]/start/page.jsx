"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  console.log("Params received in StartInterview:", params);

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
    <div className="px-4 md:px-10">
      <h2 className="text-3xl font-bold my-4 md:my-10 text-center">
        Interview Start
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
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
      <div className="flex justify-end gap-4 md:gap-6 mt-4">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData.mockID}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
