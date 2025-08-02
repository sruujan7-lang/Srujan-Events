import React from "react";
import { Award, Users, Calendar, Heart } from "lucide-react";
import "../styles/About.css";

const About = () => {
  const stats = [
    { icon: <Calendar />, number: "500+", label: "Events Completed" },
    { icon: <Users />, number: "1000+", label: "Happy Clients" },
    { icon: <Award />, number: "15+", label: "Years Experience" },
    { icon: <Heart />, number: "99%", label: "Client Satisfaction" },
  ];

  const features = [
    {
      title: "Expert Planning",
      description:
        "Our experienced team handles every detail with precision and creativity.",
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored event experiences that reflect your unique vision and style.",
    },
    {
      title: "Full-Service Support",
      description:
        "From concept to execution, we provide comprehensive event management.",
    },
    {
      title: "24/7 Coordination",
      description:
        "Dedicated support throughout your event journey for peace of mind.",
    },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Srujan Events</h2>
            <p className="section-subtitle">
              Creating extraordinary moments since 2010, we specialize in
              transforming your dreams into unforgettable experiences.
            </p>

            <div className="about-description">
              <p>
                At Srujan Events, we believe every celebration deserves to be
                extraordinary. With over a decade of experience in event
                management, we have crafted countless memorable moments for our
                clients across various occasions.
              </p>
              <p>
                Our team of passionate professionals brings creativity,
                precision, and attention to detail to every project. From
                intimate gatherings to grand celebrations, we ensure your event
                reflects your unique vision while exceeding your expectations.
              </p>
            </div>

            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image">
            <img
              src="https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About Srujan Events"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>15+ Years of Excellence</h3>
                <p>Crafting memorable experiences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
