import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dashboard() {
  return (
    <div className='p-10 flex flex-col items-center text-center'>
      <h2 className='font-bold text-red-500 text-3xl leading-relaxed'>Dashboard</h2>
      <h2 className='text-white-500 text-lg leading-relaxed'>Create your AI Interview</h2>
      
      {/* Wrapper to center AddNewInterview */}
      <div className='flex justify-center items-center mt-8 w-full max-w-2xl'>
        <div className='border border-gray-800 rounded-xl p-6 shadow-lg w-full bg-grey-700'>
          <AddNewInterview />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
