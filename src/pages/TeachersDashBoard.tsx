import React, { useRef, useState, useSyncExternalStore } from 'react';
import { api } from "@/utils/api";
const TeachersDashBoard = () => {

  const [isLoadingUpload, setIsLoadingUpload] = useState<any>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [thumbNail, setThumbNail] = useState<any>(null);


  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPdf = event.target.files?.[0];
    if (selectedPdf) {
      setPdf(selectedPdf);
    }
  };

  const handleThmbNailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedThumnnail = event.target.files?.[0];
    if (selectedThumnnail) {
      setThumbNail(selectedThumnnail);
    }
  }


  const uploadUrl = api.post.upload.useMutation();


  const uploadPdf = (file: any) => {
    if (!file || isLoadingUpload) return;
    if (file.size >= 5 * 1024 * 1024) {
      return
    }
  }

  async function uploadFilesToS3(preSignedUrl: any, file: any, contentType: string) {

    try {
      const res = await fetch(preSignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': contentType
        }
      });
      
      const responseBody = await res.text(); 
      console.log('Response body:', responseBody);
      console.log('File uploaded successfully!', res.status);
      return res
    } catch (error) {
      console.error('File upload failed:');

    }

  }


  const handleClick = async () => {

    if (thumbNail) {

      const { pdfUrl, thumbNailUrl } = await uploadUrl.mutateAsync({
        title: "new pdf",
        description: "newly launched",
        filename: "new file",
        pdfFile: pdf,
        thumbnail: thumbNail
      });


     
      await uploadFilesToS3(pdfUrl, pdf, "application/pdf");
      await uploadFilesToS3(thumbNailUrl, thumbNail, "image/jpeg");


      setPdf(null);
      setThumbNail(null);

      console.log({ pdfUrl, thumbNailUrl })

    } else {
      console.log('Please select both PDF and thubmnail to upload')
    }

  };





  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="text-4xl font-bold mb-8">TEACHERS DASHBOARD</div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">CREATE NEW </p>

        <div className="flex flex-col  items-center justify-center space-x-4">
          UPLOAD PDF
          <input
            type="file"
            onChange={handlePdfChange}
            className="border border-gray-600 mb-10 py-2 px-4 rounded-lg flex-grow"
          />
          UPLOAD THUMBNAIL
          <input
            type="file"
            onChange={handleThmbNailChange}
            className="border border-gray-600 py-2 px-4 rounded-lg flex-grow"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-5"
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