import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { gsap } from "gsap";

export default function Skills(props) {
  const theme = props.theme;

  React.useEffect(() => {
    gsap.from(".skills-header-div", {
      opacity: 0,
      y: 20,
      duration: 2,
    });
  }, []);

  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <h1 className="skills-header" style={{ color: theme.text }}>
          Here's what I do
        </h1>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
