import { Button } from "@nyxui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nyxui/tabs";
import algorithm from "@/utils/algo_types";
import { useState } from "react";
import { Card, CardTitle } from "@nyxui/card";
import { Image } from 'antd'

export default function Output({ image, backendUrl }) {
  const [outputImageUrl, setOutputImageUrl] = useState();

  const uploadImage = async (algoType) => {
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
  }
  return (
    <div className="">      {outputImageUrl &&
      <Card className="dark flex flex-col items-center p-4 gap-8 m-3">
        <CardTitle className="mt-2">Output</CardTitle>
        <Image
          src={outputImageUrl}
          width={500}
        />
      </Card>
    }
      <Tabs defaultValue="edge_detection">
        <TabsList className="dark flex justify-center">
          <TabsTrigger value="edge_detection">Edge Detection</TabsTrigger>
          <TabsTrigger value="erosion">Erosion</TabsTrigger>
          <TabsTrigger value="dilation">Dilation</TabsTrigger>
        </TabsList>
        <TabsContent value="edge_detection" className="tab_content">
          <Button onClick={() => { uploadImage(algorithm.EdgeDetection) }}>Process Image</Button>
        </TabsContent>
        <TabsContent value="erosion">Erosion</TabsContent>
        <TabsContent value="dilation">Dilation</TabsContent>
      </Tabs>
    </div>
  )
}
