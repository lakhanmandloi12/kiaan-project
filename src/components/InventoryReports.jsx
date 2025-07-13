import React, { useState } from 'react';
import { FaFileAlt, FaTable, FaFilter, FaDownload } from 'react-icons/fa';
import { BiCategoryAlt, BiCube, BiGrid } from 'react-icons/bi';

const InventoryReports = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [dateRange, setDateRange] = useState({
        start: '2023-07-03',
        end: '2025-07-04'
    });

    const inventoryData = [
        { id: 'PTO01', name: 'London IdeaPad 3', category: 'Computant', units: 'PC', methods: 100 },
        { id: 'PTO02', name: 'Blade Pro', category: 'Electronics', units: 'PC', methods: 140 },
        { id: 'PTO03', name: 'Nike Jordan', category: 'Slide', units: 'BL', methods: 300 },
        { id: 'PTO04', name: 'Apple Series 5 Vision', category: 'Electronics', units: 'PC', methods: 400 },
        { id: 'PTO05', name: 'Amazon Eco-Dot', category: 'Electronics', units: 'PC', methods: 320 },
        { id: 'PTO06', name: 'Sarkind Quiz Scale', category: 'Furniture', units: 'PC', methods: 600 },
        { id: 'PTO07', name: 'Red Premium Subinki', category: 'Bugs', units: 'BL', methods: 700 },
        { id: 'PTO08', name: 'Ishere 1.4 Pro', category: 'Phone', units: 'BL', methods: 630 },
        { id: 'PTO09', name: 'Gaming Quiz', category: 'Furniture', units: 'PC', methods: 410 },
        { id: 'PTO10', name: 'Brenda Baiqpack', category: 'Bugs', units: 'BL', methods: 500 }
    ];

    return (
        <div className="container-fluid py-4">
            {/* Bootstrap CSS */}
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                rel="stylesheet"
            />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0" style={{ fontWeight: '600', color: '#212529' }}>
                    <FaFileAlt className="me-2" />
                    Inventory
                </h1>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary me-2">
                        <FaDownload className="me-1" />
                        Export
                    </button>
                    <button className="btn btn-primary">
                        <FaFilter className="me-1" />
                        Filter
                    </button>
                </div>
            </div>

            <p className="text-muted mb-4">View Reports of Inventory</p>

            {/* Date Range */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Create Data</h5>
                    <div className="d-flex align-items-center">
                        <input
                            type="date"
                            className="form-control me-2"
                            style={{ maxWidth: '200px' }}
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        />
                        <span className="mx-2">to</span>
                        <input
                            type="date"
                            className="form-control"
                            style={{ maxWidth: '200px' }}
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'customer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('customer')}
                    >
                        <BiCategoryAlt className="me-1" />
                        Customer Report
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <FaTable className="me-1" />
                        General Report
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'customer' && (
                    <div className="tab-pane fade show active">
                        <div className="row">
                            {/* SUI */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0">SUI</h6>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {inventoryData.map(item => (
                                                <li key={item.id} className="list-group-item">{item.id}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Product Name */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0">Product Name</h6>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {inventoryData.map(item => (
                                                <li key={item.id} className="list-group-item">{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0">Category</h6>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {inventoryData.map(item => (
                                                <li key={item.id} className="list-group-item">{item.category}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Units */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100">
                                    <div className="card-header bg-light">
                                        <h6 className="mb-0">Units</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-center h-100">
                                            <span className="text-muted">All</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'general' && (
                    <div className="tab-pane fade show active">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th></th>
                                                <th>Category</th>
                                                <th>Units</th>
                                                <th>Methods</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryData.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.units}</td>
                                                    <td>{item.methods}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="extrichCheck"
                                        />
                                        <label className="form-check-label" htmlFor="extrichCheck">
                                            Extrich
                                        </label>
                                    </div>
                                    <div className="text-muted">
                                        Showing 1 to {inventoryData.length} of {inventoryData.length} entries
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryReports;