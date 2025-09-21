import React from "react";
import serversImage from "../../assets/images/servers.jpg";

export default function ExperienceImg(props) {
  return (
    <img
      src={serversImage}
      alt="Experience"
      style={{
        width: "80%",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
