import React, { useEffect, useState } from 'react';
import './About.css';
import theme_pattern from '../../assets/theme_pattern.svg';

const About = () => {
    const [about_meData, setAbout_meData] = useState(null);
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/about_me/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAbout_meData(data);
            })
            .catch(error => {
                console.error("Error fetching about_meData data:", error);
            });

        fetch('http://localhost:8000/api/skills/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Skills data:", data); // Log skills data
                setSkillsData(data);
            })
            .catch(error => {
                console.error("Error fetching skills data:", error);
            });
    }, []);

    if (!about_meData) {
        return <div>Loading...</div>;
    }

    return (
        <div id='about' className='about'>
            <div className="about-title">
                <h1>About me</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="about-section">
                <div className="about-left">
                    <img src={`http://localhost:8000${about_meData.about_me_image}`} alt="Profile" />
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>{about_meData.about_me_para1}</p>
                        <p>{about_meData.about_me_para2}</p>
                    </div>
                    <div className="about-skills">
                        {Array.isArray(skillsData) && skillsData.length > 0 ? (
                            skillsData.map(skill => (
                                <div className="about-skill" key={skill.id}>
                                    <p>{skill.name}</p>
                                    <hr style={{ width: `${skill.percentage}%` }} />
                                </div>
                            ))
                        ) : (
                            <p>No skills available</p> // Fallback message
                        )}
                    </div>
                </div>
            </div>
            <div className="about-achievements">
                <div className="about-achievement">
                    <h1>{about_meData.years_of_experience}+</h1>
                    <p> YEARS OF EXPERIENCE</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>{about_meData.projects}+</h1>
                    <p> PROJECTS</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>{about_meData.happy_clients}+</h1>
                    <p> HAPPY CLIENT</p>
                </div>
            </div>
        </div>
    );
}

export default About;
