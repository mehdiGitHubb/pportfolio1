import React, { useEffect, useState } from 'react';
import './Hero.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  // Fetch hero data from the backend
  useEffect(() => {
    fetch('http://localhost:8000/api/hero/')  // Make sure the correct URL is used
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setHeroData(data);
      })
      .catch(error => {
        console.error("Error fetching hero data:", error);
      });
  }, []);
  

  if (!heroData) {
    return <div>Loading...</div>;
  }

  return (
    <div id='home' className='hero'>
      <img src={`http://localhost:8000${heroData.profile_image}`} alt="Profile" />
      <h1>
        <span>I'm {heroData.full_name}</span>, {heroData.small_description}
      </h1>
      <p>{heroData.description}</p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className='anchor-link' href='#contact'>
            Connect with me
          </AnchorLink>
        </div>
        <div className="hero-resume">
          <a href={heroData.cv} download="MY_CV.pdf">Download CV</a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
