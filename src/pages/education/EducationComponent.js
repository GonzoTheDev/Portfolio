import React from "react";
import { gsap } from "gsap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
import EducationImg from "./EducationImg";
import "./EducationComponent.css";

function Education(props) {
  const theme = props.theme;

  React.useEffect(() => {
    gsap.from(".heading-div", {
      opacity: 0,
      y: 40,
      duration: 2,
    });
  }, []);

  return (
    <div className="education-main">
      <Header theme={props.theme} setTheme={props.setTheme} />
      <div className="basic-education">
        <div className="heading-div">
          <div className="heading-img-div">
            <EducationImg theme={theme} />
          </div>
          <div className="heading-text-div">
            <h1 className="heading-text" style={{ color: theme.text }}>
              Education
            </h1>
            <h3 className="heading-sub-text" style={{ color: theme.text }}>
              Basic Qualification and Certifications
            </h3>
            <p
              className="experience-header-detail-text subTitle"
              style={{ color: theme.secondaryText }}
            >
              Below are the details of my education and certifications.
            </p>
          </div>
        </div>
        <Educations theme={props.theme} />
        <Certifications theme={props.theme} />
      </div>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Education;
