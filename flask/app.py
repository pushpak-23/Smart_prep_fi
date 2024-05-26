import os
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS # Import CORS class
import numpy as np
import cv2
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Read the CSV file
current_dir = os.path.dirname(__file__)

# Relative path to the CSV file
csv_file_path = os.path.join(current_dir, 'placement_data_multiple_companies.csv')
df = pd.read_csv(csv_file_path)
# Separate features (X) and target variable (y)
X = df.drop('Overall_Placement_Prob', axis=1)
y = df['Overall_Placement_Prob']

# Scale the input data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train a Random Forest Regression model
model = RandomForestRegressor(n_estimators=100)
model.fit(X_scaled, y)

def calculate_average_confidence():
    try:
        data = request.json
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

        return jsonify({'average_confidence': average_confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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

        confidenceData = calculate_average_confidence(data)

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
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'hello'})


if __name__ == '__main__':
    app.run(debug=True)
