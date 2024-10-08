import numpy as np
import cv2
 
def k_means_clustering(img, clusters=3):
# Read in the image
    
# Change color to RGB (from BGR)
    image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) 


# Reshaping the image into a 2D array of pixels and (RGB) values
    pixel_vals = image.reshape((-1,3))
    
# Convert to float type
    pixel_vals = np.float32(pixel_vals)


#the below line of code defines the criteria for the algorithm to stop running, which will happen is 100 iterations are run or the epsilon (which is the required accuracy) becomes 85%
    criteria=(cv2.TERM_CRITERIA_EPS+cv2.TERM_CRITERIA_MAX_ITER,100,0.85)
    
#perform k-means clustering with number of clusters defined as 3
#also random centers are initially chosen for k-means clustering
    retval, labels, centers = cv2.kmeans(pixel_vals, clusters, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    
# convert data into 8-bit values
    centers = np.uint8(centers)
    segmented_data = centers[labels.flatten()]
    
# reshape data into the original image dimensions
    segmented_image = segmented_data.reshape((image.shape))
    return segmented_image
