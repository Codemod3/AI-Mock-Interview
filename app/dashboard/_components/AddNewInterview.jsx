  "use client"
  import React, { useState } from 'react'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from '@/components/ui/button'
  import { Textarea } from "@/components/ui/textarea"
  import { Input } from "@/components/ui/input"
  import { chatSession } from '@/utils/geminiAiModel'
  import { LoaderCircle } from 'lucide-react'
  import { MockInterview } from '@/utils/schema'
  import { v4 as uuidv4 } from 'uuid';
  import { db } from '@/utils/db'
  import { useUser } from '@clerk/nextjs'
  import moment from 'moment'
  import { useRouter } from 'next/navigation'

  function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [companyName,setcompanyName]=useState();
    const [jobDesc,setjobDesc]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonREsponse,setJsonResponse]=useState([]);
    const {user}=useUser();
    const router=useRouter();
    const onSubmit=async(e)=>{
      e.preventDefault()
      setLoading(true)
      console.log(jobDesc,jobPosition,companyName)
      const InputPrompt = `
Job Position: ${jobPosition}
Job Requirements: ${jobDesc}
Company Name: ${companyName}

Based on the above information, generate exactly 5 interview questions with their corresponding answers.
Return the output as a JSON array where each element is an object with exactly two fields: "Question" and "Answer".

If you are unable to generate the output due to insufficient or unclear information, return a JSON object with a single field "error" set to "Sorry, I didn't understand".

Do not include any additional text, markdown, or commentary—only the JSON.
`;


        const result = await chatSession.sendMessage(InputPrompt);
        const textResponse =await result.response.text();
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if (MockJsonResp) {
        const resp=await db.insert(MockInterview).values({
          mockID:uuidv4(),
          jsonMockResp:MockJsonResp,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobDesc,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format("YYYY-MM-DD"),
        }).returning({mockID:MockInterview.mockID});
        console.log("Inserted Id", resp);
        if(resp)
        {
          setOpenDailog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockID)
        }
      }
      else{
        console.log("error");
      }


    
      setLoading(false);
    };



    return (
      <div>
  <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
  onClick={()=>setOpenDailog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>

      </div>
  <Dialog open={openDailog}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Give us details about your Job interview</DialogTitle>
        <div>
          <label>Job Role</label>
          <Input placeholder="Ex. Software Engineer"
          onChange={(event)=>setJobPosition(event.target.value)}/>
        </div>
        <div>
          <label>Company Name</label>
          <Input placeholder="Ex. Google"
          onChange={(event)=>setcompanyName(event.target.value)}/>
        </div>
        
        <div>
          <label>Requirement</label>
          <Textarea placeholder="Ex. HTML,CSS"
          onChange={(event)=>setjobDesc(event.target.value)}/>
        </div>
        <DialogDescription>
          <form onSubmit={onSubmit}>
          <div>
            <h2>Add Details about your job position/role, jobdescription</h2>
          </div>
          <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading?
              <>
              <LoaderCircle className='animate-spin'/>Generating Interview
              </>
              :'Start Interview'}

              </Button>
          </div>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>

      </div>
      
      
    )
  }

  export default AddNewInterview
