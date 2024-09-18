"use client"
import Header from '@/sections/Header'
import ImageInput from '@/sections/ImageInput'
import { useEffect, useState } from 'react';
import { Toaster } from '@nyxui/toaster';
import { useToast } from '@nyxui/use-toast';

export default function Home() {
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000");
  const { toast } = useToast()

  useEffect(() => {
    if (process.env.NODE_ENV == 'development') {
      setBackendUrl("http://localhost:5000")
      toast({
        title: "  Development Mode",
        description: "Local Python Server at port 5000 will be used"
      })
    }
    if (process.env.NODE_ENV == "production") {
      setBackendUrl("https://payload-image-processing-d3eq.onrender.com")
      toast({
        title: "  Production Mode",
        description: "Remote Python Server will be used."
      })
    }
  }, [])

  return (
    <>
      <div className='flex flex-col gap-8 mt-14 items-center dark mb-80'>
        <Header />
        <ImageInput backendUrl={backendUrl} />
      </div>
      <Toaster />
    </>
  )
}
