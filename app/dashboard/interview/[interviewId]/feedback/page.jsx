"use client";
import { db } from "@/utils/db";
import { UserAnsere } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


function Feedback() {
  const params = useParams();
  const router = useRouter();
  const [interviewId, setInterviewId] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null); // ✅ Store the overall rating

  useEffect(() => {
    if (params?.interviewId) {
      setInterviewId(params.interviewId);
      GetFeedback(params.interviewId);
    }
  }, [params]);

  const GetFeedback = async (id) => {
    try {
      console.log("Fetching feedback for Interview ID:", id);

      const result = await db
        .select()
        .from(UserAnsere)
        .where(eq(UserAnsere.mockIDRef, id)) // Keep `id` as string if stored as string
        .orderBy(UserAnsere.id);

      console.log("Feedback Result:", result);
      setFeedbackList(result);
      
      // ✅ Calculate the overall rating
      calculateOverallRating(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const calculateOverallRating = (feedback) => {
    if (!feedback.length) return;

    const totalScore = feedback.reduce((sum, item) => {
      return sum + (parseFloat(item.rating) || 0); // Ensure rating is a number
    }, 0);

    const averageRating = totalScore / feedback.length;
    setOverallRating(averageRating.toFixed(1)); // ✅ Round to 1 decimal place
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">
        Here are the results for your interview
      </h2>
      
      {/* ✅ Display the accurate overall rating */}
      <h2 className="text-primary text-lg my-3">
        Your overall interview result is <strong>{overallRating || "N/A"}/10</strong>
      </h2>

      {/* ✅ Check if feedbackList is not empty */}
      {feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="my-4 bg-border p-4 rounded-lg">
            <CollapsibleTrigger className="p-2 flex rounded-lg my-2 text-left gap-10 w-full justify-between">
              Question: {item.question}
              <ChevronsUpDownIcon className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent >
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500">No feedback available yet.</p>
      )}
      
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
