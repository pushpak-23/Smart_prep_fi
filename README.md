# Smart Prep - Web Assessment Test Platform (April 2024)
## Overview
-`Made with`
<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-React-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/Tailwind CSS-%231a202c.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge" alt="Express.js">
  <img src="https://img.shields.io/badge/Node.js-%234ea94b.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Python-%2314354C.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python">
</p>
This project consists of a React frontend, an Express backend, and a Flask backend.

## Overview

- `frontend/`: Contains the React frontend.
- `backend/`: Contains the Express backend.
- `flask/`: Contains the Flask backend.

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
    cd ../backend/
    npm install

    # Flask Backend
    cd ../flask/
    pip install -r requirements.txt
    ```

## Running the Application

1. **Start the Frontend**:

    ```bash
    cd frontend/
    npm run dev
    ```

2. **Start the Express Backend**:

    ```bash
    cd ../backend/
    npm start
    ```

3. **Start the Flask Backend**:

    ```bash
    cd ../flask/
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
    cd ../backend/
    npm run lint
    ```

- **Linting (Flask Backend)**:

    ```bash
    cd ../flask/
    # Run linting commands for Python (e.g., pylint, flake8)
    ```

- **Run Tests (Frontend)**:

    ```bash
    cd frontend/
    npm test
    ```

- **Run Tests (Express Backend)**:

    ```bash
    cd ../backend/
    npm test
    ```

- **Run Tests (Flask Backend)**:

    ```bash
    cd ../flask/
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
