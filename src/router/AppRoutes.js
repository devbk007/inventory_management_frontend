import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashboardView from "../views/DashboardView";

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<DashboardView />} />
    </Routes>
  )
}

export default AppRoutes;