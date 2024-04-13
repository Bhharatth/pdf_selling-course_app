import React from 'react'

const TeachersDashBoard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="text-4xl font-bold mb-8">TEACHERS DASHBOARD</div>
  
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg mb-4">INSERT PDF</p>
  
      <div className="flex items-center justify-center space-x-4">
        <input
          type="file"
          className="border border-gray-600 py-2 px-4 rounded-lg flex-grow"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
          UPLOAD
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default TeachersDashBoard