import React, { useState } from "react";
import "./Contact.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { contactInfo } from "../../portfolio";
import nodemailer from "nodemailer";

export default function Contact() {
  const [email, setEmail] = useState("");

  const handleRequestCV = async () => {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.eu-north-1.amazonaws.com", // Replace with your Amazon SES SMTP endpoint
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "AKIAW23DTS7EGHP6YMV2", // Replace with your Amazon SES SMTP username
        pass: "BHFqbChHW8tpWkxoCDFdJA+YwuvIebxo2VgTbTCBqCLE", // Replace with your Amazon SES SMTP password
      },
    });

    const mailOptions = {
      from: email, // Sender's email address
      to: "contact@shanebuckley.ie", // Recipient's email address
      subject: "Request Full CV",
      text: `Please send your CV to ${email}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="main contact-margin-top" id="contact">
      <div className="contact-div-main">
        <div className="contact-header">
          <h1 className="heading contact-title">{contactInfo.title}</h1>
          <p className="subTitle contact-subtitle">{contactInfo.subtitle}</p>

          <div className="contact-text-div">
            <a className="contact-detail" href={"tel:" + contactInfo.number}>
              {contactInfo.number}
            </a>
            <br />
            <br />
            <a
              className="contact-detail-email"
              href={"mailto:" + contactInfo.email_address}
            >
              {contactInfo.email_address}
            </a>
            <br />
            <br />
            <SocialMedia />
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="contact-email-input"
            />
            <button onClick={handleRequestCV} className="contact-cv-button">
              Request Full CV
            </button>
          </div>
        </div>
        <div className="contact-image-div">
          <img
            alt=""
            src={require("../../assests/images/contactMail.png")}
          ></img>
        </div>
      </div>
    </div>
  );
}
