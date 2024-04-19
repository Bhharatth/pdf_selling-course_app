import { api } from '@/utils/api'
import { getFetch } from '@trpc/client';
import React, { useEffect, useState } from 'react'

const Student = () => {

    const getAllFiles = api.post.getAllUploadedFiles.useQuery();
    const getAllFilesData = getAllFiles.data;

   

    
    const getPdfDownloadUrl = api.post.getPdfDownloadUrl.useMutation();

 const handleDownloadPdfButton = async (pdfPath: string) => {
    try {
    
      const result = await getPdfDownloadUrl.mutate({pdfKey:pdfPath});
        console.log('thisurl', result)

        
     
      
    } catch (error) {
      console.error('Error fetching PDF download URL:', error);
    }
  };

    
   
    return (
        <div className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="text-4xl font-bold mb-8 text-white">DOWNLOAD PDF'S</div>
            <div>
                <div className="bg-gray-600 p-6 rounded-lg shadow-lg text-center mb-5 text-white">
                    <p className="text-lg mb-4">DOWNLOAD PDF</p>


                    {getAllFilesData?.map((file) => (
            <div key={file.id} className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-24 h-24 border border-gray-300 flex justify-center items-center">
                {file.description}
              </div>
              <p className="border border-gray-100 py-2 px-4 rounded-lg flex-grow text-white">
                {file.title || 'Title not available'}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={()=>handleDownloadPdfButton(file.fileKey)}>
                DOWNLOAD
              </button>
            </div>
          ))}

                </div>
            </div>
        </div>
    )
}

export default Student