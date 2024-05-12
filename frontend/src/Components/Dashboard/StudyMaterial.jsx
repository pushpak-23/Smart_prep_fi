// StudyMaterial.js

import React from "react";
import "./StudyMaterial.css"; // Import CSS file

const StudyMaterial = () => {
  return (
    <div className="study-material-container">
      <div className="section-container">
        <h1 className="title">Study Material</h1>
        <div className="group">
          <h2 className="group-title">Group 1</h2>
          <div className="card-grid">
            <div className="card">
              <h3 className="card-title">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="https://www.oliveboard.in/blog/train-problems/#:~:text=Here%20are%20some%20shortcuts%20that%20can%20be%20useful,the%20sum%20of%20their%20speeds.%20...%20More%20items"
                >
                  Problems on Trains
                </a>
              </h3>
            </div>
            <div className="card">
              <h3 className="card-title">
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href="https://www.geeksforgeeks.org/speed-time-distance-formula-and-aptitude-questions/"
                >
                  Time and Distance
                </a>
              </h3>
            </div>
            <div className="card">
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="https://www.geeksforgeeks.org/profit-and-loss-formula/"
              >
                <h3 className="card-title">Profit and Loss</h3>
              </a>
            </div>
            <div className="card">
              <h3 className="card-title">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="https://www.geeksforgeeks.org/tricks-to-solve-age-based-problems/"
                >
                  Problems on Age
                </a>
              </h3>
            </div>
            <div className="card">
              <h3 className="card-title">
                <a
                  style={{ color: "white", textDecoration: "none" }}
                  href="https://www.geeksforgeeks.org/tricks-to-solve-age-based-problems/"
                >
                  Problems on Age
                </a>
              </h3>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="group">
          <h2 className="group-title">Group 2</h2>
          <div className="card-grid">
            {[...Array(9)].map((_, index) => (
              <div className="card" key={`group2-card${index + 1}`}>
                <h3 className="card-title">Card {index + 1}</h3>
                <p className="card-content">Content for Card {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Add more groups as needed */}
      </div>
    </div>
  );
};

export default StudyMaterial;
