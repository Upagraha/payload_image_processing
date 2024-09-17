"use client"
import Header from '@/sections/Header'
import ImageInput from '@/sections/ImageInput'
import { useState } from 'react';

export default function Home() {
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000");
  return (
    <div className='flex flex-col gap-8 mt-14 items-center'>
      <Header />
      <ImageInput backendUrl={backendUrl} />
    </div>
  )
}
