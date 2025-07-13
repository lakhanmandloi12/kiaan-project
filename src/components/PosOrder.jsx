import React, { useState } from 'react';
import {
    Form,
    Dropdown,
    DropdownButton,
    Table,
    Badge,
    Button,
    Modal,
    Row,
    Col
} from 'react-bootstrap';
import {
    FaFilePdf,
    FaFileExcel,
    FaPlusCircle,
    FaSearch,
    FaEllipsisV,
    FaEye,
    FaEdit,
    FaDollarSign,
    FaPlus,
    FaTrash,
    FaPrint
} from 'react-icons/fa';
import './PosOrder.css';
import SaleDetailModal from './SaleDetailModal';

const sampleOrders = [
    {
        id: 1,
        name: 'Carl Evans',
        reference: 'SL001',
        date: '24 Dec 2024',
        status: 'Completed',
        total: 1000,
        paid: 1000,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        id: 2,
        name: 'Daniel Jude',
        reference: 'SL007',
        date: '06 Apr 2023',
        status: 'Completed',
        total: 1300,
        paid: 1300,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        id: 3,
        name: 'Emma Bates',
        reference: 'SL008',
        date: '16 Apr 2023',
        status: 'Completed',
        total: 1100,
        paid: 1100,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        id: 4,
        name: 'Mark Joslyn',
        reference: 'SL005',
        date: '17 Mar 2023',
        status: 'Completed',
        total: 800,
        paid: 800,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        id: 5,
        name: 'Marsha Betts',
        reference: 'SL006',
        date: '24 Mar 2023',
        status: 'Pending',
        total: 750,
        paid: 0,
        due: 750,
        paymentStatus: 'Unpaid',
    },
    {
        id: 6,
        name: 'Michelle Robison',
        reference: 'SL010',
        date: '29 May 2023',
        status: 'Pending',
        total: 1700,
        paid: 1700,
        due: 0,
        paymentStatus: 'Paid',
    },
    {
        id: 7,
        name: 'Minerva Rameriz',
        reference: 'SL002',
        date: '10 Dec 2024',
        status: 'Pending',
        total: 1500,
        paid: 0,
        due: 1500,
        paymentStatus: 'Unpaid',
    },
];
const PosOrder = () => {
    const [orders, setOrders] = useState(sampleOrders);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSaleDetail, setShowSaleDetail] = useState(false);
    const [showEditSales, setShowEditSales] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [showEditPayment, setShowEditPayment] = useState(false);
    const [showCreatePayment, setShowCreatePayment] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        date: new Date().toISOString().split('T')[0],
        supplier: '',
        product: '',
        orderTax: 0,
        discount: 0,
        shipping: 0,
        status: ''
    });
    const [actionMenuId, setActionMenuId] = useState(null);
    const [newCustomer, setNewCustomer] = useState("");
    // Edit Sales Modal product state and handlers
    const [editSaleProducts, setEditSaleProducts] = useState([
        { img: require('../assests/p1.png'), name: 'Nike', qty: 0, price: 2000, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 1500 },
        { img: require('../assests/p2.png'), name: 'Apple', qty: 2, price: 3000, discount: 400, tax: 0, taxAmount: 0, unitCost: 0, total: 1700 },
        { img: require('../assests/p3.png'), name: 'Lobar', qty: 2, price: 2500, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 2000 },
    ]);
    const handleEditQty = (idx, delta) => {
        setEditSaleProducts(prev => prev.map((p, i) => i === idx ? { ...p, qty: Math.max(0, p.qty + delta) } : p));
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(orders.map((o) => o.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add Customer button handler
    const handleAddCustomerClick = () => {
        setShowModal(false); // Hide Add Sales modal
        setTimeout(() => setShowAddCustomer(true), 300); // Show Add Customer modal after a short delay for smooth transition
    };

    return (
        <div className="container-fluid py-4 px-4" style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <div>
                    <h5 className="fw-semibold mb-1">POS Orders</h5>
                    <p className="text-muted small mb-0">Manage Your pos orders</p>
                </div>
                <div className="d-flex gap-2 mt-3 mt-md-0">
                    <Button variant="outline-danger">
                        <FaFilePdf />
                    </Button>
                    <Button variant="outline-success">
                        <FaFileExcel />
                    </Button>
                    <Button variant="warning" className="text-white fw-semibold d-flex align-items-center" style={{ backgroundColor: "#fe9f43" }} onClick={() => setShowModal(true)}>
                        <FaPlusCircle className="me-1" /> Add Sales
                    </Button>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3 bg-white p-3 rounded shadow-sm">
                <div className="position-relative" style={{ maxWidth: '280px' }}>
                    <Form.Control type="text" placeholder="Search" className="ps-5 rounded-pill shadow-sm" />
                    <FaSearch className="position-absolute text-muted" style={{ top: '50%', left: '15px', transform: 'translateY(-50%)' }} />
                </div>
                <div className="d-flex flex-wrap gap-2">
                    <DropdownButton variant="custom-yellow" className="custom-filter-btn" title="Customer">
                        <Dropdown.Item className="custom-dropdown-item active">Carl Evans</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Minerva Rameriz</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Robert Lamon</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Patricia Lewis</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant="custom-yellow" className="custom-filter-btn" title="Status">
                        <Dropdown.Item className="custom-dropdown-item">Completed</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Pending</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant="custom-yellow" className="custom-filter-btn" title="Payment Status">
                        <Dropdown.Item className="custom-dropdown-item">Paid</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Unpaid</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant="custom-yellow" className="custom-filter-btn" title="Sort By : Last 7 Days">
                        <Dropdown.Item className="custom-dropdown-item">Today</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item">Last 30 Days</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            {/* Table */}
            <div className="table-responsive shadow-sm rounded bg-white">
                <Table hover className="align-middle mb-0">
                    <thead className="table-light text-white">
                        <tr>
                            <th>
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === orders.length}
                                        onChange={handleSelectAll}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>
                            <th>Customer</th>
                            <th>Reference</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Grand Total</th>
                            <th>Paid</th>
                            <th>Due</th>
                            <th>Payment Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className={selectedRows.includes(order.id) ? 'selected-row' : ''} style={{ position: 'relative' }}>
                                <td>
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(order.id)}
                                            onChange={() => handleSelectRow(order.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="placeholder-avatar bg-secondary rounded" />
                                        <span>{order.name}</span>
                                    </div>
                                </td>
                                <td>{order.reference}</td>
                                <td>{order.date}</td>
                                <td>
                                    <Badge bg={order.status === 'Completed' ? 'success' : 'info'}>
                                        {order.status}
                                    </Badge>
                                </td>
                                <td>${order.total}</td>
                                <td>${order.paid}</td>
                                <td>${order.due.toFixed(2)}</td>
                                <td>
                                    <Badge className={`badge-dot ${order.paymentStatus === 'Paid' ? 'text-success' : 'text-danger'}`} bg="light">
                                        {order.paymentStatus}
                                    </Badge>
                                </td>
                                <td style={{ position: 'relative' }}>
                                    <FaEllipsisV className="text-muted" style={{ cursor: 'pointer' }} onClick={() => setActionMenuId(actionMenuId === order.id ? null : order.id)} />
                                    {actionMenuId === order.id && (
                                        <div className="posorder-action-menu">
                                            <button className="action-item" onClick={() => { setShowSaleDetail(true); setActionMenuId(null); }}><FaEye /> Sale Detail</button>
                                            <button className="action-item" onClick={() => { setShowEditSales(true); setActionMenuId(null); }}><FaEdit /> Edit Sale</button>
                                            <button className="action-item" onClick={() => { setShowPayments(true); setActionMenuId(null); }}><FaDollarSign /> Show Payments</button>
                                            <button className="action-item" onClick={() => { setShowCreatePayment(true); setActionMenuId(null); }}><FaPlus /> Create Payment</button>
                                            <button className="action-item" onClick={() => setActionMenuId(null)}><FaFilePdf /> Download pdf</button>
                                            <button className="action-item" onClick={() => setActionMenuId(null)}><FaTrash /> Delete Sale</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Footer Pagination */}
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3 px-2 bg-white py-2 rounded-bottom">
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted">Row Per Page</span>
                    <select className="form-select rounded-3 custom-page-select">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <span className="text-muted">Entries</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary btn-sm">❮</button>
                    <button className="btn btn-warning text-white btn-sm">1</button>
                    <button className="btn btn-outline-secondary btn-sm">❯</button>
                </div>
            </div>

            {/* Add Sales Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered dialogClassName="add-sales-modal">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold" style={{ fontSize: '1.5rem' }}>Add Sales</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    {/* Table Header */}
                    <div className="bg-light rounded mb-3 px-2 px-md-4 py-2" style={{ overflowX: 'auto' }}>
                        <div className="d-flex flex-nowrap align-items-center fw-semibold" style={{ minWidth: '900px' }}>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Product</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Qty</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '150px' }}>Purchase Price($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Discount($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Tax(%)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Tax Amount($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Unit Cost($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Total Cost(%)</div>
                        </div>
                    </div>
                    {/* Form Fields */}
                    <Form>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Customer Name <span className="text-danger">*</span></Form.Label>
                                <div className="d-flex align-items-center gap-2">
                                    <Form.Select
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className="custom-select-theme"
                                    >
                                        <option className="custom-option-theme">Select</option>
                                        <option className="custom-option-theme">Carl Evans</option>
                                        <option className="custom-option-theme">Minerva Rameriz</option>
                                        <option className="custom-option-theme">Robert Lamon</option>
                                    </Form.Select>
                                    <Button variant="primary" style={{ background: '#17294d', border: 'none', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleAddCustomerClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </Button>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Choose" />
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Supplier <span className="text-danger">*</span></Form.Label>
                                <Form.Select name="supplier" value={formData.supplier} onChange={handleChange}>
                                    <option>Select</option>
                                    <option>ABC Supplier</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label className="fw-semibold">Product <span className="text-danger">*</span></Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control type="text" placeholder="Please type product code and select" name="product" value={formData.product} onChange={handleChange} />
                                    <Button variant="outline-warning" className="ms-2 d-flex align-items-center" style={{ borderColor: '#fe9f43', color: '#fe9f43', fontWeight: 600 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-upc-scan me-1" viewBox="0 0 16 16">
                                            <path d="M1.5 1a.5.5 0 0 1 .5.5V3h1V1.5A1.5 1.5 0 0 0 1.5 0H0v2a.5.5 0 0 0 1 0V1h.5zm13 0a.5.5 0 0 1 .5.5V3h1V1.5A1.5 1.5 0 0 0 14.5 0H13v2a.5.5 0 0 0 1 0V1h.5zM1 13v1.5A1.5 1.5 0 0 0 2.5 16H4v-2a.5.5 0 0 0-1 0v1H2.5a.5.5 0 0 1-.5-.5V13H1zm14 0v1.5a.5.5 0 0 1-.5.5H12v-2a.5.5 0 0 0-1 0v2h1.5A1.5 1.5 0 0 0 16 14.5V13h-1zM3 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zm2 0v8h1V4H5zm2 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4zm2 0v8h1V4h-1zm2 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4zm2 0v8h1V4h-1z" />
                                        </svg>
                                    
                                    </Button>
                                </div>
                            </Col>

                        </Row>
                        <Row className="mb-4">
                            <Col md={7} xs={12}></Col>
                            <Col md={5} xs={12}>
                                <div className="border rounded bg-light p-3" style={{ fontSize: '15px' }}>
                                    <Table borderless size="sm" className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Order Tax</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Discount</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr className="fw-bold">
                                                <td>Grand Total</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 mb-2">
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Order Tax <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" name="orderTax" value={formData.orderTax} onChange={handleChange} />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Discount <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" name="discount" value={formData.discount} onChange={handleChange} />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Shipping <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" name="shipping" value={formData.shipping} onChange={handleChange} />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Status <span className="text-danger">*</span></Form.Label>
                                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                                    <option>Select</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
                    <Button className="btn-modal-cancel" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className="btn-modal-submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Sale Modal */}
            <Modal show={showEditSales} onHide={() => setShowEditSales(false)} size="xl" centered dialogClassName="edit-sales-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Sales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Table Header */}
                    <div className="bg-light rounded mb-3 px-2 px-md-4 py-2" style={{ overflowX: 'auto' }}>
                        <div className="d-flex flex-nowrap align-items-center fw-semibold" style={{ minWidth: '900px' }}>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Product</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Qty</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '150px' }}>Purchase Price($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Discount($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Tax(%)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Tax Amount($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Unit Cost($)</div>
                            <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Total Cost(%)</div>
                        </div>
                    </div>
                    {/* Product Rows */}
                    <div className="bg-white mb-3">
                        {editSaleProducts.map((p, idx) => (
                            <div className="d-flex flex-nowrap align-items-center mb-2" style={{ minWidth: '900px', gap: '0.5rem' }} key={p.name}>
                                <div className="px-2 flex-fill d-flex align-items-center gap-2" style={{ minWidth: '120px' }}>
                                    <img src={p.img} alt={p.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
                                    <span>{p.name}</span>
                                </div>
                                <div className="px-2 flex-fill d-flex align-items-center justify-content-center" style={{ minWidth: '80px', gap: '0.25rem' }}>
                                    <Button variant="outline-dark" size="sm" className="qty-btn" onClick={() => handleEditQty(idx, 1)}><span style={{ fontWeight: 700, fontSize: 18 }}>+</span></Button>
                                    <span className="qty-value">{p.qty}</span>
                                    <Button variant="outline-dark" size="sm" className="qty-btn" onClick={() => handleEditQty(idx, -1)}><span style={{ fontWeight: 700, fontSize: 18 }}>-</span></Button>
                                </div>
                                <div className="px-2 flex-fill" style={{ minWidth: '150px' }}>{p.price}</div>
                                <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.discount}</div>
                                <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>{p.tax.toFixed(2)}</div>
                                <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.taxAmount.toFixed(2)}</div>
                                <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.unitCost.toFixed(2)}</div>
                                <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.total}</div>
                            </div>
                        ))}
                    </div>
                    <Form>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Customer Name <span className="text-danger">*</span></Form.Label>
                                <div className="d-flex align-items-center gap-2">
                                    <Form.Select className="custom-select-theme">
                                        <option>Carl Evans</option>
                                        <option>Minerva Rameriz</option>
                                        <option>Robert Lamon</option>
                                    </Form.Select>
                                    <Button variant="primary" style={{ background: '#17294d', border: 'none', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAddCustomer(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </Button>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" value="2023-01-19" />
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Supplier <span className="text-danger">*</span></Form.Label>
                                <Form.Select className="custom-select-theme">
                                    <option>Apex Computers</option>
                                    <option>ABC Supplier</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label className="fw-semibold">Product Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" placeholder="Please type product code and select" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={7} xs={12}></Col>
                            <Col md={5} xs={12}>
                                <div className="border rounded bg-light p-3" style={{ fontSize: '15px' }}>
                                    <Table borderless size="sm" className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Order Tax</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Discount</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td className="text-end">$ 0.00</td>
                                            </tr>
                                            <tr className="fw-bold">
                                                <td>Grand Total</td>
                                                <td className="text-end">$ 5200.00</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 mb-2">
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Order Tax <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" value="0" />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Discount <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" value="0" />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Shipping <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="number" value="0" />
                            </Col>
                            <Col md={3} xs={12}>
                                <Form.Label className="fw-semibold">Status <span className="text-danger">*</span></Form.Label>
                                <Form.Select className="custom-select-theme">
                                    <option>Select</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label className="fw-semibold">Notes</Form.Label>
                                <Form.Control as="textarea" rows={2} />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
                    <Button className="btn-modal-cancel" onClick={() => setShowEditSales(false)}>
                        Cancel
                    </Button>
                    <Button className="btn-modal-submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Show Payments Modal */}
            <Modal show={showPayments} onHide={() => setShowPayments(false)} centered size="md" dialogClassName="show-payments-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Show Payments</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowX: 'auto' }}>
                    <div className="table-responsive mb-2">
                        <Table bordered className="mb-0 text-center">
                            <thead style={{ background: '#f3f4f6' }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Reference</th>
                                    <th>Amount</th>
                                    <th>Paid By</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>19 Jan 2023</td>
                                    <td>INV/SL0101</td>
                                    <td>$1500</td>
                                    <td>Cash</td>
                                    <td>
                                        <Button variant="outline-light" size="sm" className="p-1 mx-1"><FaPrint /></Button>
                                        <Button variant="outline-light" size="sm" className="p-1 mx-1" onClick={() => { setShowEditPayment(true); setShowPayments(false); }}><FaEdit /></Button>
                                        <Button variant="outline-light" size="sm" className="p-1 mx-1"><FaTrash /></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </Modal.Body>
            </Modal>

            {/* Edit Payment Modal */}
            <Modal show={showEditPayment} onHide={() => setShowEditPayment(false)} centered size="lg" dialogClassName="edit-payment-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Payments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Reference <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" defaultValue="INV/SL0101" />
                            </Col>
                        </Row>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Received Amount <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control type="number" defaultValue="1500" />
                                    <span className="input-group-text">$</span>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Paying Amount <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control type="number" defaultValue="1500" />
                                    <span className="input-group-text">$</span>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Payment type <span className="text-danger">*</span></Form.Label>
                                <Form.Select defaultValue="Cash">
                                    <option>Cash</option>
                                    <option>Card</option>
                                    <option>Bank</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label className="fw-semibold">Description</Form.Label>
                                {/* Placeholder for rich text editor, using textarea for now */}
                                <div className="border rounded mb-1 p-2" style={{ background: '#fafbfc' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Button size="sm" variant="light" className="border"><b>B</b></Button>
                                        <Button size="sm" variant="light" className="border"><u>U</u></Button>
                                        <Button size="sm" variant="light" className="border"><i>I</i></Button>
                                        <Button size="sm" variant="light" className="border">A</Button>
                                        <Button size="sm" variant="light" className="border">•</Button>
                                        <Button size="sm" variant="light" className="border">1.</Button>
                                        <Button size="sm" variant="light" className="border">Link</Button>
                                    </div>
                                    <Form.Control as="textarea" rows={4} maxLength={60} placeholder="Description..." />
                                </div>
                                <div className="text-muted small">Maximum 60 Characters</div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
                    <Button className="btn-modal-cancel" onClick={() => setShowEditPayment(false)}>
                        Cancel
                    </Button>
                    <Button className="btn-modal-submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create Payment Modal */}
            <Modal show={showCreatePayment} onHide={() => setShowCreatePayment(false)} centered size="lg" dialogClassName="edit-payment-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Create Payments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" placeholder="Choose Date" />
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Reference <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Row>
                        <Row className="g-3 mb-3">
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Received Amount <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control type="number" placeholder="$" />
                                    <span className="input-group-text">$</span>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Paying Amount <span className="text-danger">*</span></Form.Label>
                                <div className="input-group">
                                    <Form.Control type="number" placeholder="$" />
                                    <span className="input-group-text">$</span>
                                </div>
                            </Col>
                            <Col md={4} xs={12}>
                                <Form.Label className="fw-semibold">Payment type <span className="text-danger">*</span></Form.Label>
                                <Form.Select defaultValue="Select">
                                    <option>Select</option>
                                    <option>Cash</option>
                                    <option>Card</option>
                                    <option>Bank</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Form.Label className="fw-semibold">Description</Form.Label>
                                {/* Placeholder for rich text editor, using textarea for now */}
                                <div className="border rounded mb-1 p-2" style={{ background: '#fafbfc' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Button size="sm" variant="light" className="border"><b>B</b></Button>
                                        <Button size="sm" variant="light" className="border"><u>U</u></Button>
                                        <Button size="sm" variant="light" className="border"><i>I</i></Button>
                                        <Button size="sm" variant="light" className="border">A</Button>
                                        <Button size="sm" variant="light" className="border">•</Button>
                                        <Button size="sm" variant="light" className="border">1.</Button>
                                        <Button size="sm" variant="light" className="border">Link</Button>
                                    </div>
                                    <Form.Control as="textarea" rows={6} maxLength={60} placeholder="Description..." />
                                </div>
                                <div className="text-muted small">Maximum 60 Characters</div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
                    <Button className="btn-modal-cancel" onClick={() => setShowCreatePayment(false)}>
                        Cancel
                    </Button>
                    <Button className="btn-modal-submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Customer Modal (shared) */}
            <Modal show={showAddCustomer} onHide={() => setShowAddCustomer(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter customer name"
                                value={newCustomer}
                                onChange={e => setNewCustomer(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-modal-cancel" onClick={() => setShowAddCustomer(false)}>
                        Cancel
                    </Button>
                    <Button className="btn-modal-submit" onClick={() => setShowAddCustomer(false)}>
                        Add Customer
                    </Button>
                </Modal.Footer>
            </Modal>

            <SaleDetailModal show={showSaleDetail} onHide={() => setShowSaleDetail(false)} />

        </div>
    );
};

export default PosOrder;