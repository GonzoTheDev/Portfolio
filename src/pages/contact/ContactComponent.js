// src/pages/contact/ContactComponent.js
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import { style } from "glamor";

const ContactData = contactPageData.contactSection;
// const blogSection = contactPageData.blogSection; // unused

// Prepare two contexts to handle both "assets" and the common "assests" folder name.
// Webpack will include files matched by these contexts at build time.
let imagesCtxPrimary = null;
let imagesCtxAlt = null;

try {
  imagesCtxPrimary = require.context("../../assets/images", false, /\.(png|jpe?g|gif|svg|webp)$/i);
} catch (_) {}
try {
  imagesCtxAlt = require.context("../../assests/images", false, /\.(png|jpe?g|gif|svg|webp)$/i);
} catch (_) {}

// Helper to resolve a profile image path from ContactData with graceful fallback.
function resolveProfileImg(filename) {
  const safeName = (filename || "").replace(/^\.?\//, "");
  const candidates = [
    { ctx: imagesCtxPrimary, path: `./${safeName}` },
    { ctx: imagesCtxAlt, path: `./${safeName}` },
    { ctx: imagesCtxPrimary, path: "./defaultProfile.png" },
    { ctx: imagesCtxAlt, path: "./defaultProfile.png" },
  ];

  for (const c of candidates) {
    try {
      if (c.ctx) return c.ctx(c.path);
    } catch (_) {
      // continue
    }
  }
  // Final ultra-safe fallback: empty data URL (prevents broken <img>)
  return "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
}

function Contact(props) {
  const theme = props.theme;

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = React.useState("");

  const CONTACT_ENDPOINT = process.env.REACT_APP_CONTACT_ENDPOINT || "/api/contact";

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(String(val || "").trim());

  const handleRequestCV = async () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "request_cv",
          email: trimmed,
        }),
      });

      if (!res.ok) {
        let serverErr = "";
        try {
          const j = await res.json();
          serverErr = j?.error || "";
        } catch (_) {}
        throw new Error(serverErr || `HTTP ${res.status}`);
      }

      setStatus("sent");
    } catch (err) {
      console.error("Request CV failed:", err);
      setErrorMsg("Couldn’t send the request right now. Please try again soon.");
      setStatus("error");
    }
  };

  const styles = style({
    backgroundColor: `${theme.accentBright}`,
    ":hover": {
      boxShadow: `0 5px 15px ${theme.accentBright}`,
    },
  });

  const profileImgSrc = resolveProfileImg(ContactData?.profile_image_path);
  const buttonDisabled = status === "sending" || !isValidEmail(email);

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <Fade bottom duration={1000} distance="40px">
          <div className="contact-heading-div">
            <div className="contact-heading-img-div">
              <img className="profile-pic" src={profileImgSrc} alt="Profile" />
            </div>

            <div className="contact-heading-text-div">
              <h1 className="contact-heading-text" style={{ color: theme.text }}>
                {ContactData?.title}
              </h1>

              <p
                className="contact-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {ContactData?.description}
              </p>

              <SocialMedia />
              <br />
              <br />

              {/* Request CV flow */}
              <div className="contact-cv-request">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-email-input"
                  aria-label="Your email address to receive the full CV"
                />
                <button
                  onClick={handleRequestCV}
                  className={`general-button ${buttonDisabled ? "disabled" : ""}`}
                  disabled={buttonDisabled}
                  title={isValidEmail(email) ? "" : "Enter a valid email address to enable"}
                >
                  {status === "sending" ? "Sending…" : "Request Full CV"}
                </button>

                {status === "sent" && (
                  <p className="contact-status success" style={{ color: theme.success }}>
                    Thanks! I’ll email you the CV shortly.
                  </p>
                )}
                {errorMsg && (
                  <p className="contact-status error" style={{ color: theme.error }}>
                    {errorMsg}
                  </p>
                )}
              </div>

              <br />
              <br />
            </div>
          </div>
        </Fade>
        <Fade bottom duration={1000} distance="40px"></Fade>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
