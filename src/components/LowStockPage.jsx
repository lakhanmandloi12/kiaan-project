import React, { useState } from 'react';
import { BsEyeFill, BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import './LowStockPage.css';

const lowStockData = [
    { sku: 'PT0001', product: 'Macbook Pro', category: 'Computers', unit: 'Piece', quantity: 50, minQty: 5, price: 1500, tax: '0%', status: 'In Stock' },
    { sku: 'PT0002', product: 'HP EliteBook', category: 'Computers', unit: 'Piece', quantity: 3, minQty: 10, price: 1200, tax: '5%', status: 'Low Stock' },
    { sku: 'PT0003', product: 'Dell Inspiron', category: 'Computers', unit: 'Piece', quantity: 0, minQty: 5, price: 1000, tax: '10%', status: 'Out Of Stock' },
    { sku: 'PT0004', product: 'Lenovo ThinkPad', category: 'Computers', unit: 'Piece', quantity: 2, minQty: 6, price: 950, tax: '8%', status: 'Low Stock' },
    { sku: 'PT0005', product: 'iMac 27"', category: 'Computers', unit: 'Piece', quantity: 0, minQty: 3, price: 2000, tax: '12%', status: 'Out Of Stock' },
    { sku: 'PT0006', product: 'Asus ZenBook', category: 'Computers', unit: 'Piece', quantity: 4, minQty: 7, price: 880, tax: '7%', status: 'Low Stock' },
    { sku: 'PT0007', product: 'Acer Swift', category: 'Computers', unit: 'Piece', quantity: 1, minQty: 5, price: 730, tax: '9%', status: 'Low Stock' },
    { sku: 'PT0008', product: 'Surface Laptop', category: 'Computers', unit: 'Piece', quantity: 0, minQty: 4, price: 1450, tax: '6%', status: 'Out Of Stock' },
];

const getStatusBadge = (status) => {
    switch (status) {
        case 'In Stock': return <span className="badge bg-success">{status}</span>;
        case 'Low Stock': return <span className="badge bg-warning text-dark">{status}</span>;
        case 'Out Of Stock': return <span className="badge bg-danger">{status}</span>;
        default: return <span className="badge bg-secondary">{status}</span>;
    }
};

const LowStockPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedEditProduct, setSelectedEditProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleView = (product) => {
        setSelectedProduct(product);
        const modal = new window.bootstrap.Modal(document.getElementById('productDetailModal'));
        modal.show();
    };

    const handleEdit = (product) => {
        setSelectedEditProduct(product);
        const modal = new window.bootstrap.Modal(document.getElementById('editProductModal'));
        modal.show();
    };

    const handleDelete = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    };

    return (
        <div className="container-fluid py-4 px-4" style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
            <h3 className="fw-bold text-warning">Low Stock Products</h3>
            <p className="text-muted mb-4 small">List of items below minimum quantity</p>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>SKU</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                            <th>Min Qty</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sku}</td>
                                <td>{item.product}</td>
                                <td>{item.category}</td>
                                <td>{item.unit}</td>
                                <td>{item.quantity}</td>
                                <td>{item.minQty}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.tax}</td>
                                <td>{getStatusBadge(item.status)}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-light btn-sm" onClick={() => handleView(item)}><BsEyeFill /></button>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}><BsPencilFill /></button>
                                        <button className="btn btn-danger btn-sm" onClick={handleDelete}><BsFillTrashFill /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <div className="modal fade" id="productDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Product Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        {selectedProduct && (
                            <div className="modal-body">
                                <div className="d-flex flex-wrap gap-4">
                                    <div className="flex-grow-1" style={{ minWidth: '350px' }}>
                                        <div className="border p-3 d-flex justify-content-center align-items-center mb-3">
                                            <div>
                                                <img src="https://www.barcodesinc.com/generator/image.php?code=86102192&style=197&type=C128B&width=250&height=50&xres=1&font=3" alt="barcode" />
                                                <div className="text-center text-muted small">86102192</div>
                                            </div>
                                        </div>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr><td><strong>Product</strong></td><td>{selectedProduct.product}</td></tr>
                                                <tr><td><strong>Category</strong></td><td>{selectedProduct.category}</td></tr>
                                                <tr><td><strong>Sub Category</strong></td><td>None</td></tr>
                                                <tr><td><strong>Brand</strong></td><td>None</td></tr>
                                                <tr><td><strong>Unit</strong></td><td>{selectedProduct.unit}</td></tr>
                                                <tr><td><strong>SKU</strong></td><td>{selectedProduct.sku}</td></tr>
                                                <tr><td><strong>Minimum Qty</strong></td><td>{selectedProduct.minQty}</td></tr>
                                                <tr><td><strong>Quantity</strong></td><td>{selectedProduct.quantity}</td></tr>
                                                <tr><td><strong>Tax</strong></td><td>{selectedProduct.tax}</td></tr>
                                                <tr><td><strong>Discount Type</strong></td><td>Percentage</td></tr>
                                                <tr><td><strong>Price</strong></td><td>${selectedProduct.price.toFixed(2)}</td></tr>
                                                <tr><td><strong>Status</strong></td><td>{selectedProduct.status}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editProductModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Product (Read-Only)</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        {selectedEditProduct && (
                            <>
                                <div className="modal-body">
                                    <form>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Product Name</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.product} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Category</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.category} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">SKU</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.sku} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Unit</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.unit} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Quantity</label>
                                                <input type="number" className="form-control" value={selectedEditProduct.quantity} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Min Qty</label>
                                                <input type="number" className="form-control" value={selectedEditProduct.minQty} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Price</label>
                                                <input type="text" className="form-control" value={`$${selectedEditProduct.price}`} readOnly />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Tax</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.tax} readOnly />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Status</label>
                                                <input type="text" className="form-control" value={selectedEditProduct.status} readOnly />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Save</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to delete this item?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LowStockPage;