import React, { useState, useEffect } from 'react';
import {
    FaChartLine, FaShoppingCart, FaLock, FaWarehouse,
    FaCalculator, FaFileInvoice, FaUsers, FaCreditCard, FaCog
} from "react-icons/fa";

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSED_WIDTH = 70;

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [active, setActive] = useState('dashboard');

    useEffect(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            if (isMobile) {
                mainContent.style.marginLeft = '0';
            } else {
                mainContent.style.marginLeft = isCollapsed
                    ? `${SIDEBAR_COLLAPSED_WIDTH}px`
                    : `${SIDEBAR_WIDTH}px`;
            }
        }
        document.body.style.overflow = (isMobile && !isCollapsed) ? 'hidden' : '';
        return () => {
            if (mainContent) mainContent.style.marginLeft = '';
            document.body.style.overflow = '';
        };
    }, [isCollapsed, isMobile]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setIsCollapsed(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const menuItems = [
        { icon: <FaChartLine />, text: 'Dashboard', id: 'dashboard' },
        { icon: <FaShoppingCart />, text: 'Sales', id: 'sales' },
        { icon: <FaLock />, text: 'Purchase', id: 'purchase' },
        { icon: <FaWarehouse />, text: 'Inventory & Warehouse', id: 'inventory' },
        { icon: <FaCalculator />, text: 'Accounting', id: 'accounting' },
        { icon: <FaFileInvoice />, text: 'GST & Tax', id: 'gst' },
        { icon: <FaUsers />, text: 'Clients & Vendors', id: 'clients' },
        { icon: <FaCreditCard />, text: 'Payments', id: 'payments' },
        { text: 'Reports', id: 'reports', isPlainText: true },
        { icon: <FaCog />, text: 'Settings', id: 'settings' }
    ];

    const toggleSidebar = () => setIsCollapsed((c) => !c);

    return (
        <>
            {/* Bootstrap CDN */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />

            {/* Sidebar */}
            <div
                className="sidebar position-fixed top-0 start-0 text-white"
                style={{
                    width: isMobile
                        ? (isCollapsed ? '0px' : `${SIDEBAR_WIDTH}px`)
                        : (isCollapsed ? `${SIDEBAR_COLLAPSED_WIDTH}px` : `${SIDEBAR_WIDTH}px`),
                    height: '100vh',
                    zIndex: 1100,
                    transition: 'width 0.3s',
                    overflow: 'hidden',
                    backgroundColor: '#2c120a',
                    left: 0,
                    boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
                }}
            >
                {/* Sidebar Content */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: isMobile && isCollapsed ? 'none' : 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}
                >
                    {/* Header */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 border-bottom"
                        style={{ borderColor: '#ffffff80' }}
                    >
                        {!isCollapsed && (
                            <h4
                                className="text-white mb-0"
                                style={{
                                    fontSize: isMobile ? '18px' : '25px',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                ChocolateGST
                            </h4>
                        )}
                        <button
                            className="btn btn-link text-white p-1"
                            onClick={toggleSidebar}
                            style={{
                                fontSize: '16px',
                                textDecoration: 'none',
                                border: 'none',
                                background: 'none',
                                borderRadius: '4px',
                                width: '32px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: isCollapsed && !isMobile ? 'auto' : '0',
                                marginRight: isCollapsed && !isMobile ? 'auto' : '0'
                            }}
                            onMouseEnter={e => e.target.style.backgroundColor = '#4a2f1a'}
                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                        >
                            {isMobile ? (isCollapsed ? '☰' : '✕') : (isCollapsed ? '❯' : '❮')}
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="mt-2"
                        style={{
                            overflowY: 'auto',
                            height: 'calc(100vh - 60px)'
                        }}>
                        {menuItems.map(item => (
                            <div
                                key={item.id}
                                className={`menu-item d-flex align-items-center px-3 py-3 position-relative${active === item.id ? ' active' : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontSize: isMobile ? '15px' : '18px',
                                    borderLeft: '3px solid transparent',
                                    minHeight: isMobile ? '45px' : '50px',
                                    justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                                    color: '#fff',
                                    ...(active === item.id
                                        ? {
                                            background: '#4a2a1c',
                                            color: '#fff',
                                            borderLeft: '3px solid #fff',
                                        }
                                        : {}
                                    )
                                }}
                                onMouseEnter={e => {
                                    if (active !== item.id) {
                                        e.currentTarget.style.backgroundColor = '#432417';
                                    }
                                    e.currentTarget.style.borderLeftColor = '#fff';
                                }}
                                onMouseLeave={e => {
                                    if (active !== item.id) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                    e.currentTarget.style.borderLeftColor = 'transparent';
                                }}
                                onClick={() => {
                                    setActive(item.id);
                                    if (isMobile) toggleSidebar(); // ✅ auto-close on mobile after click
                                }}
                            >
                                {!item.isPlainText && (
                                    <span
                                        style={{
                                            fontSize: isMobile ? '18px' : '20px',
                                            minWidth: '28px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                                            color: '#fff',
                                        }}>
                                        {item.icon}
                                    </span>
                                )}
                                <span
                                    style={{
                                        marginLeft: (isCollapsed && !isMobile) ? '0' : (item.isPlainText ? '0' : '12px'),
                                        whiteSpace: 'nowrap',
                                        opacity: (isCollapsed && !isMobile) ? 0 : 1,
                                        transition: 'opacity 0.3s ease',
                                        overflow: 'hidden',
                                        color: '#fff',
                                        fontWeight: active === item.id ? 'bold' : 'normal'
                                    }}
                                >
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ✅ Mobile Overlay (after sidebar to allow sidebar interaction) */}
            {isMobile && !isCollapsed && (
                <div
                    className="position-fixed w-100 h-100"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1099,
                        top: 0,
                        left: 0,
                    }}
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Hamburger Button */}
            {isMobile && isCollapsed && (
                <button
                    className="btn btn-dark position-fixed"
                    onClick={toggleSidebar}
                    style={{
                        top: '15px',
                        left: '15px',
                        zIndex: 1201,
                        width: '45px',
                        height: '45px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#3c2415',
                        fontSize: '18px'
                    }}
                >
                    ☰
                </button>
            )}

            <style>{`
                .menu-item:hover .tooltip-text {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                .menu-item:active {
                    background-color: #5a3520 !important;
                }
                .sidebar::-webkit-scrollbar {
                    width: 4px;
                }
                .sidebar::-webkit-scrollbar-track {
                    background: #2c1810;
                }
                .sidebar::-webkit-scrollbar-thumb {
                    background: #4a2f1a;
                    border-radius: 2px;
                }
                .sidebar::-webkit-scrollbar-thumb:hover {
                    background: #5a3520;
                }
                .sidebar * {
                    transition: all 0.3s ease;
                }
            `}</style>
        </>
    );
};

export default Sidebar;
