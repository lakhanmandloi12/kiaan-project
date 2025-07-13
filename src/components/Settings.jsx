import React, { useState } from "react";
import "./Settings.css"; // Custom styles
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const Settings = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    const [selected2FAMethod, setSelected2FAMethod] = useState("authApp");
    const [provider, setProvider] = useState("aws");

    const providers = [
        { id: "aws", name: "AWS", Icon: FaAws },
        { id: "azure", name: "Azure", Icon: VscAzure },
        { id: "gcp", name: "Google Cloud", Icon: SiGooglecloud },
    ];

    return (
        <div className="container-fluid py-4 px-4" style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
            <h2 className="fw-bold mb-2">System Settings</h2>
            <p className="text-muted mb-4">
                Configure global system settings to customize the behavior of your application.
                Changes made here will affect all users and services.
            </p>

            {/* Super Admin Settings */}
            <div className="bg-white rounded-4 p-4 shadow-sm">
                <h5 className="fw-semibold mb-4">Super Admin Settings</h5>
                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Business Name</label>
                        <input type="text" className="form-control" placeholder="Enter your business name" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold">Business Logo</label>
                        <div
                            className="border rounded-4 p-4 d-flex flex-column align-items-center justify-content-center text-center w-100"
                            style={{ minHeight: "170px", borderStyle: "dashed", backgroundColor: "#f7f7f7" }}
                        >
                            <p className="mb-1 fw-semibold">Upload a file</p>
                            <small className="text-muted mb-2">PNG, JPG, GIF up to 2MB</small>
                            <input type="file" className="form-control w-100" style={{ maxWidth: "280px" }} />
                        </div>
                    </div>
                </div>
                <div className="text-end mt-5">
                    <button className="btn btn-success px-4">Save Super Admin Settings</button>
                </div>
            </div>

            {/* Security Rules */}
            <div className="bg-white rounded-4 p-4 shadow-sm mt-5">
                <h5 className="fw-semibold mb-4">Security Rules</h5>
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <h6 className="fw-semibold mb-3">Two-Factor Authentication (2FA)</h6>
                        <div className="form-check form-switch mb-3">
                            <input
                                className="form-check-input custom-switch"
                                type="checkbox"
                                id="2faToggle"
                                checked={is2FAEnabled}
                                onChange={() => setIs2FAEnabled(!is2FAEnabled)}
                            />
                            <label className="form-check-label fw-semibold text-warning" htmlFor="2faToggle">
                                Enable Two-Factor Authentication
                            </label>
                        </div>

                        {is2FAEnabled && (
                            <>
                                <p className="fw-semibold mb-2">Select 2FA method:</p>
                                {[
                                    { id: "authApp", label: "Authenticator app" },
                                    { id: "smsBased", label: "SMS-based" },
                                    { id: "emailBased", label: "Email-based" },
                                ].map((method) => (
                                    <div className="form-check mb-2" key={method.id}>
                                        <input
                                            className="form-check-input custom-radio"
                                            type="radio"
                                            name="2faMethod"
                                            id={method.id}
                                            value={method.id}
                                            checked={selected2FAMethod === method.id}
                                            onChange={(e) => setSelected2FAMethod(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={method.id}>{method.label}</label>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <h6 className="fw-semibold mb-3">Password Policy</h6>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Minimum Length</label>
                            <input type="number" className="form-control" defaultValue={8} />
                        </div>
                        {[
                            { id: "specialChar", label: "Require special character" },
                            { id: "requireNumber", label: "Require number" },
                            { id: "requireUpper", label: "Require uppercase letter" },
                        ].map((policy) => (
                            <div className="form-check mb-2" key={policy.id}>
                                <input className="form-check-input custom-check" type="checkbox" id={policy.id} defaultChecked />
                                <label className="form-check-label" htmlFor={policy.id}>{policy.label}</label>
                            </div>
                        ))}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Password Expiration (days)</label>
                            <input type="number" className="form-control" defaultValue={90} />
                            <small className="text-muted">Set to 0 for no expiration</small>
                        </div>
                    </div>
                </div>
                <div className="text-end mt-4">
                    <button className="btn btn-success px-4">Save Security Settings</button>
                </div>
            </div>

            {/* Cloud Settings */}
            <div className="bg-white rounded-4 p-4 shadow-sm mt-5">
                <h4 className="mb-4">Cloud Settings</h4>
                <div className="mb-3">
                    <label className="form-label fw-bold">Cloud Provider</label>
                    <div className="row g-3">
                        {providers.map(({ id, name, Icon }) => (
                            <div className="col-4" key={id}>
                                <div
                                    className={`border rounded p-3 text-center h-100 ${provider === id ? 'border-primary bg-light-subtle' : ''
                                        }`}
                                    onClick={() => setProvider(id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Icon size={36} className="mb-2" />
                                    <div>
                                        <input
                                            type="radio"
                                            name="provider"
                                            value={id}
                                            checked={provider === id}
                                            readOnly
                                            className="me-2"
                                        />
                                        <span className="fw-medium">{name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row g-3 mt-4">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Access Key ID</label>
                        <input type="text" className="form-control" placeholder="AWS Access Key" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">S3 Bucket</label>
                        <input type="text" className="form-control" placeholder="S3 Bucket" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Region</label>
                        <select className="form-select">
                            <option>Select AWS Region</option>
                            <option>us-east-1</option>
                            <option>us-west-2</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Service Endpoint</label>
                        <input type="text" className="form-control" placeholder="https://example.endpoint.com" />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-warning">Test Connection</button>
                    <button className="btn btn-success">Save Cloud Settings</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
