import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { FaGoogle } from "react-icons/fa";
import { api } from "@/utils/api";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter()

    const { data: sessionData } = useSession();
    useEffect(()=> {
        if(sessionData){
           router.push("/")
        }
    },[sessionData])

 

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        {sessionData?.user.email}
        <div className='mt-8'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center'  onClick={sessionData ? () => void signOut() : () => void signIn("google")}>
            <FaGoogle className='mr-2'  />
            Sign in with Google
          </button>
        </div>
      
      </div>
    </div>
  )
}

export default Login