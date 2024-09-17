# Python program to demonstrate erosion and dilation of images.
import cv2
import numpy as np
  
def erosion(image_to_be_prcsd):
# Reading the input image
    img = cv2.imread(image_to_be_prcsd)
    
# Taking a matrix of size 5 as the kernel
    kernel = np.ones((5, 5), np.uint8)
    
# The first parameter is the original image,
# kernel is the matrix with which image is
# convolved and third parameter is the number
# of iterations, which will determine how much
# you want to erode/dilate a given image.
    img_erosion = cv2.erode(img, kernel, iterations=1)
    return img_erosion

def dilation(image_to_be_prcsd):
# Reading the input image
    img = cv2.imread(image_to_be_prcsd)
    
# Taking a matrix of size 5 as the kernel
    kernel = np.ones((5, 5), np.uint8)
    
# The first parameter is the original image,
# kernel is the matrix with which image is
# convolved and third parameter is the number
# of iterations, which will determine how much
# you want to erode/dilate a given image.
    img_dilation = cv2.dilate(img, kernel, iterations=1)
    return img_dilation
