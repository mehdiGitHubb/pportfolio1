import React, { useState, useEffect } from 'react';
import './Contact.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';
import Modal from './model';  // Ensure the Modal component is correctly imported

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch contact data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/contacts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setContactData(data);  // Assuming 'data' contains the contact information
      })
      .catch(error => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  // Handle form submission for sending an email
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Email sent successfully!");

    const formData = new FormData(event.target);
    formData.append("access_key", "6749db31-5f2f-4f47-acb5-434c54536915");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Email sent successfully!");
        setShowModal(true);  // Show modal on success
        event.target.reset();  // Reset form after submission
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
    }
  };

  // If contact data isn't loaded yet, show a loading message
  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="contact" className="contact">
      <div className="contact-title">
        <h1>Get in Touch</h1>
        <img src={theme_pattern} alt="Theme Pattern" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's Talk</h1>
          <p>{contactData.contact_para}</p>  {/* Display the contact paragraph */}
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="Mail Icon" />
              <p>{contactData.email}</p>  {/* Display email */}
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="Location Icon" />
              <p>{contactData.localisation}</p>  {/* Display location */}
            </div>
            <div className="contact-detail">
              <img src={call_icon} alt="Call Icon" />
              <p>{contactData.phone_number}</p>  {/* Display phone number */}
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="name">Your full name</label>
          <input type="text" placeholder="Enter your full name" name="name" required />
          <label htmlFor="email">Your email</label>
          <input type="email" placeholder="Enter your email" name="email" required />
          <label htmlFor="message">Write your message here</label>
          <textarea name="message" rows="8" placeholder="Enter your message" required></textarea>
          <button type="submit" className="contact-submit">Send Now</button>
        </form>
      </div>
      {showModal && <Modal message={result} onClose={() => setShowModal(false)} />}  {/* Show modal on success */}
    </div>
  );
};

export default Contact;
