import React from "react";
import "../StarryBackground.scss";

class StarryBackground extends React.Component {
  renderStars() {
    const starCount = 50; // Adjust the number of stars as needed
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push(<div className="star" key={i}></div>);
    }

    return stars;
  }

  render() {
    return <div className="stars">{this.renderStars()}</div>;
  }
}

export default StarryBackground;