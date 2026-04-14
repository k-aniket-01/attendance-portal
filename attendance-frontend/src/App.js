import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Leave from "./pages/Leave";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/timesheet" element={
          <ProtectedRoute><Timesheet /></ProtectedRoute>
        } />

        <Route path="/leave" element={
          <ProtectedRoute><Leave /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;