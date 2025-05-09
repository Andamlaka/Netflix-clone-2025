import React from 'react'
import './header.css'
import NetflixLogo from '../../assets/images/NetflixLogo.png'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header-left">
        <ul className="nav-list">
          <li><img src={NetflixLogo} alt="Netflix Logo" width="100px" /></li>
          <li className="nav-item">Netflix</li>
          <li className="nav-item">Home</li>
          <li className="nav-item">TVShow</li>
          <li className="nav-item">Movies</li>
          <li className="nav-item">Latest</li>
          <li className="nav-item">MyList</li>
          <li className="nav-item">Browse by Languages</li>
        </ul>
      </div>
      <div className="header-right">

        <ul className="nav-list">
          <li><SearchIcon/></li> 
          <li><NotificationsNoneIcon/></li>
          <li><AccountBoxIcon/></li>
          <li><ArrowDropDownIcon/></li>
         
        </ul>
      </div>
    </div>
  );
}

export default Header