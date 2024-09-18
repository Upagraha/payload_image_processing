import cv2
import base64
import io

def image_encoder(image):
    _, img_encoded = cv2.imencode('.jpg', image)
    img_bytes = img_encoded.tobytes()

    # Encode bytes to base64
    img_base64 = base64.b64encode(img_bytes).decode('utf-8')
    return img_base64

def image_encoder_pillow(image, format='JPEG'):
    # Create an in-memory byte stream
    buffered = io.BytesIO()

    # Save the Pillow image to the byte stream in the specified format (JPEG in this case)
    image.save(buffered, format=format)

    # Get the byte data
    img_bytes = buffered.getvalue()

    # Encode the bytes to base64
    img_base64 = base64.b64encode(img_bytes).decode('utf-8')

    return img_base64
