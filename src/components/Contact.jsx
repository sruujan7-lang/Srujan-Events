import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import "../styles/Contact.css";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_lsj0ep7", // Replace with your EmailJS service ID
        "template_z4hakvv", // Replace with your EmailJS template ID
        form.current,
        "Rf-1KA1D7ddDpH3Pl" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("SUCCESS");
          form.current.reset();
        },
        () => {
          setStatus("FAILED");
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Srujan Events</h1>
        <p className="tagline">Remembered Always</p>
        <p className="intro">
          We're here to help make your event dreams come true. Reach out to us
          through any of the following methods:
        </p>
      </div>

      <div className="contact-main">
        {/* Left Side - Contact Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>
            <Phone /> +91 92282 25591
          </p>
          <p>
            <Phone /> +91 98255 98222
          </p>
          <p>
            <Mail /> srujanevents2407@gmail.com
          </p>
          <p>
            <MapPin /> Ground Floor, Opp. St.Kabir School, Naranpura, Ahmedabad
            380013
          </p>
          <p>
            <Clock /> Open 24 x 7
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="user_name"
              placeholder="Full Name *"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email Address *"
              required
            />
            <input
              type="text"
              name="user_phone"
              placeholder="Phone Number *"
              required
            />
            <input
              type="text"
              name="event_type"
              placeholder="Event Type *"
              required
            />
            <input type="date" name="event_date" placeholder="dd-mm-yyyy" />
            <textarea
              name="message"
              placeholder="Tell us about your event requirements..."
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
          {status === "SUCCESS" && (
            <p className="success-msg">✅ Message Sent!</p>
          )}
          {status === "FAILED" && (
            <p className="error-msg">❌ Message Failed. Try again.</p>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="contact-map">
        <iframe
          title="Srujan Events Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.123456789!2d72.571362!3d23.050123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d1234567890%3A0xabc1234567890def!2sSt.%20Kabir%20School%2C%20Naranpura%2C%20Ahmedabad!5e0!3m2!1sen!2sin!4v1691234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
