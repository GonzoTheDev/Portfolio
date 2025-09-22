import React from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard.js";
import { degrees } from "../../portfolio";
import { gsap } from "gsap";

function Educations(props) {
  const theme = props.theme;

  React.useEffect(() => {
    gsap.from(".educations-header-div", {
      opacity: 0,
      y: 20,
      duration: 2,
    });
  }, []);

  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <h1 className="educations-header" style={{ color: theme.text }}>
          Education
        </h1>
      </div>
      <div className="educations-body-div">
        {degrees.degrees.map((degree) => {
          return <DegreeCard degree={degree} theme={theme} />;
        })}
      </div>
    </div>
  );
}

export default Educations;
