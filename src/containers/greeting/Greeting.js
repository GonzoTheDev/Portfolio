import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import FeelingProud from "./FeelingProud";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.accentBright};
  &:hover {
    box-shadow: 0 5px 15px ${(props) => props.theme.accentBright};
  }
`;

export default function Greeting(props) {
  const theme = props.theme;
  const navigate = useNavigate();

  React.useEffect(() => {
    gsap.from(".greet-main", {
      opacity: 0,
      y: 40,
      duration: 2,
    });
  }, []);

  return (
    <div className="greet-main" id="greeting">
      <div className="greeting-main">
        <div className="greeting-text-div">
          <div>
            <h1 className="greeting-text">{greeting.title}</h1>
            <p
              className="greeting-text-p subTitle"
              style={{ color: theme.secondaryText }}
            >
              <span>I'm </span>
              <span style={{ color: theme.accentColor }}>
                {greeting.full_name}.{" "}
              </span>
              {greeting.subTitle}
            </p>
            <SocialMedia />
            <div className="portfolio-repo-btn-div">
              <StyledButton
                className="button"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contact Me
              </StyledButton>
            </div>
          </div>
        </div>
        <div className="greeting-image-div">
          <FeelingProud theme={theme} />
        </div>
      </div>
    </div>
  );
}
