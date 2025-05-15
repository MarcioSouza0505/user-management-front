import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserListPage from '../pages/UserListPage';
import UserFormPage from '../pages/components/UserFormPage';
import ReportPage from '../pages/ReportPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id" element={<UserFormPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
