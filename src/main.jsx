import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const Main = () => {
  const [logoData, setLogoData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/logos/')  // Ensure this URL is correct
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLogoData(data);
        if (data.length > 0) {
          // Set the favicon dynamically
          const faviconLink = document.querySelector('link[rel="icon"]');
          faviconLink.href = `http://localhost:8000${data[0].logo_image}`;
        }
      })
      .catch(error => {
        console.error("Error fetching LogoData data:", error);
      });
  }, []);

  return <App logoData={logoData} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
