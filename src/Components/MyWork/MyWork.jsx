import React, { useState, useEffect } from 'react';
import './MyWork.css';
import theme_pattern from '../../assets/theme_pattern.svg';
import arrow_icon from '../../assets/arrow_icon.svg';

const MyWork = () => {
  const [showAll, setShowAll] = useState(false); 
  const [workData, setWorkData] = useState([]); // Correct the state name

  // Fetch work data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/works/') // Ensure this URL matches your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWorkData(data); // Set work data to state
      })
      .catch(error => {
        console.error("Error fetching work data:", error);
      });
  }, []);

  // Function to toggle the visibility of work items
  const toggleShowMore = () => {
    setShowAll(prev => !prev);
  };

  return (
    <div id='work' className='mywork'>
      <div className="mywork-title">
        <h1>My Latest Work</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="mywork-container">
        {workData.slice(0, showAll ? workData.length : 6).map((work, index) => {
          const url = work.project_url.startsWith('http') ? work.project_url : `https://${work.project_url}`;
          return (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
              <img src={`http://localhost:8000${work.project_imagee}`} alt={`Project ${index + 1}`} /> {/* Correct image source */}
            </a>
          );
        })}
      </div>
      {workData.length > 6 && ( // Only show 'Show More' if there are more than 6 items
        <div className="mywork-showmore" onClick={toggleShowMore}>
          <p>{showAll ? 'Show Less' : 'Show More'}</p>
          <img src={arrow_icon} alt="Toggle show more" />
        </div>
      )}
    </div>
  );
};

export default MyWork;
