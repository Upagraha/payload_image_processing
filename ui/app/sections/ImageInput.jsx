"use client"
import { Button } from '@nyxui/button'
import { Card, CardContent, CardTitle } from '@nyxui/card'
import { Input } from '@nyxui/input'
import { Label } from '@nyxui/label'
import { useEffect, useState } from 'react'
import { Image } from 'antd'
import Output from './Output'
import algorithm from "@/utils/algo_types"

export default function ImageInput({ backendUrl }) {


  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  return (
    <div className='flex flex-col gap-4'>
      <Card className="p-4 dark" >
        <CardTitle className="flex flex-col items-center m-3">Input</CardTitle>
        <CardContent className="flex flex-col items-center gap-4">
          <div>
            <Label>Image</Label>
            <Input type="file" className="dark text-black" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);

                const url = URL.createObjectURL(file)
                setImageUrl(url)
              }
            }} />
            {imageUrl &&
              <div className='my-4 flex flex-col gap-3'>
                <Label>Image Preview</Label>
                <Image
                  src={imageUrl}
                  width={500}
                  alt="Preview of the image to process"
                />
              </div>

            }
          </div>
          <Label>Algorithm</Label>
          <Output image={image} backendUrl={backendUrl} />
        </CardContent>

      </Card>
    </div>
  )
}
