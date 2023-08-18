import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link
          className={isActiveLink("/contact") ? "selected link" : "link"}
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className={isActiveLink("/version") ? "selected link" : "link"}
          to="/version"
        >
          Version
        </Link>
        <Link
          className={isActiveLink("/privacy") ? "selected link" : "link"}
          to="/privacy"
        >
          Privacy/Security
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
