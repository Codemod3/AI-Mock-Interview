import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function Dashboard() {
  return (
    <div className='p-10 flex flex-col items-center text-center'>
      <h2 className='font-bold text-3xl leading-relaxed'>Dashboard</h2>
      <h2 className='text-gray-500 text-lg leading-relaxed'>Create your AI Interview</h2>
      
      {/* Wrapper to center AddNewInterview */}
      <div className='flex justify-center items-center mt-8 w-full max-w-2xl'>
        <div className='border border-gray-300 rounded-xl p-6 shadow-lg w-full bg-white'>
          <AddNewInterview />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
