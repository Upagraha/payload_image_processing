import cv2
import base64
def image_encoder(image):
    _, img_encoded = cv2.imencode('.jpg', image)
    img_bytes = img_encoded.tobytes()

    # Encode bytes to base64
    img_base64 = base64.b64encode(img_bytes).decode('utf-8')
    return img_base64
