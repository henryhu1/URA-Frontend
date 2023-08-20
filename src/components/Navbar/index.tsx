import { NavLink } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar">
      <ul className="navbar-links">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
