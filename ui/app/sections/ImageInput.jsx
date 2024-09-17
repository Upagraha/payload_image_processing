"use client"
import { Button } from '@nyxui/button'
import { Card, CardContent, CardTitle } from '@nyxui/card'
import { Input } from '@nyxui/input'
import { Label } from '@nyxui/label'
import { useEffect, useState } from 'react'
import { Image } from 'antd'

export default function ImageInput({ backendUrl }) {

  const algorithm = {
    "EdgeDetection": "edge_detection",
    "Erosion": "erosion",
    "Dilation": "dialation",
    "FourierTransform": "fourier_transform",
    "GaussianFilter": "gaussian_filter",
    "HistogramEqualization": "histogram_equalization",
    "KMeansClustering": "k_means_clustering",
    "MedianFiltering": "median_filtering",
    "WaveletTransformFilter": "wavelet_transform_filter"
  }

  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [outputImageUrl, setOutputImageUrl] = useState();
  const [algoType, setAlgoType] = useState(algorithm.EdgeDetection);

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
          <Button
            onClick={async () => {
              if (!image) return; // Exit if no image selected

              const formData = new FormData();
              formData.append('file', image);

              try {
                await fetch(`${backendUrl}?algoType=${algoType}`, {
                  method: 'POST',
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.image) {
                      setOutputImageUrl(
                        `data:image/jpg;base64,${data.image}`
                      )
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })

              } catch (error) {
                console.error('Error:', error);
              }
            }}
          >Process Image</Button>
        </CardContent>
      </Card>
      {outputImageUrl &&
        <Card className="dark flex flex-col items-center p-4 gap-8">
          <CardTitle className="mt-2">Output</CardTitle>
          <Image
            src={outputImageUrl}
            width={500}
          />
        </Card>

      }
    </div>
  )
}
