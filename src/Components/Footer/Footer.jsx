import React, {  useState, useEffect } from 'react';
import './Footer.css'
import footer_logo from'../../assets/footer_logo.svg'



const Footer = () => {
    const [logoData, setLogoData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/logos/')  // Make sure the correct URL is used
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLogoData(data);
      })
      .catch(error => {
        console.error("Error fetching LogoData data:", error);
      });
  }, []);
  const logoImage = logoData.length > 0 ? logoData[0].logo_image : '';

  if (logoData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className='footer'>
        <div className="footer-top">
            <div className="footer-top-left">
            <img
    src={`http://localhost:8000${logoImage}`}
    alt="logo"
    style={{ width: '130px', height: '68px', }}
/>
            </div>
           
            
        </div>
        <hr />
        <div className="footer-bottom">
            <p className="footer-bottom-left">© 2024 MMD development. All rights reserved.</p>
            <div className="footer-bottom-right">
                <p>Term of Services</p>
                <p>Privecy</p>
                <p>contact me</p>
            </div>
        </div>
    </div>
  )
}

export default Footer