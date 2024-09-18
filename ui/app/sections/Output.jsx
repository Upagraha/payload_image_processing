import { Button } from "@nyxui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nyxui/tabs";
import algorithm from "@/utils/algo_types";
import { useState } from "react";
import { Card, CardTitle } from "@nyxui/card";
import { Image, Alert } from 'antd'
import { Input } from "@nyxui/input";
import { Label } from "@nyxui/label";

export default function Output({ image, backendUrl }) {
  const [outputImageUrl, setOutputImageUrl] = useState();
  const [edgeDetectionParams, setEdgeDetectionParams] = useState({
    threshold1: 100,
    threshold2: 200
  });
  const [erosionParams, setErosionParams] = useState({
    kernel1: 5,
    kernel2: 5
  })
  const [dilationParams, setDilationParams] = useState({
    kernel1: 5,
    kernel2: 5
  })
  const [kMeansClusteringParams, setKMeansClusteringParams] = useState({
    clusters: 3
  })
  const [medianFilteringParams, setMedianFilteringParams] = useState({
    size: 3
  })

  const uploadImage = async (algoType, params = "") => {
    if (!image) return; // Exit if no image selected

    const formData = new FormData();
    formData.append('file', image);

    try {
      await fetch(`${backendUrl}?algoType=${algoType}${params}`, {
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
        <TabsList className="dark justify-center">
          <TabsTrigger value="edge_detection">Edge Detection</TabsTrigger>
          <TabsTrigger value="erosion">Erosion</TabsTrigger>
          <TabsTrigger value="dilation">Dilation</TabsTrigger>
          <TabsTrigger value="fourier_transform">Fourier Transform</TabsTrigger>
          {/* <TabsTrigger value="histogram_equalization">Histogram Equalization</TabsTrigger> */}
          <TabsTrigger value="k_means_clustering">K Means Clustering</TabsTrigger>
          <TabsTrigger value="median_filtering">Median Filtering</TabsTrigger>
        </TabsList>
        <TabsContent value="edge_detection" className="flex flex-col items-center mt-3 gap-3">
          <div>
            <Label>Upper Threshold</Label>
            <Input placeholder="100" onChange={(e) => {
              setEdgeDetectionParams({
                ...edgeDetectionParams,
                threshold1: e.target.value
              })
            }} />
          </div>
          <div>
            <Label>Lower Threshold</Label>
            <Input placeholder="200" onChange={(e) => {
              setEdgeDetectionParams({
                ...edgeDetectionParams,
                threshold2: e.target.value
              })
            }} />
          </div>
          <Button onClick={() => {
            const params = `&threshold1=${edgeDetectionParams.threshold1}&threshold2=${edgeDetectionParams.threshold2}`
            uploadImage(algorithm.EdgeDetection, params)
          }}>Process Image</Button>
        </TabsContent>
        <TabsContent value="erosion" className="flex flex-col items-center gap-4">
          <div>
            <Label>Kernel Size</Label>
            <div className="flex gap-4">
              <Input placeholder="5"
                onChange={(e) => {
                  setErosionParams({
                    ...erosionParams,
                    kernel1: e.target.value
                  })
                }}
              />
              <Input placeholder="5"
                onChange={(e) => {
                  setErosionParams({
                    ...erosionParams,
                    kernel2: e.target.value
                  })
                }}
              />
            </div>
            <p className="text-center mt-2 text-xl">{erosionParams.kernel1} x {erosionParams.kernel2}</p>
          </div>
          <Button onClick={() => {
            const params = `&kernel1=${erosionParams.kernel1}&kernel2=${erosionParams.kernel2}`
            uploadImage(algorithm.Erosion, params)
          }}>Process Image</Button>
        </TabsContent>
        <TabsContent value="dilation" className="flex flex-col items-center">
          <div>
            <Label>Kernel Size</Label>
            <div className="flex gap-4">
              <Input placeholder="5"
                onChange={(e) => {
                  setDilationParams({
                    ...dilationParams,
                    kernel1: e.target.value
                  })
                }}
              />
              <Input placeholder="5"
                onChange={(e) => {
                  setDilationParams({
                    ...dilationParams,
                    kernel2: e.target.value
                  })
                }}
              />
            </div>
            <p className="text-center mt-2 text-xl">{dilationParams.kernel1} x {dilationParams.kernel2}</p>
          </div>
          <Button onClick={() => {
            const params = `&kernel1=${dilationParams.kernel1}&kernel2=${dilationParams.kernel2}`
            uploadImage(algorithm.Dilation, params)
          }}>Process Image</Button>
        </TabsContent>
        <TabsContent value="fourier_transform" className="flex flex-col items-center">
          <Button onClick={() => {
            uploadImage(algorithm.FourierTransform)
          }}>Process Image</Button>
        </TabsContent>
        {/* Not working */}
        {/* <TabsContent value="histogram_equalization" className="relative bottom-4 flex flex-col items-center"> */}
        {/*   <Button onClick={() => { */}
        {/*     uploadImage(algorithm.HistogramEqualization) */}
        {/*   }}>Process Image</Button> */}
        {/* </TabsContent> */}
        <TabsContent value="k_means_clustering" className="relative bottom-10 flex flex-col items-center gap-4">
          <p className="mt-2 border-2 rounded-lg p-3 bg-red-700">Cluster Num Above 4 is not allowed due to heavy computation</p>
          <div>
            <Label>Num of Clusters</Label>
            <Input placeholder="3" onChange={(e) => {
              if (e.target.value > 4) {
                setKMeansClusteringParams({
                  ...kMeansClusteringParams,
                  clusters: 4
                })
              } else {
                setKMeansClusteringParams({
                  ...kMeansClusteringParams,
                  clusters: e.target.value
                })
              }
            }} />
          </div>
          <Button onClick={() => {
            const params = `&clusters=${kMeansClusteringParams.clusters}`
            uploadImage(algorithm.KMeansClustering, params)
          }}>Process Image</Button>
        </TabsContent>
        <TabsContent value="median_filtering" className="flex flex-col items-center relative bottom-10">
          <p className="m-2 border-2 rounded-lg p-3 bg-red-700">Median Filtering is a heavy computation task. Try using smaller values</p>
          <Tabs>
            <TabsList defaultValue="median">
              <TabsTrigger value="median">Median</TabsTrigger>
              <TabsTrigger value="mode">Mode</TabsTrigger>
            </TabsList>
            <TabsContent value="median" className="flex flex-col items-center gap-3">
              <div>
                <Label>Size</Label>
                <Input placeholder="3" onChange={(e) => {
                  setMedianFilteringParams({
                    ...medianFilteringParams,
                    size: e.target.value
                  })
                }} />
              </div>
              <Button onClick={() => {
                const params = `&size=${medianFilteringParams.size}&filterType=median`
                uploadImage(algorithm.MedianFiltering, params)
              }}>Process Image</Button>
            </TabsContent>
            <TabsContent value="mode" className="flex flex-col items-center gap-3">
              <div>
                <Label>Size</Label>
                <Input placeholder="3" onChange={(e) => {
                  setMedianFilteringParams({
                    ...medianFilteringParams,
                    size: e.target.value
                  })
                }} />
              </div>
              <Button onClick={() => {
                const params = `&size=${medianFilteringParams.size}&filterType=mode`
                uploadImage(algorithm.MedianFiltering, params)
              }}>Process Image</Button>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
