import os
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS # Import CORS class

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
        feature_values = [features[key] for key in features]
        print("Feature values:", feature_values)

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
