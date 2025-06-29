import React from "react";
import "./ShimmerWrapper.css";

const ShimmerWrapper = ({ children, isLoading }) => {
  return (
    <div className={`${isLoading ? "shimmer-wrapper loading" : ""} h-1/2`}>
      {children}
      {isLoading && <div className="shine" />}
    </div>
  );
};

export default ShimmerWrapper;
