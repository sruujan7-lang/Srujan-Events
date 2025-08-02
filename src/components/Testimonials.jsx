import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sample testimonials data
  const sampleTestimonials = [
    {
      id: 1,
      name: "Priya & Rajesh",
      event: "Wedding Ceremony",
      message:
        "Srujan Events made our dream wedding come true! Every detail was perfect, from the decorations to the coordination. Our guests are still talking about how beautiful everything was.",
      rating: 5,
    },
    {
      id: 2,
      name: "Anita Sharma",
      event: "Corporate Event",
      message:
        "Outstanding professional service! They handled our annual conference flawlessly. The team was responsive, creative, and delivered beyond our expectations.",
      rating: 5,
    },
    {
      id: 3,
      name: "Vikram Patel",
      event: "Birthday Celebration",
      message:
        "My son's 10th birthday party was absolutely amazing! The theme decoration and entertainment kept all the kids engaged. Highly recommend their services.",
      rating: 5,
    },
    {
      id: 4,
      name: "Meera & Family",
      event: "Baby Shower",
      message:
        "Beautiful baby shower celebration! They took care of everything and made the day so special for us. The attention to detail was incredible.",
      rating: 5,
    },
    {
      id: 5,
      name: "Tech Solutions Ltd",
      event: "Product Launch",
      message:
        "Professional and creative team! Our product launch event was a huge success thanks to their excellent planning and execution.",
      rating: 5,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTestimonials(sampleTestimonials);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "star-filled" : "star-empty"}
      />
    ));
  };

  if (loading) {
    return (
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="loading">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            No testimonials available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it - hear from our happy clients about
          their experiences.
        </p>

        <div className="testimonials-slider">
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Quote size={40} />
                  </div>

                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="testimonial-message">"{testimonial.message}"</p>

                  <div className="testimonial-author">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-event">{testimonial.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="testimonials-nav testimonials-prev"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="testimonials-nav testimonials-next"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>

          <div className="testimonials-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-indicator ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>99%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Events Completed</p>
          </div>
          <div className="stat-item">
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
