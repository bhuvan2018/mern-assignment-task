import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DistributedLists from './pages/DistributedLists';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lists" element={<DistributedLists />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);