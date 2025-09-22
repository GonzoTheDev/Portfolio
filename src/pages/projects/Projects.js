import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { gsap } from "gsap";
import { projectsHeader, projects } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.accentBright};
  &:hover {
    box-shadow: 0 5px 15px ${(props) => props.theme.accentBright};
  }
`;

function Projects(props) {
  const theme = props.theme;

  React.useEffect(() => {
    gsap.from(".project-card", {
      opacity: 0,
      y: 40,
      duration: 2,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="projects-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-projects">
        <div className="projects-heading-div">
          <div className="projects-heading-img-div">
            <ProjectsImg theme={theme} />
          </div>
          <div className="projects-heading-text-div">
            <h1
              className="projects-heading-text"
              style={{ color: theme.text }}
            >
              {projectsHeader.title}
            </h1>
            <p
              className="projects-header-detail-text subTitle"
              style={{ color: theme.secondaryText }}
            >
              {projectsHeader["description"]}
            </p>
          </div>
        </div>
      </div>
      <div className="repo-cards-div-main">
        {projects.data.map((repo) => {
          return <ProjectCard repo={repo} theme={theme} />;
        })}
      </div>
      <br />
      <br />
      <br />
      <a
        as={StyledDiv}
        className="general-btn"
        href="https://github.com/GonzoTheDev"
      >
        More Projects (Github)
      </a>
      <br />
      <br />
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Projects;
