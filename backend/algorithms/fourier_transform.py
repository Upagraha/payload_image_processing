import cv2
import numpy as np
 
def fourier_transform(image_to_be_prcsd):
    image = cv2.imread(image_to_be_prcsd)
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
# Compute the discrete Fourier Transform of the image
    fourier = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
    
# Shift the zero-frequency component to the center of the spectrum
    fourier_shift = np.fft.fftshift(fourier)
    
# calculate the magnitude of the Fourier Transform
    magnitude = 20*np.log(cv2.magnitude(fourier_shift[:,:,0],fourier_shift[:,:,1]))
    
# Scale the magnitude for display
    magnitude = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8UC1)

    return magnitude
    
