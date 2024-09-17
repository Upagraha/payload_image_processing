from PIL import Image, ImageFilter

def median_filter(image):
    image = Image.open(image)  
    prcsd_image = image.filter(ImageFilter.MedianFilter(size=3))
    return prcsd_image


def mode_filter(image):
    image = Image.open(r"IMAGE_PATH")  
    prcsd_image = image.filter(ImageFilter.ModeFilter(size=3))
    return prcsd_image


