import React from 'react';
import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <ul className="social-icons-list">
          <li><FacebookOutlinedIcon/></li>
          <li><InstagramIcon/></li>
          <li><YouTubeIcon/></li>
          
        </ul>
      </div>

      <div className="footer-links-container">
        <ul className="footer-column">
          <li><a href="#">Audio Description</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Legal Notice</a></li>
          <li><button className="service-code">Service Code</button></li>
        </ul>
        <ul className="footer-column">
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Cookie Preferences</a></li>
        </ul>
        <ul className="footer-column">
          <li><a href="#">Gift Cards</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Corporate Information</a></li>
        </ul>
        <ul className="footer-column">
          <li><a href="#">Media Center</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      <div className="footer-bottom-text">
        &copy; 1997–2025 Netflix, Inc.
      </div>
    </footer>
  );
};

export default Footer;
