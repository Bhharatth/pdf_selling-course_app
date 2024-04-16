import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { api } from "@/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()

  const {data: sessionData} = useSession();
  useEffect(()=> {
    if(! sessionData){
      router.push("/Login")
    }

  },[]);

  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
     
      <div className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center mt-10" onClick={()=> router.push("/TeachersDashBoard")}>GO TO PDF UPLOAD PAGE <span><FaArrowRight/></span></button>
      <h1 className="text-l font-extrabold tracking-tight text-white sm:text-[2rem]">
            <span className="text-[hsl(2,100%,70%)]">WELCOME TO </span>PDF COURSE {sessionData?.user.name}
          </h1>
        <div className="flex text-black justify-center bg-white rounded-full w-1/6 lg:max-w-15 h-15 cursor-pointer" onClick={sessionData ? () => void signOut() : () => void signIn("google")}>logout</div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            PDF <span className="text-[hsl(280,100%,70%)]">APP</span> COURSE
          </h1>
         
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center" onClick={()=> router.push("/Student")}>GO TO PDF DOWNLOAD PAGE <span><FaArrowRight/></span></button>
            </p>
          </div>
        </div>
      </div>



       
    </>
  );
}

