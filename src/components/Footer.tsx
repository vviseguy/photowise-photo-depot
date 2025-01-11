import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p className="footer-text">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <div className="footer-links">
                <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                <a href="/contact" className="footer-link">Contact Us</a>
            </div>
        </footer>
    );
};

export default Footer;
