import cv2
import numpy as np

def histogram_equalization(img):
# creating a Histograms Equalization
# of a image using cv2.equalizeHist()
    equ = cv2.equalizeHist(img)


# stacking images side-by-side
    res = np.hstack((img, equ))

    return res

