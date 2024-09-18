# Python program to demonstrate erosion and dilation of images.
import cv2
import numpy as np
  
def erosion(img, iterations=1, kernel1=5, kernel2=5):
# Reading the input image
    
# Taking a matrix of size 5 as the kernel
    kernel = np.ones((kernel1, kernel2), np.uint8)
    
# The first parameter is the original image,
# kernel is the matrix with which image is
# convolved and third parameter is the number
# of iterations, which will determine how much
# you want to erode/dilate a given image.
    img_erosion = cv2.erode(img, kernel, iterations=iterations)
    return img_erosion

def dilation(img, iterations=1, kernel1=5, kernel2=5):
# Reading the input image
    
# Taking a matrix of size 5 as the kernel
    kernel = np.ones((kernel1, kernel2), np.uint8)
    
# The first parameter is the original image,
# kernel is the matrix with which image is
# convolved and third parameter is the number
# of iterations, which will determine how much
# you want to erode/dilate a given image.
    img_dilation = cv2.dilate(img, kernel, iterations=iterations)
    return img_dilation
