import React from "react";
import "./Certifications.css";
import { gsap } from "gsap";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";

function Certifications(props) {
  const theme = props.theme;

  React.useEffect(() => {
    gsap.from(".certs-header-div", {
      opacity: 0,
      y: 20,
      duration: 2,
    });
  }, []);

  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <h1 className="certs-header" style={{ color: theme.text }}>
          Certifications
        </h1>
        <h3 className="center">Working towards Microsoft Certified: Azure DevOps Engineer Expert.</h3>
      </div>
      <div className="certs-body-div">
        {certifications.certifications.map((cert) => {
          return <CertificationCard certificate={cert} theme={theme} />;
        })}
      </div>
    </div>
  );
}

export default Certifications;
