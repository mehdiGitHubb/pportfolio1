import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import arrow_icon from '../../assets/arrow_icon.svg'; // Assuming you have an arrow icon
import './Services.css';
import theme_pattern from '../../assets/theme_pattern.svg';

// Initialize the modal settings
Modal.setAppElement('#root');

const Services = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [servicesData, setServicesData] = useState([]); // State for services data

  // Fetch services data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/services/') // Ensure this URL matches your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setServicesData(data); // Set services data to state
      })
      .catch(error => {
        console.error("Error fetching services data:", error);
      });
  }, []);

  // Function to truncate text if it's too long
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Function to open the modal and pass in the service data
  const openModal = (service) => {
    setSelectedService(service);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedService(null);
  };

  return (
    <div id='services' className='services'>
      <div className="service-title">
        <h1>My Services</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="services-container">
        {/* Render the services, ensuring the data is valid */}
        {Array.isArray(servicesData) && servicesData.length > 0 ? (
          servicesData.map((service, index) => (
            <div key={index} className="services-format">
              <h3>{service.numro_service}</h3>
              <h2>{service.service_name}</h2>
              <p>{truncateText(service.service_description, 100)}</p> {/* Truncate description */}
              <div className="services-redmore">
                <p
                  onClick={() => openModal(service)} // Open modal on click
                >
                  Read More
                </p>
                <img src={arrow_icon} alt="Arrow Icon" />
              </div>
            </div>
          ))
        ) : (
          <p>No services available.</p> // Fallback message if no services
        )}

        {/* Modal for displaying full service description */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Service Description"
          className="modal"
          overlayClassName="modal-overlay"
        >
          {selectedService && (
            <div className="modal-content-wrapper">
              <div className="modal-header">
                <h3>{selectedService.numro_service}</h3>
                <h2>{selectedService.service_name}</h2>
              </div>
              <p>{selectedService.service_description}</p> {/* Full description in modal */}
              <button onClick={closeModal} className="modal-close-btn">
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Services;
