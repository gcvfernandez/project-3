import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CrewManagementPage from './pages/CrewManagementPage';
import PayrollProcessingPage from './pages/PayrollProcessingPage';
import DisbursementPage from './pages/DisbursementPage';

// Importing CSS
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="crew" element={<CrewManagementPage />} />
          <Route path="payroll" element={<PayrollProcessingPage />} />
          <Route path="disbursement" element={<DisbursementPage />} />
          
          {/* Placeholder routes for future implementation */}
          <Route path="reports" element={<div className="p-4">Reports page coming soon</div>} />
          <Route path="documents" element={<div className="p-4">Documents page coming soon</div>} />
          <Route path="settings" element={<div className="p-4">Settings page coming soon</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;