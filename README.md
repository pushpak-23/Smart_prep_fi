# Project Name

This project consists of a React frontend, an Express backend, and a Flask backend.

## Overview

- `frontend/`: Contains the React frontend.
- `express-backend/`: Contains the Express backend.
- `flask-backend/`: Contains the Flask backend.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/pushpak-23/Smart_prep_fi.git
    ```

2. Install dependencies for each component:

    ```bash
    # Frontend
    cd frontend/
    npm install

    # Express Backend
    cd ../express-backend/
    npm install

    # Flask Backend
    cd ../flask-backend/
    pip install -r requirements.txt
    ```

## Running the Application

1. **Start the Frontend**:

    ```bash
    cd frontend/
    npm start
    ```

2. **Start the Express Backend**:

    ```bash
    cd ../express-backend/
    npm start
    ```

3. **Start the Flask Backend**:

    ```bash
    cd ../flask-backend/
    python app.py
    ```

## Usage

- Access the React frontend at: `http://localhost:3000`
- Access the Express backend at: `http://localhost:3001`
- Access the Flask backend at: `http://localhost:5000`

## Additional Commands

- **Linting (Frontend)**:

    ```bash
    cd frontend/
    npm run lint
    ```

- **Linting (Express Backend)**:

    ```bash
    cd ../express-backend/
    npm run lint
    ```

- **Linting (Flask Backend)**:

    ```bash
    cd ../flask-backend/
    # Run linting commands for Python (e.g., pylint, flake8)
    ```

- **Run Tests (Frontend)**:

    ```bash
    cd frontend/
    npm test
    ```

- **Run Tests (Express Backend)**:

    ```bash
    cd ../express-backend/
    npm test
    ```

- **Run Tests (Flask Backend)**:

    ```bash
    cd ../flask-backend/
    # Run test commands for Python (e.g., pytest)
    ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/branch-name`).
6. Create a new Pull Request.

## License

[License Name] - Insert license description here.
