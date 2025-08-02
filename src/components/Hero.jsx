import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import "../styles/Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Creating Extraordinary Moments",
      subtitle: "Premium Event Management Services",
      description:
        "Transform your special occasions into unforgettable experiences with our expert planning and flawless execution.",
    },
    {
      image:
        "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Destination Weddings",
      subtitle: "Dream Locations, Perfect Moments",
      description:
        "Create magical wedding experiences in breathtaking destinations around the world.",
    },
    {
      image:
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "Corporate Excellence",
      subtitle: "Professional Event Solutions",
      description:
        "Elevate your corporate events with our sophisticated planning and seamless execution.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <h2 className="hero-subtitle">{slide.subtitle}</h2>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-buttons">
                    <button
                      onClick={() =>
                        document
                          .querySelector("#contact")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn btn-primary"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() =>
                        document
                          .querySelector("#gallery")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn btn-secondary"
                    >
                      <Play size={20} />
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-nav hero-nav-prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="hero-nav hero-nav-next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${
              index === currentSlide ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
