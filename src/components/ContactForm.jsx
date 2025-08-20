import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    emailjs
      .sendForm("service_lsj0ep7", "template_z4hakvv", form.current)
      .then(
        (result) => {
          console.log("✅ Message Sent Successfully:", result.text);
          setIsSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.log("❌ Error:", error.text);
          setError("Failed to send message. Please try again.");
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="contact-form-container">
      {isSubmitted ? (
        <div className="success-message">
          <CheckCircle size={48} color="green" />
          <h3>Thank You!</h3>
          <p>
            Your message has been sent successfully. We'll get back to you
            within 24 hours.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <h3>Send Us a Message</h3>

          <div className="form-group">
            <label htmlFor="full_name">Full Name *</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user_email">Email Address *</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number *</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="event_type">Event Type</label>
              <input
                type="text"
                id="event_type"
                name="event_type"
                placeholder="Event Type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="event_date">Event Date</label>
              <input type="date" id="event_date" name="event_date" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
            ></textarea>
          </div>

          {error && <div className="error">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send size={20} /> Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
