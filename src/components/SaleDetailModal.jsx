import React from 'react';
import { Modal, Button, Table, Row, Col, Badge } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';
import './PosOrder.css';

const SaleDetailModal = ({ show, onHide, order }) => {
    // Dummy data for demonstration
    const customer = {
        name: 'Carl Evans',
        address: '3103 Trainer Avenue Peoria, IL 61602',
        email: 'carl.evans241@example.com',
        phone: '+1 987 471 6589',
    };
    const company = {
        name: 'DGT',
        address: '2077 Chicago Avenue Orosi, CA 93647',
        email: 'admin@example.com',
        phone: '+1 893 174 0385',
    };
    const invoice = {
        reference: 'SL0101',
        date: 'Dec 24, 2024',
        status: 'Completed',
        paymentStatus: 'Paid',
    };
    const products = [
        { img: '/src/assests/p1.png', name: 'Nike Jordan', price: 2000, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 1500 },
        { img: '/src/assests/p2.png', name: 'Apple Series 5 Watch', price: 3000, discount: 400, tax: 0, taxAmount: 0, unitCost: 0, total: 1700 },
        { img: '/src/assests/p3.png', name: 'Lobar Handy', price: 2500, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 2000 },
    ];
    const summary = {
        orderTax: 0,
        discount: 0,
        grandTotal: 5200,
        paid: 5200,
        due: 0,
    };

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header className="border-0 pb-0" style={{ position: 'relative', minHeight: 80 }}>
                <Modal.Title className="fw-bold" style={{ fontSize: '1.5rem', marginLeft: 0 }}>Sales Detail</Modal.Title>
                <div style={{ position: 'absolute', top: 24, right: 32, display: 'flex', gap: 16, zIndex: 2 }}>
                    <Button variant="outline-danger" className="me-2" style={{ borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><FaFilePdf size={22} /></Button>
                    <Button className="btn-modal-cancel" style={{ borderRadius: 10, height: 44, fontWeight: 700, fontSize: 18, padding: '0 28px' }} onClick={onHide}>Back to Sales</Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-4">
                    <Col md={4} xs={12}>
                        <div className="fw-semibold mb-1" style={{ color: '#1a1a1a' }}>Customer Info</div>
                        <div className="fw-bold">{customer.name}</div>
                        <div className="text-muted small">{customer.address}</div>
                        <div className="text-muted small">Email: {customer.email}</div>
                        <div className="text-muted small">Phone: {customer.phone}</div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="fw-semibold mb-1" style={{ color: '#1a1a1a' }}>Company Info</div>
                        <div className="fw-bold">{company.name}</div>
                        <div className="text-muted small">{company.address}</div>
                        <div className="text-muted small">Email: {company.email}</div>
                        <div className="text-muted small">Phone: {company.phone}</div>
                    </Col>
                    <Col md={4} xs={12}>
                        <div className="fw-semibold mb-1" style={{ color: '#1a1a1a' }}>Invoice Info</div>
                        <div>Reference: <span className="fw-bold text-warning">#{invoice.reference}</span></div>
                        <div>Reference: <span className="fw-semibold">{invoice.date}</span></div>
                        <div>Status: <Badge bg="success">{invoice.status}</Badge></div>
                        <div>Payment Status: <Badge bg="light" className="text-success">• {invoice.paymentStatus}</Badge></div>
                    </Col>
                </Row>
                <div className="fw-semibold mb-2" style={{ color: '#1a1a1a' }}>Order Summary</div>
                <Table bordered responsive className="mb-4 text-center">
                    <thead style={{ background: '#f3f4f6' }}>
                        <tr>
                            <th>Product</th>
                            <th>Purchase Price($)</th>
                            <th>Discount($)</th>
                            <th>Tax(%)</th>
                            <th>Tax Amount($)</th>
                            <th>Unit Cost($)</th>
                            <th>Total Cost(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, idx) => (
                            <tr key={idx}>
                                <td className="d-flex align-items-center gap-2 border-0" style={{ background: 'transparent' }}>
                                    <img src={require(`../assests/p${idx + 1}.png`)} alt={p.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
                                    <span>{p.name}</span>
                                </td>
                                <td>{p.price}</td>
                                <td>{p.discount}</td>
                                <td>{p.tax.toFixed(2)}</td>
                                <td>{p.taxAmount.toFixed(2)}</td>
                                <td>{p.unitCost.toFixed(2)}</td>
                                <td>{p.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row>
                    <Col md={7}></Col>
                    <Col md={5}>
                        <div className="border rounded bg-light p-3" style={{ fontSize: '15px' }}>
                            <Table borderless size="sm" className="mb-0">
                                <tbody>
                                    <tr>
                                        <td>Order Tax</td>
                                        <td className="text-end">$ {summary.orderTax.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        <td className="text-end">$ {summary.discount.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Grand Total</td>
                                        <td className="text-end">$ {summary.grandTotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Paid</td>
                                        <td className="text-end">$ {summary.paid.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Due</td>
                                        <td className="text-end">$ {summary.due.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
                <Button className="btn-modal-cancel" onClick={onHide}>
                    Cancel
                </Button>
                <Button className="btn-modal-submit">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaleDetailModal;
