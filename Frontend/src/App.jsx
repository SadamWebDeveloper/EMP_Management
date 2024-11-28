import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import HomePage from "./pages/HomePage";
import AddEmployeePage from "./pages/AddEmplyeePage";
import EditEmployeePage from "./pages/EditEmployeePage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="add-employee" element={<AddEmployeePage />} />
          <Route path="edit-employee/:id" element={<EditEmployeePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
