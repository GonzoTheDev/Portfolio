import React from "react";
import "./CertificationCard.css";
import styled from "styled-components";

const StyledCard = styled.div`
  box-shadow: 0px 2px 5px ${(props) => props.colorCode};
  border: 1px solid ${(props) => props.colorCode};
  &:hover {
    box-shadow: 0 5px 15px ${(props) => props.colorCode};
  }
`;

function CertificationCard(props) {
  const certificate = props.certificate;
  const theme = props.theme;

  return (
    <StyledCard className="cert-card" colorCode={certificate.color_code}>
      <div className="content">
        <a
          href={certificate.certificate_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="content-overlay"></div>
          <div
            className="cert-header"
            style={{ backgroundColor: certificate.color_code }}
          >
            <img
              className="logo_img"
              src={require(`../../assets/images/${certificate.logo_path}`)}
              alt={certificate.alt_name}
            />
          </div>
          {/* <div className="content-details fadeIn-top">
									<h3 className="content-title" style={{ color: theme.body }}>
										Certificate
									</h3>
								</div> */}
        </a>
      </div>
      <div className="cert-body">
        <h2 className="cert-body-title" style={{ color: theme.text }}>
          {certificate.title}
        </h2>
        <h3
          className="cert-body-subtitle"
          style={{ color: theme.secondaryText }}
        >
          {certificate.subtitle}
        </h3>
      </div>
    </StyledCard>
  );
}

export default CertificationCard;
