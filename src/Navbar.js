import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from './AuthorizationContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { setIsAuthorized } = useAuthorization();
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsAuthorized(false);
        navigate('/');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="/logo.png" alt="Logo" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/searchfriends">Search Friends</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/courses">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usercourses">My Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/friends">My Friends</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};



export default Navbar;
