from flask import Flask, request, jsonify
import numpy as np
import cv2
import base64
import joblib  # Import joblib for loading models
from flask_cors import CORS  # Import CORS class

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and scaler from the pickle files
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

def calculate_average_confidence(data):
    try:
        images_data = data['images_data']
        confidence_scores = []
        for image_data in images_data:
            # Decode base64 image data
            nparr = np.frombuffer(base64.b64decode(image_data.split(',')[1]), np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Convert frame to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

            # Detect faces
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

            # Print information about detected faces
            print("Number of faces detected:", len(faces))
            for i, (x, y, w, h) in enumerate(faces, 1):
                print(f"Face {i}: x={x}, y={y}, width={w}, height={h}")

                # Calculate confidence score for each detected face
                confidence_score = w * h / (frame.shape[0] * frame.shape[1])
                confidence_scores.append(confidence_score)

        # Calculate average confidence score
        if confidence_scores:
            average_confidence = np.mean(confidence_scores)
        else:
            average_confidence = 0

        return {'average_confidence': average_confidence}
    except Exception as e:
        return {'error': str(e)}

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received JSON data:", data)

        # Extract features directly from the JSON data
        features = data
        print("Extracted features:", features)

        # Convert the feature values to a list
        feature_values = [
            data['Aptitude_Score'],
            data['Logical_Score'],
            data['Technical_Score'],
            data['Aptitude_Time'],
            data['Logical_Time'],
            data['Technical_Time'],
        ]

        # Scale the features
        scaled_features = scaler.transform([feature_values])
        print("Scaled features:", scaled_features)

        # Make prediction
        prediction = model.predict(scaled_features)[0]
        print("Prediction:", prediction)

        # Calculate average confidence
        confidence_result = calculate_average_confidence(data)
        if 'error' in confidence_result:
            return jsonify(confidence_result), 500

        average_confidence = confidence_result['average_confidence']

        return jsonify({'prediction': prediction, 'average_confidence': average_confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'hello'})

if __name__ == '__main__':
    app.run(debug=True)
