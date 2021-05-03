import React from "react";

interface Props {
  rating: number;
}

function rating({ rating }: Props) {
  rating=rating*15
  return (
    <div className="stars-background">
      <div className="fa-inner" style={{width:`${rating}px`}}></div>
    </div>
  );
}

export default rating;
