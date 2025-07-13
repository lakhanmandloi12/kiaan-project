import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPenToSquare, FaUsers, FaTrash } from 'react-icons/fa6'; // new FA6 icons


const RolePermissions = () => {
    const roles = [
        {
            name: "Admin",
            users: 2,
            permissions: ["Full Access"],
            date: "2025-06-25",
        },
        {
            name: "Manager",
            users: 3,
            permissions: ["View", "Create", "Edit"],
            date: "2025-06-24",
        },
        {
            name: "Accountant",
            users: 4,
            permissions: ["View", "Create"],
            date: "2025-06-23",
        },
        {
            name: "Sales Executive",
            users: 2,
            permissions: ["View", "Create"],
            date: "2025-06-22",
        },
        {
            name: "Viewer",
            users: 1,
            permissions: ["View"],
            date: "2025-06-21",
        },
    ];

    const stats = [
        { label: "Total Sales", value: "₹8,75,000", icon: "bi-currency-rupee" },
        { label: "Total Purchase", value: "₹6,25,000", icon: "bi-cart-check" },
        { label: "Tax Liability", value: "₹45,000", icon: "bi-receipt" },
        { label: "Stock Value", value: "₹12,50,000", icon: "bi-bar-chart" },
    ];

    return (
        <div className="p-4" style={{ backgroundColor: "" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Settings</h5>
                <button className="btn btn-dark" style={{ backgroundColor: '#2c120a' }}>
                    <i className="bi bi-save me-2"></i>Save Changes
                </button>
            </div>

            {/* Info Boxes */}

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="rounded p-3 d-flex justify-content-between align-items-center shadow-sm" style={{ background: "#fdf4ee" }} >
                        <div >
                            <div className="text-muted">Total Roles</div>
                            <div className="fw-bold fs-4">5</div>

                        </div>
                        <i className="bi bi-person-fill-gear fs-3 text-brown"></i>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className=" rounded p-3 d-flex justify-content-between align-items-center shadow-sm" style={{ background: "#fdf4ee" }}>
                        <div>
                            <div className="text-muted">Active Users</div>
                            <div className="fw-bold fs-4">12</div>
                        </div>
                        <i className="bi bi-person-fill fs-3 text-brown"></i>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className=" rounded p-3 d-flex justify-content-between align-items-center shadow-sm" style={{ background: "#fdf4ee" }}>
                        <div>
                            <div className="text-muted">Pending Invites</div>
                            <div className="fw-bold fs-4">3</div>
                        </div>
                        <i className="bi bi-person-plus fs-3 text-brown"></i>
                    </div>
                </div>
            </div>

            {/* Roles Table */}
            <div className="bg-white rounded shadow-sm p-3 mb-4" >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 fw-semibold">Roles & Permissions</h6>
                    <button className="btn btn-dark" style={{ backgroundColor: '#2c120a' }}>
                        <i className="bi bi-plus me-1"></i>Add Role
                    </button>
                </div>
                <div className="table-responsive" >
                    <table className="table align-middle" >
                        <thead className="table-light" >
                            <tr>
                                <th style={{ background: "#fdf4ee" }}>Role Name</th>
                                <th style={{ background: "#fdf4ee" }}>Users</th>
                                <th style={{ background: "#fdf4ee" }}>Permissions</th>
                                <th style={{ background: "#fdf4ee" }}>Last Modified</th>
                                <th style={{ background: "#fdf4ee" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, index) => (
                                <tr key={index}>
                                    <td>{role.name}</td>
                                    <td>{role.users}</td>
                                    <td>
                                        {role.permissions.map((perm, i) => (
                                            <span key={i} className="badge bg-light text-dark me-1">
                                                {perm}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{role.date}</td>
                                    <td>
                                        <FaPenToSquare className="me-2 cursor-pointer" style={{ background: "#fdf4ee" }} />
                                        <FaUsers className="me-2 cursor-pointer" style={{ background: "#fdf4ee" }} />
                                        <FaTrash className="text-danger cursor-pointer" />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3" >
                {stats.map((item, i) => (
                    <div key={i} className="col-12 col-md-3" >
                        <div className=" rounded p-3 d-flex justify-content-between align-items-center shadow-sm" style={{ background: "#fdf4ee" }}>
                            <div>
                                <div className="text-muted small">{item.label}</div>
                                <div className="fw-bold fs-5">{item.value}</div>
                            </div>
                            <i className={`bi ${item.icon} fs-3 text-brown`}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RolePermissions;
