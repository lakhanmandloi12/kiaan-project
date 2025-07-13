import React from "react";
import { FaUsers, FaDatabase, FaRegClock } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

const SubscriptionPlan = () => {
    const plans = [
        {
            title: "Basic",
            price: "₹999",
            features: ["Basic Reports", "Email Support", "5 Users"],
            isCurrent: false,
        },
        {
            title: "Professional",
            price: "₹2999",
            features: ["Advanced Reports", "24/7 Support", "15 Users", "API Access"],
            isCurrent: true,
        },
        {
            title: "Enterprise",
            price: "₹5999",
            features: [
                "Custom Reports",
                "Dedicated Support",
                "Unlimited Users",
                "API Access",
                "Custom Integration",
            ],
            isCurrent: false,
        },
    ];

    return (
        <div className="p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Settings</h5>
                <button className="btn btn-dark" style={{ backgroundColor: '#2c120a' }}>
                    <i className="bi bi-save me-2"></i>Save Changes
                </button>
            </div>

            {/* Plan Info Card */}
            <div className="rounded p-4 shadow-sm mb-5" style={{ backgroundColor: "#fef7f2" }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                    <div>
                        <div className="fw-semibold fs-5 mb-1">Professional Plan</div>
                        <div className="text-muted small">Valid until: July 26, 2025</div>
                    </div>
                    <div className="text-end mt-3 mt-md-0">
                        <div className="fw-bold fs-4 text-dark">₹2,999</div>
                        <div className="text-muted small">per month</div>
                    </div>
                </div>

                <div className="row text-muted mb-3">
                    <div className="col-12 col-md-4 d-flex align-items-center mb-2">
                        <FaUsers className="me-2 text-dark" /> 15 Users
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center mb-2">
                        <FaDatabase className="me-2 text-dark" /> 50GB Storage
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center mb-2">
                        <FaRegClock className="me-2 text-dark" /> 24/7 Support
                    </div>
                </div>

                <div className="text-end">
                    <button className="btn btn-dark" style={{ backgroundColor: '#2c120a' }}>Upgrade Plan</button>
                </div>
            </div>

            {/* Available Plans */}
            <div>
                <h6 className="fw-bold mb-3">Available Plans</h6>
                <div className="row g-3">
                    {plans.map((plan, idx) => (
                        <div key={idx} className="col-12 col-md-4">
                            <div
                                className={`rounded border p-4 h-100 ${plan.isCurrent ? "bg-light border-dark" : "bg-white"
                                    }`}
                                style={{ backgroundColor: plan.isCurrent ? "#fdf4ee" : "white" }}
                            >
                                <h6 className="fw-bold mb-1">{plan.title}</h6>
                                <div className="fw-bold fs-4">{plan.price}</div>
                                <div className="text-muted small mb-3">per month</div>
                                <ul className="list-unstyled mb-4">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="mb-1">
                                            <span className="text-success me-1">✔</span> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`btn w-100 ${plan.isCurrent ? "btn-dark" : "btn-outline-dark"
                                        }`}
                                    disabled={plan.isCurrent}
                                >
                                    {plan.isCurrent ? "Current Plan" : "Select Plan"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlan;
