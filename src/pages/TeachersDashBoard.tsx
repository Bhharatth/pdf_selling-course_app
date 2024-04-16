// 'use client'
import React, { useRef, useState } from 'react';
import {Outposts, S3} from "aws-sdk";
import { env } from "../env.js";
// import fs from 'fs';
import {  api } from "@/utils/api";
const TeachersDashBoard = () => {

  const [isLoadingUpload, setIsLoadingUpload]= useState<any>(null);


const uploadData = api.post.upload.useMutation({
  onSuccess:(res)=> {
    console.log("doc created successfully", res)
  },
  onError: (error)=> {
            alert(error);
            console.log(error)
        }
})

  const uploadPdf =(file: any)=> {
    if(!file || isLoadingUpload) return;
    if(file.size >= 5*1024 *1024){
      return
    }
  }

  

  const handleClick =async ()=> {

    const res = await uploadData.mutate({
      
    })
   
  }





  





   
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="text-4xl font-bold mb-8">TEACHERS DASHBOARD</div>
  
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg mb-4">INSERT PDF</p>
  
      <div className="flex items-center justify-center space-x-4">
      <input
        type="file"
        // ref={pdfRef}
        className="border border-gray-600 py-2 px-4 rounded-lg flex-grow"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg" 
      onClick={handleClick}
      >
        UPLOAD
      </button>
    </div>
    </div>
  </div>
  
  )
}

export default TeachersDashBoard