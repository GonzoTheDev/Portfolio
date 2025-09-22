import React from "react";
import "./Footer.css";
import { gsap } from "gsap";
import { greeting } from "../../portfolio.js";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  React.useEffect(() => {
    gsap.from(".footer-div", {
      opacity: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="footer-div">
      <p className="footer-text" style={{ color: props.theme.secondaryText }}>
        Made with <span role="img">❤️</span> by {greeting.title2}
      </p>
    </div>
  );
}
