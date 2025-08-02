import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Corporate Events",
    "Weddings",
    "Birthday Parties",
    "Cultural Events",
    "Sports Events",
  ];

  const socialLinks = [
    { icon: <Facebook />, url: "#", name: "Facebook" },
    { icon: <Instagram />, url: "#", name: "Instagram" },
    { icon: <Twitter />, url: "#", name: "Twitter" },
    { icon: <Linkedin />, url: "#", name: "LinkedIn" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Srujan Events</h3>
              <p>Creating extraordinary moments since 2010</p>
            </div>
            <p className="footer-description">
              We specialize in transforming your dreams into unforgettable
              experiences. From intimate gatherings to grand celebrations, we
              handle every detail with precision and creativity.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection(link.href)}>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 9228225591</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>srujanevents2407@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Naranpura, Ahmedabad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Srujan Events. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
