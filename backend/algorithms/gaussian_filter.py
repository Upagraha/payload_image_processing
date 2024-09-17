from PIL import Image, ImageFilter

def gaussian_entire_image(image):
    image = Image.open(image)  
    prcsd_image = image.filter(ImageFilter.GaussianBlur)
    return prcsd_image

def gaussian_select_area(image_to_be_prcsd):
    image = Image.open(image_to_be_prcsd) 
    smol_image = image.crop((0, 0, 150, 150))
    blurred_image = smol_image.filter(ImageFilter.GaussianBlur)
    image.paste(blurred_image, (0,0))
    return image
