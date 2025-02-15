"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correctly using next/navigation
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LightbulbIcon, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";

function Interview() {
  const params = useParams(); // ✅ useParams() returns an object, NOT a promise.
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnable, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params?.interviewId) {
      console.log("Interview ID:", params.interviewId);
      GetInterviewDetails(params.interviewId);
    }
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    if (!interviewId) return; // ✅ Prevent fetching if interviewId is undefined
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockID, interviewId));
      console.log("Fetched Interview Data:", result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview:", error);
    }
  };

  return (
    <div className="my-10 flex-col items-center">
      <h2 className="font-bold text-2xl">Welcome to the Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <p><strong>All the Best with the interview</strong></p>
            <p>Remember to breathe, and smile</p>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <LightbulbIcon /><strong>Information</strong>
            </h2>
            <p className="mt-3 text-yellow-700">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE}
            </p>
          </div>
        </div>
        <div>
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: "100%" }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary rounded-lg border" />
              <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                Enable Camera
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Only show the button if params.interviewId exists */}
      {params?.interviewId ? (
        <div className="flex justify-end items-end pt-8">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="bg-red-700">Start Interview</Button>
          </Link>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-5">Error: Interview ID is missing.</p>
      )}
    </div>
  );
}

export default Interview;
