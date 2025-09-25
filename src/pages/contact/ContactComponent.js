// src/pages/contact/ContactComponent.js
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { gsap } from "gsap";
import "./ContactComponent.css";
import { contactPageData } from "../../portfolio.js";

const ContactData = contactPageData.contactSection;

// Try both "assets" and the common misspelling "assests"
let imagesCtxPrimary = null;
let imagesCtxAlt = null;

try {
  imagesCtxPrimary = require.context(
    "../../assets/images",
    false,
    /\.(png|jpe?g|gif|svg|webp)$/i
  );
} catch (_) {}
try {
  imagesCtxAlt = require.context(
    "../../assests/images",
    false,
    /\.(png|jpe?g|gif|svg|webp)$/i
  );
} catch (_) {}

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
    } catch (_) {}
  }
  return "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
}

const TURNSTILE_SITEKEY = process.env.REACT_APP_TURNSTILE_SITEKEY;
const CONTACT_ENDPOINT =
  process.env.REACT_APP_CONTACT_ENDPOINT || "/api/contact";

function Contact(props) {
  const theme = props.theme;

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = React.useState("");

  // Bot controls
  const [token, setToken] = React.useState("");
  const [honeypot, setHoneypot] = React.useState(""); // must stay empty
  const widgetRef = React.useRef(null);
  const [widgetId, setWidgetId] = React.useState(null);

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(String(val || "").trim());
  const profileImgSrc = resolveProfileImg(ContactData?.profile_image_path);

  // Animate in
  React.useEffect(() => {
    gsap.from(".contact-heading-div", { opacity: 0, y: 40, duration: 1 });
  }, []);

  // Load Turnstile script if not already present, then render widget
  React.useEffect(() => {
    function renderWidget() {
      if (!window.turnstile || !widgetRef.current || !TURNSTILE_SITEKEY) return;
      const id = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        callback: (t) => setToken(t),
      });
      setWidgetId(id);
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Inject script dynamically (safe even if you also added it in index.html)
    const existing = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile"]'
    );
    if (existing) {
      const i = setInterval(() => {
        if (window.turnstile) {
          clearInterval(i);
          renderWidget();
        }
      }, 200);
      return;
    }

    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    s.onload = renderWidget;
    document.head.appendChild(s);
  }, []);

  async function handleRequestCV(e) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }
    if (!TURNSTILE_SITEKEY) {
      setErrorMsg("Verification not configured. Please try again later.");
      return;
    }
    if (!token) {
      setErrorMsg("Please complete the verification.");
      return;
    }
    if (honeypot) {
      // Silent drop if bots filled the hidden field
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
          token,
          website: honeypot, // honeypot field name expected by server
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
    } finally {
      // Reset the widget for another try
      try {
        if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
      } catch (_) {}
      setToken("");
    }
  }

  const buttonDisabled =
    status === "sending" || !isValidEmail(email) || !token || !!honeypot;

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
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
            <form onSubmit={handleRequestCV} className="contact-cv-request">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-email-input"
                aria-label="Your email address to receive the full CV"
                autoComplete="email"
              />

              {/* Honeypot: visually hidden but focusable by bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  height: 0,
                  width: 0,
                  opacity: 0,
                }}
              />

              {/* Turnstile container */}
              <div ref={widgetRef} style={{ marginTop: 8, marginBottom: 8 }} />

              {/* Using anchor styled as button to match your theme */}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (!buttonDisabled) handleRequestCV(e);
                }}
                className={`general-btn ${buttonDisabled ? "disabled" : ""}`}
                href="#"
                role="button"
                aria-disabled={buttonDisabled}
                title={
                  isValidEmail(email)
                    ? token
                      ? ""
                      : "Complete the verification to enable"
                    : "Enter a valid email address to enable"
                }
                style={buttonDisabled ? { pointerEvents: "none" } : undefined}
              >
                {status === "sending" ? "Sending…" : "Request Full CV"}
              </a>

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
            </form>

            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
