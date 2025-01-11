import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: Add your custom styles here
import SearchBar from './SearchBar.tsx';

interface HeaderProps {
    email?: string; // Pass the user's email if logged in, otherwise undefined
    onLogin: () => void; // Callback for login
    onLogout: () => void; // Callback for logout
    showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ email, onLogin, onLogout, showSearch }) => {

    
    return (
        <header className="header">
            <div className="header-container">
                {/* Title */}
                <div className="header-title">
                    <Link to="/">PhotographySite</Link>
                </div>

                {showSearch && <SearchBar />}

                <div className="header-label">
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                {/* Account Section */}
                <div className="header-account">
                    {email ? (
                        <div className="account-info">
                            <span>{email}</span>
                            <button onClick={onLogout} className="logout-button">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button onClick={onLogin} className="login-button">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
