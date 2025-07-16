import React from "react";

const Main = () => {
  return (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          className="card-img img-fluid"
          src="./assets/main.png.jpg"
          alt="Main Banner"
          height={500}
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container">
            <h5 className="card-title fs-1 text fw-lighter shimmer-text">
              New Season Arrivals
            </h5>
            <p className="card-text fs-5 d-none d-sm-block">
              Discover the latest trends and update your wardrobe with fresh styles.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
