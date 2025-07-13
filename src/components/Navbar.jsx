import React, { useEffect } from 'react';
import { FaSearch, FaGlobe, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const Navbar = () => {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    const iconStyle = { fontSize: '20px', color: '#5b3a29' };

    return (
        <div className="container-fluid bg-white border-bottom py-2 px-3 px-md-4">
            <div className="row align-items-center">
                {/* Left Side */}
                <div className="col-12 col-md-4 mb-2 mb-md-0">
                    <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '20px' }}>Dashboard</h5>
                </div>

                {/* Right Side */}
                <div className="col-12 col-md-8">
                    <div className="d-flex flex-wrap justify-content-md-end align-items-center gap-3" style={{ fontSize: '18px' }}>

                        {/* Search */}
                        <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
                            <span className="input-group-text bg-white border-end-0">
                                <FaSearch style={iconStyle} />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search..."
                                style={{ fontSize: '16px' }}
                            />
                        </div>

                        {/* Language Dropdown */}
                        <div className="dropdown">
                            <button
                                className="btn btn-sm border-0 dropdown-toggle d-flex align-items-center"
                                type="button"
                                data-bs-toggle="dropdown"
                                style={{ fontSize: '18px', color: '#5b3a29' }}
                            >
                                <FaGlobe className="me-1" style={iconStyle} />
                                EN
                            </button>
                            <ul className="dropdown-menu" style={{ fontSize: '16px' }}>
                                <li><button className="dropdown-item">EN - English</button></li>
                                <li><button className="dropdown-item">HI - Hindi</button></li>
                            </ul>
                        </div>

                        {/* Notifications */}
                        <div className="dropdown position-relative">
                            <button
                                className="btn border-0 dropdown-toggle p-0"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                <FaBell style={iconStyle} />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    3
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: '280px', fontSize: '16px' }}>
                                <li><h6 className="dropdown-header fw-bold text-dark">Notifications</h6></li>
                                <li>
                                    <div className="dropdown-item">
                                        <div className="fw-semibold text-dark">GST Filing Due</div>
                                        <small className="text-muted">Due in 4 days</small>
                                    </div>
                                </li>
                                <li><hr className="dropdown-divider my-1" /></li>
                                <li>
                                    <div className="dropdown-item">
                                        <div className="fw-semibold text-dark">New Invoice Received</div>
                                        <small className="text-muted">10 minutes ago</small>
                                    </div>
                                </li>
                                <li><hr className="dropdown-divider my-1" /></li>
                                <li>
                                    <div className="dropdown-item">
                                        <div className="fw-semibold text-dark">Payment Received</div>
                                        <small className="text-muted">2 hours ago</small>
                                    </div>
                                </li>
                                <li><hr className="dropdown-divider my-2" /></li>
                                <li>
                                    <Link to="/notifications" className="dropdown-item text-center text-danger fw-semibold">
                                        View All
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="dropdown">
                            <button
                                className="btn btn-sm border-0 dropdown-toggle d-flex align-items-center"
                                type="button"
                                data-bs-toggle="dropdown"
                                style={{ fontSize: '18px' }}
                            >
                                <div
                                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: '#5b3a29',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    }}
                                >
                                    RK
                                </div>

                                <div className="d-none d-md-block text-start">
                                    <div className="fw-semibold text-dark" style={{ fontSize: '16px' }}>Rahul Kumar</div>
                                    <small className="text-muted" style={{ fontSize: '14px' }}>Admin</small>
                                </div>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ fontSize: '16px' }}>
                                <li>
                                    <h6 className="dropdown-header">
                                        Rahul Kumar<br />
                                        <small className="text-muted">rahul@example.com</small>
                                    </h6>
                                </li>
                                <li><hr className="dropdown-divider" /></li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center gap-2 text-dark" to="/profile">
                                        <FaUser style={{ color: '#5b3a29' }} />
                                        My Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center gap-2 text-dark" to="/settings">
                                        <FaCog style={{ color: '#5b3a29' }} />
                                        Settings
                                    </Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center gap-2 text-dark" to="/logout">
                                        <FaSignOutAlt style={{ color: '#5b3a29' }} />
                                        Logout
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
