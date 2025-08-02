import React from "react";
import {
  Building2,
  Heart,
  MapPin,
  Gift,
  Baby,
  Cake,
  Trophy,
  Music,
} from "lucide-react";
import "../styles/Services.css";

const Services = () => {
  const services = [
    {
      icon: <Building2 />,
      title: "Corporate Events",
      description:
        "Professional conferences, seminars, product launches, and corporate celebrations.",
      features: [
        "Conference Management",
        "Product Launches",
        "Team Building",
        "Awards Ceremonies",
      ],
    },
    {
      icon: <Heart />,
      title: "Pre-Weddings",
      description:
        "Engagement ceremonies, bridal showers, and pre-wedding celebrations.",
      features: [
        "Engagement Parties",
        "Bridal Showers",
        "Bachelor/Bachelorette",
        "Mehendi Ceremonies",
      ],
    },
    {
      icon: <MapPin />,
      title: "Destination Weddings",
      description:
        "Dream weddings in exotic locations with complete planning and coordination.",
      features: [
        "Venue Selection",
        "Travel Coordination",
        "Local Vendor Management",
        "Guest Services",
      ],
    },
    {
      icon: <Gift />,
      title: "Ring Ceremonies",
      description:
        "Intimate and elegant ring exchange ceremonies with personalized touches.",
      features: [
        "Venue Decoration",
        "Photography",
        "Catering Services",
        "Entertainment",
      ],
    },
    {
      icon: <Baby />,
      title: "Baby Showers",
      description:
        "Celebrate new arrivals with beautifully designed and joyful baby shower events.",
      features: [
        "Theme Decoration",
        "Games & Activities",
        "Photography",
        "Catering",
      ],
    },
    {
      icon: <Cake />,
      title: "Birthdays",
      description:
        "Memorable birthday celebrations for all ages with creative themes and entertainment.",
      features: [
        "Custom Themes",
        "Entertainment",
        "Cake & Catering",
        "Photography",
      ],
    },
    {
      icon: <Trophy />,
      title: "Sports Events",
      description:
        "Sports tournaments, award ceremonies, and athletic celebrations.",
      features: [
        "Tournament Organization",
        "Venue Management",
        "Awards Ceremonies",
        "Live Streaming",
      ],
    },
    {
      icon: <Music />,
      title: "Cultural Events",
      description:
        "Cultural festivals, art exhibitions, and community celebrations.",
      features: [
        "Festival Planning",
        "Artist Coordination",
        "Stage Management",
        "Cultural Programs",
      ],
    },
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          From intimate gatherings to grand celebrations, we create
          extraordinary experiences tailored to your vision.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>

                <button
                  className="service-btn"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h3>Ready to Plan Your Event?</h3>
          <p>
            Let us help you create an unforgettable experience that exceeds your
            expectations.
          </p>
          <button
            className="btn btn-primary"
            onClick={() =>
              document
                .querySelector("#contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
