import React from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import "./ProjectCard.css";

export default function ProjectCard({ repo, theme }) {
  function openRepoinNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div>
      <div
        key={repo.id}
        onClick={() => openRepoinNewTab(repo.url)}
        style={{
          color: "rgb(88, 96, 105)",
          backgroundColor: theme.projectCard,
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
          padding: "2rem",
          cursor: "pointer",
          borderRadius: "5px",
          height: "100%",
          transition: "all 0.2s ease-in-out",
        }}
        className="project-card"
      >
        <div className="repo-name-div">
          <p className="repo-name" style={{ color: theme.text }}>
            {repo.name}
          </p>
        </div>
        <p className="repo-description" style={{ color: theme.text }}>
          {repo.description}
        </p>
        <div className="repo-details">
          <ProjectLanguages logos={repo.languages} />
        </div>
      </div>
    </div>
  );
}
