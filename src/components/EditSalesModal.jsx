// import React, { useState } from 'react';
// import { Modal, Button, Table, Row, Col, Form } from 'react-bootstrap';
// import './PosOrder.css';

// const EditSalesModal = ({ show, onHide, order }) => {
//     // Dummy data for demonstration
//     const [products, setProducts] = useState([
//         { img: '/src/assests/p1.png', name: 'Nike Jordan', qty: 2, price: 2000, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 1500 },
//         { img: '/src/assests/p2.png', name: 'Apple Series 5 Watch', qty: 2, price: 3000, discount: 400, tax: 0, taxAmount: 0, unitCost: 0, total: 1700 },
//         { img: '/src/assests/p3.png', name: 'Lobar Handy', qty: 2, price: 2500, discount: 500, tax: 0, taxAmount: 0, unitCost: 0, total: 2000 },
//     ]);
//     const [form, setForm] = useState({
//         customer: 'Carl Evans',
//         date: '2023-01-19',
//         supplier: 'Apex Computers',
//         product: '',
//         orderTax: 0,
//         discount: 0,
//         shipping: 0,
//         status: '',
//         notes: '',
//     });
//     const summary = {
//         orderTax: 0,
//         discount: 0,
//         shipping: 0,
//         grandTotal: 5200,
//     };
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//     return (
//         <Modal show={show} onHide={onHide} size="xl" centered dialogClassName="edit-sales-modal">
//             <Modal.Header closeButton className="border-0 pb-0">
//                 <Modal.Title className="fw-bold" style={{ fontSize: '1.5rem' }}>Edit Sales</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {/* Table Header */}
//                 <div className="bg-light rounded mb-3 px-2 px-md-4 py-2" style={{ overflowX: 'auto' }}>
//                     <div className="d-flex flex-nowrap align-items-center fw-semibold" style={{ minWidth: '900px' }}>
//                         <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Product</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Qty</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '150px' }}>Purchase Price($)</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Discount($)</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>Tax(%)</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Tax Amount($)</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Unit Cost($)</div>
//                         <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>Total Cost(%)</div>
//                     </div>
//                 </div>
//                 {/* Product Rows */}
//                 <div className="bg-white mb-3">
//                     {products.map((p, idx) => (
//                         <div key={idx} className="d-flex flex-nowrap align-items-center mb-2" style={{ minWidth: '900px' }}>
//                             <div className="px-2 flex-fill d-flex align-items-center gap-2" style={{ minWidth: '120px' }}>
//                                 <img src={p.img} alt={p.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
//                                 <span>{p.name}</span>
//                             </div>
//                             <div className="px-2 flex-fill d-flex align-items-center gap-2" style={{ minWidth: '80px' }}>
//                                 <Button variant="outline-secondary" size="sm" className="qty-btn">-</Button>
//                                 <span className="qty-value">{p.qty}</span>
//                                 <Button variant="outline-secondary" size="sm" className="qty-btn">+</Button>
//                             </div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '150px' }}>{p.price}</div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.discount}</div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '80px' }}>{p.tax.toFixed(2)}</div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.taxAmount.toFixed(2)}</div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.unitCost.toFixed(2)}</div>
//                             <div className="px-2 flex-fill" style={{ minWidth: '120px' }}>{p.total}</div>
//                         </div>
//                     ))}
//                 </div>
//                 {/* Form Fields */}
//                 <Form>
//                     <Row className="g-3 mb-3">
//                         <Col md={4} xs={12}>
//                             <Form.Label className="fw-semibold">Customer Name <span className="text-danger">*</span></Form.Label>
//                             <Form.Select name="customer" value={form.customer} onChange={handleChange} className="custom-select-theme">
//                                 <option className="custom-option-theme">Carl Evans</option>
//                                 <option className="custom-option-theme">Minerva Rameriz</option>
//                                 <option className="custom-option-theme">Robert Lamon</option>
//                             </Form.Select>
//                         </Col>
//                         <Col md={4} xs={12}>
//                             <Form.Label className="fw-semibold">Date <span className="text-danger">*</span></Form.Label>
//                             <Form.Control type="date" name="date" value={form.date} onChange={handleChange} placeholder="Choose" />
//                         </Col>
//                         <Col md={4} xs={12}>
//                             <Form.Label className="fw-semibold">Supplier <span className="text-danger">*</span></Form.Label>
//                             <Form.Select name="supplier" value={form.supplier} onChange={handleChange} className="custom-select-theme">
//                                 <option className="custom-option-theme">Apex Computers</option>
//                                 <option className="custom-option-theme">ABC Supplier</option>
//                             </Form.Select>
//                         </Col>
//                     </Row>
//                     <Row className="mb-3">
//                         <Col xs={12}>
//                             <Form.Label className="fw-semibold">Product Name <span className="text-danger">*</span></Form.Label>
//                             <Form.Control type="text" placeholder="Please type product code and select" name="product" value={form.product} onChange={handleChange} />
//                         </Col>
//                     </Row>
//                     <Row className="mb-4">
//                         <Col md={7} xs={12}></Col>
//                         <Col md={5} xs={12}>
//                             <div className="border rounded bg-light p-3" style={{ fontSize: '15px' }}>
//                                 <Table borderless size="sm" className="mb-0">
//                                     <tbody>
//                                         <tr>
//                                             <td>Order Tax</td>
//                                             <td className="text-end">$ {summary.orderTax.toFixed(2)}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Discount</td>
//                                             <td className="text-end">$ {summary.discount.toFixed(2)}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>Shipping</td>
//                                             <td className="text-end">$ {summary.shipping.toFixed(2)}</td>
//                                         </tr>
//                                         <tr className="fw-bold">
//                                             <td>Grand Total</td>
//                                             <td className="text-end">$ {summary.grandTotal.toFixed(2)}</td>
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row className="g-3 mb-2">
//                         <Col md={3} xs={12}>
//                             <Form.Label className="fw-semibold">Order Tax <span className="text-danger">*</span></Form.Label>
//                             <Form.Control type="number" name="orderTax" value={form.orderTax} onChange={handleChange} />
//                         </Col>
//                         <Col md={3} xs={12}>
//                             <Form.Label className="fw-semibold">Discount <span className="text-danger">*</span></Form.Label>
//                             <Form.Control type="number" name="discount" value={form.discount} onChange={handleChange} />
//                         </Col>
//                         <Col md={3} xs={12}>
//                             <Form.Label className="fw-semibold">Shipping <span className="text-danger">*</span></Form.Label>
//                             <Form.Control type="number" name="shipping" value={form.shipping} onChange={handleChange} />
//                         </Col>
//                         <Col md={3} xs={12}>
//                             <Form.Label className="fw-semibold">Status <span className="text-danger">*</span></Form.Label>
//                             <Form.Select name="status" value={form.status} onChange={handleChange} className="custom-select-theme">
//                                 <option className="custom-option-theme">Select</option>
//                                 <option className="custom-option-theme">Pending</option>
//                                 <option className="custom-option-theme">Completed</option>
//                             </Form.Select>
//                         </Col>
//                     </Row>
//                     <Row className="mb-3">
//                         <Col xs={12}>
//                             <Form.Label className="fw-semibold">Notes</Form.Label>
//                             <Form.Control as="textarea" rows={2} name="notes" value={form.notes} onChange={handleChange} />
//                         </Col>
//                     </Row>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer className="border-0 pt-0 d-flex justify-content-end gap-2">
//                 <Button variant="light" className="border px-4" onClick={onHide}>
//                     Cancel
//                 </Button>
//                 <Button style={{ backgroundColor: '#FFA500', border: 'none', color: '#fff', fontWeight: 600, padding: '0.5rem 2rem' }}>
//                     Save Changes
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default EditSalesModal;
