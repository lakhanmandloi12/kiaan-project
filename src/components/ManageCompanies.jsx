import React, { useState } from "react";
import {
    BsThreeDotsVertical,
    BsCalendarEvent,
    BsClock,
    BsCalendarWeek,
    BsPeopleFill,
    BsPersonPlusFill,
    BsBuildings,
    BsPlusCircle,
    BsPencilSquare,
    BsTrash,
    BsShieldLock,
    BsGear,
    BsSlashCircle
} from "react-icons/bs";
import "./ManageCompanies.css";

const initialCompanies = [
    {
        name: "Workdo",
        email: "company@example.com",
        plan: "Platinum",
        avatar: "https://i.ibb.co/2f7wxpv/image1.jpg",
        date: "2025-07-03",
        time: "10:30:44",
        expired: "Dec 18, 2025",
        counts: { calendar: 27, users: 6, members: 8 },
    },
    {
        name: "Murray Group",
        email: "iromaguera@gmail.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/4nKXmCRz/image2.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
    {
        name: "Larson LLC",
        email: "fgoldner@gmail.com",
        plan: "Platinum",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { calendar: 2, users: 1, members: 4 },
    },
    {
        name: "Abhishek Dwivedi",
        email: "abhishek@company.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/rL3qL71/image4.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
    {
        name: "Shiane Mcdowell",
        email: "xygux@mailinator.com",
        plan: "Gold",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "05:04:53",
        expired: "Apr 10, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
    {
        name: "Kylie Lawson",
        email: "kylie@lawsoncorp.com",
        plan: "Platinum",
        avatar: "https://i.ibb.co/9kcymv4q/image6.jpg",
        date: "2025-07-02",
        time: "08:20:10",
        expired: "May 30, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
    {
        name: "Delta Corp",
        email: "info@deltacorp.com",
        plan: "Silver",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-01",
        time: "11:50:33",
        expired: "Jun 11, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
    {
        name: "Nova Enterprises",
        email: "contact@novaent.com",
        plan: "Gold",
        avatar: "https://i.ibb.co/Pzr45DCB/image5.jpg",
        date: "2025-07-03",
        time: "09:10:00",
        expired: "May 25, 2025",
        counts: { calendar: 0, users: 0, members: 0 },
    },
];

const badgeColor = {
    Platinum: "success",
    Gold: "warning",
    Silver: "dark",
};

const ManageCompanies = () => {
    const [showModal, setShowModal] = useState(false);
    const [companies, setCompanies] = useState(initialCompanies);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editCompany, setEditCompany] = useState({ name: '', email: '' });
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [resetIndex, setResetIndex] = useState(null);
    const [newPassword, setNewPassword] = useState("");

    const toggleMenu = (index) => {
        setActiveMenuIndex(activeMenuIndex === index ? null : index);
    };
    const handleResetPassword = () => {
        // later integrate with API
        console.log("Password reset for:", companies[resetIndex].name, "=>", newPassword);
        setResetIndex(null);
        setNewPassword("");
    };
    const handleEdit = (index) => {
        setEditCompany({ ...companies[index] });
        setEditIndex(index);
        setActiveMenuIndex(null);
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
        setActiveMenuIndex(null);
    };

    const confirmDelete = () => {
        const updated = [...companies];
        updated.splice(deleteIndex, 1);
        setCompanies(updated);
        setDeleteIndex(null);
    };

    const saveChanges = () => {
        const updated = [...companies];
        updated[editIndex] = editCompany;
        setCompanies(updated);
        setEditIndex(null);
    };

    return (
        <div className="container-fluid py-4 px-4" style={{
            backgroundColor: "#f7f7f7", minHeight: "100vh"
        }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">
                    <BsBuildings className="me-2 text-warning" /> Manage Companies
                </h4>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    <BsPlusCircle className="me-1" /> Add Company
                </button>
            </div>

            <div className="row g-4">
                {companies.map((company, index) => (
                    <div className="col-lg-3 col-md-6" key={index}>
                        <div className="card shadow-sm rounded-4 p-3 border-0 h-100 card-hover position-relative">

                            {/* Header: Badge + Menu */}
                            <div className="d-flex justify-content-between align-items-start">
                                <span className={`badge bg-${badgeColor[company.plan]} mb-2`}>
                                    {company.plan}
                                </span>

                                <div className="dropdown-icon position-relative">
                                    <BsThreeDotsVertical
                                        className="text-muted"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => toggleMenu(index)}
                                    />
                                    {activeMenuIndex === index && (
                                        <div className="custom-dropdown shadow rounded-3">
                                            <div className="dropdown-item text-warning fw-semibold" onClick={() => handleEdit(index)}>
                                                <BsPencilSquare className="me-2" /> Edit
                                            </div>
                                            <div className="dropdown-item text-danger" onClick={() => handleDelete(index)}>
                                                <BsTrash className="me-2" /> Delete
                                            </div>
                                            <div className="dropdown-item">
                                                <BsShieldLock className="me-2" /> Login As Company
                                            </div>
                                            <div className="dropdown-item" onClick={() => setResetIndex(index)}>
                                                <BsGear className="me-2" /> Reset Password
                                            </div>
                                            <hr className="my-1" />
                                            <div className="dropdown-item text-danger">
                                                <BsSlashCircle className="me-2" /> Login Disable
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Avatar & Info */}
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <img
                                    src={company.avatar}
                                    alt={company.name}
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                />
                                <div>
                                    <h6 className="mb-0 fw-semibold">{company.name}</h6>
                                    <small className="text-muted">{company.email}</small>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="d-flex justify-content-between text-muted small mb-2">
                                <span><BsCalendarEvent className="me-1 text-danger" />{company.date}</span>
                                <span><BsClock className="me-1 text-primary" />{company.time}</span>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex gap-2 mb-0 mt-2">
                                <button className="btn btn-success btn-sm w-100">Upgrade Plan</button>
                                <button className="btn btn-success btn-sm w-100">Admin Hub</button>
                            </div>

                            {/* Expiry */}
                            <p className="text-center small mb-2 mt-4" style={{ fontSize: "17px" }}>
                                Plan Expired : {company.expired}
                            </p>

                            {/* Counts */}
                            <div className="d-flex justify-content-between mt-5">
                                <span className="badge bg-danger"><BsCalendarWeek className="me-1" />{company.counts.calendar}</span>
                                <span className="badge bg-warning text-dark"><BsPeopleFill className="me-1" />{company.counts.users}</span>
                                <span className="badge bg-info text-dark"><BsPersonPlusFill className="me-1" />{company.counts.members}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal (same as before) */}
            {
                showModal && (
                    <div className="modal d-flex align-items-center justify-content-center" style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1050
                    }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content rounded-4 p-3 position-relative">
                                <button type="button" className="btn btn-sm btn-danger rounded-circle position-absolute"
                                    style={{
                                        width: "35px", height: "35px", top: "10px", right: "10px", zIndex: 10
                                    }}
                                    onClick={() => setShowModal(false)}
                                >✕</button>

                                <div className="modal-header border-0 pt-3 pb-1">
                                    <h5 className="modal-title fw-bold">Create Company</h5>
                                </div>

                                <div className="modal-body pt-1">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" placeholder="Enter Company Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input type="email" className="form-control" value="superadmin@example.com" readOnly />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <label className="form-check-label me-2 fw-semibold">Login is enable</label>
                                            <div className="form-check form-switch d-inline-block">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer border-top-0 pt-3">
                                    <button className="btn btn-dark px-4" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-success px-4">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {editIndex !== null && (
                <div
                    className="modal d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 position-relative">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger rounded-circle position-absolute"
                                style={{ width: "35px", height: "35px", top: "10px", right: "10px" }}
                                onClick={() => setEditIndex(null)}
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="modal-header border-0 pt-3 pb-1">
                                <h5 className="modal-title fw-bold">Edit Company</h5>
                            </div>

                            {/* Form Body */}
                            <div className="modal-body pt-1">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Company Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editCompany.name}
                                            onChange={(e) =>
                                                setEditCompany({ ...editCompany, name: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={editCompany.email}
                                            onChange={(e) =>
                                                setEditCompany({ ...editCompany, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-top-0 pt-3">
                                <button className="btn btn-dark px-4" onClick={() => setEditIndex(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-warning px-4 text-white" onClick={saveChanges}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteIndex !== null && (
                <div className="modal d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1050 }}>
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 text-center">
                            <p className="fw-semibold fs-5 mb-4">Are you sure you want to delete this?</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-dark px-4" onClick={() => setDeleteIndex(null)}>Cancel</button>
                                <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {resetIndex !== null && (
                <div
                    className="modal d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 1050,
                    }}
                >
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content rounded-4 p-4 position-relative">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="btn btn-sm btn-danger rounded-circle position-absolute"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    top: "10px",
                                    right: "10px",
                                }}
                                onClick={() => setResetIndex(null)}
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="modal-header border-0 pb-1 pt-3">
                                <h5 className="modal-title fw-bold">Reset Password</h5>
                            </div>

                            {/* Body */}
                            <div className="modal-body pt-0">
                                <p className="mb-3">
                                    Set a new password for <strong>{companies[resetIndex].name}</strong>
                                </p>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            {/* Footer */}
                            <div className="modal-footer border-top-0 pt-3">
                                <button className="btn btn-dark px-4" onClick={() => setResetIndex(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success px-4" onClick={handleResetPassword}>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
};

export default ManageCompanies;
