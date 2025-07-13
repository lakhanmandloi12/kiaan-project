import React, { useState } from "react";
import RolePermissions from "./rolePermissions";
import SubscriptionPlan from "./SubscriptionPlan";

const SettingsTabs = () => {
    const [activeTab, setActiveTab] = useState("role");

    const renderContent = () => {
        switch (activeTab) {
            case "role":
                return <div><RolePermissions /></div>;
            case "subscription":
                return <div><SubscriptionPlan/></div>;
            case "languages":
                return <div>{/* Languages Component */}</div>;
            case "whatsapp":
                return <div>{/* WhatsAppSmsConfig Component */}</div>;
            default:
                return null;
        }
    };

    const getTabClasses = (tabKey) =>
        `nav-link d-flex align-items-center gap-2 px-3 py-2 fs-6 border-0 border-bottom
    ${activeTab === tabKey
            ? "border-3 border-danger text-danger fw-semibold"
            : "text-secondary border-bottom"}`;

    return (
        <div className="w-100 bg-white">

            {/* Breadcrumb */}
            <div className="px-4 py-2" style={{ backgroundColor: "#fff7f1" }}>
                <span className="text-muted">Home</span>
                <span className="mx-1 text-muted">/</span>
                <span className="fw-semibold text-dark">Settings</span>
                <span className="mx-1 text-muted">/</span>
                <span className="fw-bold text-dark">
                    {activeTab === "role" ? "Role Permissions"
                        : activeTab === "subscription" ? "Subscription Plan"
                            : activeTab === "languages" ? "Languages"
                                : "WhatsApp/SMS Config"}
                </span>
            </div>

            {/* Tabs */}
            <ul className="nav px-4 pt-2 border-bottom" style={{ backgroundColor: "#fff" }}>
                <li className="nav-item">
                    <button
                        className={getTabClasses("role")}
                        onClick={() => setActiveTab("role")}
                    >
                        <i className="bi bi-person-fill-gear fs-5"></i> Role Permissions
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={getTabClasses("subscription")}
                        onClick={() => setActiveTab("subscription")}
                    >
                        <i className="bi bi-award fs-5"></i> Subscription Plan
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={getTabClasses("languages")}
                        onClick={() => setActiveTab("languages")}
                    >
                        <i className="bi bi-translate fs-5"></i> Languages
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={getTabClasses("whatsapp")}
                        onClick={() => setActiveTab("whatsapp")}
                    >
                        <i className="bi bi-chat-dots fs-5"></i> WhatsApp/SMS Config
                    </button>
                </li>
            </ul>

            {/* Content */}
            <div className="p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default SettingsTabs;
