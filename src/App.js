import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SettingsPage from './pages/SettingsPage';
import ManageCompanies from './components/ManageCompanies';
import Settings from './components/Settings';
import LowStockPage from './components/LowStockPage';
import ManageStockPage from './components/ManageStockPage';
import SalesReturn from './components/SalesReturn';
import AccountStatement from './components/AccountStatement';

import PurchaseReturns from './components/PurchaseReturns';
import PurchaseInvoice from './components/PurchaseInvoice';
import InventoryReports from './components/InventoryReports';
import PosOrder from './components/PosOrder';


function App() {
  return (
    <Router>


      <Routes>


        <Route path="/nav" element={<Navbar />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/company" element={<ManageCompanies />} />
        <Route path="/system" element={<Settings />} />
        <Route path="/low" element={<LowStockPage />} />
        <Route path="/manage" element={<ManageStockPage />} />
        <Route path="/sales" element={<SalesReturn />} />
        <Route path="/ac" element={<AccountStatement />} />

        <Route path="/pr" element={<PurchaseReturns />} />
        <Route path="/pi" element={<PurchaseInvoice />} />
        <Route path="/inventory" element={<InventoryReports />} />
        <Route path="/pos" element={<PosOrder />} />
        {/* Add other pages here */}
      </Routes>

    </Router>
  );
}

export default App;