import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import nav_underline from '../../assets/nav_underline.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import menu_open from '../../assets/menu_open.svg';
import menu_close from '../../assets/menu_close.svg';

const Navbar = () => {
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

  const [menu, setMenu] = useState("home");
  const menuRef = useRef();
  const openMenu = () => {
    menuRef.current.style.right = "0";
  };
  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  };

  // Ensure the logo is accessible
  const logoImage = logoData.length > 0 ? logoData[0].logo_image : '';

  if (logoData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='navbar'>
      {logoImage && <img src={`http://localhost:8000${logoImage}`} alt="logo"style={{ width: '130px', height: '68px' }} />}
      <img src={menu_open} onClick={openMenu} alt="Open Menu" className='nav-mob-open' />
      <ul ref={menuRef} className='nav-menu'>
        <img src={menu_close} onClick={closeMenu} alt="Close Menu" className="nav-mob-close" />
        {["home", "about", "services", "work", "contact"].map((item, index) => (
          <li key={index}>
            <AnchorLink className='anchor-link' href={`#${item}`} offset={50}>
              <p onClick={() => setMenu(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
            </AnchorLink>
            {menu === item && <img src={nav_underline} alt='' />}
          </li>
        ))}
      </ul>
      <div className="nav-connect">
        <AnchorLink className='anchor-link' href='#contact' offset={50}>
          <p onClick={() => setMenu("contact")}>Connect with me</p>
        </AnchorLink>
      </div>
    </div>
  );
};

export default Navbar;
