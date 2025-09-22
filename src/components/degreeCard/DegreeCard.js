import React from "react";
import "./DegreeCard.css";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 220px;
  height: auto;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.accentColor};
  margin-right: 50px;
  box-shadow: 0px 0px 5px ${(props) => props.theme.accentColor};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 15px ${(props) => props.theme.accentColor};
  }
  @media (max-width: 768px) {
    margin-left: 50px;
    margin-bottom: 15px;
    width: 175px;
  }
`;

function DegreeCard(props) {
  const degree = props.degree;
  const theme = props.theme;

  return (
    <div className="degree-card">
      <div>
        <StyledImg
          src={require(`../../assets/images/${degree.logo_path}`)}
          alt={degree.alt_name}
          theme={theme}
        />
      </div>
      <div
        className="card-body"
        style={{
          borderBottom: `1px solid ${theme.accentColor}`,
          borderLeft: `1px solid ${theme.accentColor}`,
          borderRight: `1px solid ${theme.accentColor}`,
          borderRadius: "7px",
          width: "90%",
          margin: "10px",
          boxShadow: `0px 1px 5px ${theme.accentColor}`,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <div
          className="body-header"
          style={{ backgroundColor: theme.accentColor }}
        >
          <div className="body-header-title">
            <h2 className="card-title" style={{ color: "#FFFFFF" }}>
              {degree.title}
            </h2>
            <h3 className="card-subtitle" style={{ color: "#FFFFFF" }}>
              {degree.subtitle}
            </h3>
          </div>
          <div className="body-header-duration">
            <h3 className="duration" style={{ color: "#FFFFFF" }}>
              {degree.duration}
            </h3>
          </div>
        </div>
        <div classname="body-content">
          {degree.descriptions.map((sentence) => {
            return (
              <p className="content-list" style={{ color: theme.text }}>
                {sentence}
              </p>
            );
          })}
          <a
            href={degree.website_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <p
              style={{
                textDecoration: "none",
                float: "right",
                backgroundColor: theme.accentColor,
                color: "rgba(255, 255, 255, 1)",
                padding: "15px 15px",
                marginTop: "25px",
                borderRadius: "4px",
                borderWidth: "0px",
                marginBottom: "20px",
                width: "200px",
                height: "50px",
                fontWeight: "bold",
                fontFamily: "Google Sans Regular",
                fontSize: "17px",
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
                ":hover": {
                  color: "rgba(255, 255, 255, 1)",
                  boxShadow: `0 5px 10px ${theme.accentColor}`,
                },
              }}
            >
              Visit Website
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DegreeCard;
