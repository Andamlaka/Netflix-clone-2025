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
          <li><FacebookOutlinedIcon /></li>
          <li><InstagramIcon /></li>
          <li><YouTubeIcon /></li>
        </ul>
      </div>

      <div className="footer-links-container">
        <ul className="footer-column">
          <li><a href="/audio-description">Audio Description</a></li>
          <li><a href="/investor-relations">Investor Relations</a></li>
          <li><a href="/legal-notice">Legal Notice</a></li>
          <li><button className="service-code">Service Code</button></li>
        </ul>
        <ul className="footer-column">
          <li><a href="/help-center">Help Center</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/cookie-preferences">Cookie Preferences</a></li>
        </ul>
        <ul className="footer-column">
          <li><a href="/gift-cards">Gift Cards</a></li>
          <li><a href="/terms-of-use">Terms of Use</a></li>
          <li><a href="/corporate-info">Corporate Information</a></li>
        </ul>
        <ul className="footer-column">
          <li><a href="/media-center">Media Center</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </div>

      <div className="footer-bottom-text">
        &copy; 1997–2025 Netflix, Inc.
      </div>
    </footer>
  );
};

export default Footer;
