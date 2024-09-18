from PIL import Image, ImageFilter

def median_filter(image, size=3):
    prcsd_image = image.filter(ImageFilter.MedianFilter(size=size))
    return prcsd_image


def mode_filter(image, size=3):
    prcsd_image = image.filter(ImageFilter.ModeFilter(size=size))
    return prcsd_image


