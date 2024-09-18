from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
from algorithms.edge_detection import edge_detection
from algorithms.erosion_and_dilation import dilation, erosion
from algorithms.image_encoder import image_encoder
from algorithms.types import algorithms

app = Flask(__name__)
CORS(app)

@app.route("/health", methods=['GET'])
def health_check():
    return jsonify({
        "message": "OK"
    })

@app.route('/', methods=['POST'])
def image_test():
    try: 
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            in_memory_file = file.read()
            nparr = np.frombuffer(in_memory_file, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if img is None:
                return jsonify({'error': 'Unable to decode image'}), 400

            processed_image = None

            print(request.args.get("algoType"))

            match request.args.get("algoType"):
                case algorithms.EdgeDetection:
                    threshold1 = request.args.get("threshold1")
                    threshold2 = request.args.get("threshold2")
                    processed_image = edge_detection(img,int(threshold1), int(threshold2))
                case algorithms.Dilation:
                    kernel1 = request.args.get("kernel1")
                    kernel2 = request.args.get("kernel2")
                    processed_image = dilation(img, int(kernel1), int(kernel2)) 
                case algorithms.Erosion:
                    kernel1 = request.args.get("kernel1")
                    kernel2 = request.args.get("kernel2")
                    processed_image = erosion(img, int(kernel1), int(kernel2)) 
                case _:
                    processed_image = edge_detection(img)

            encoded_image = image_encoder(processed_image)
            return jsonify({'message': 'Image Processed Successfully', 'image': encoded_image}), 200
    except Exception as e:
        return jsonify({"error:" f"{e}"}), 400

    


if __name__ == "__main__":
    app.run(debug=True)
