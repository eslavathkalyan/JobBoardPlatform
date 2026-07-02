import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar        from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home           from "./pages/Home";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Jobs           from "./pages/Jobs";
import ApplyJob       from "./pages/ApplyJob";
import Dashboard      from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import CreateJob      from "./pages/CreateJob";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ── Public routes ────────────────────── */}
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs"     element={<Jobs />} />

        {/* ── Protected routes (login required) ── */}
        <Route path="/apply/:id" element={
          <ProtectedRoute><ApplyJob /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/my-applications" element={
          <ProtectedRoute><MyApplications /></ProtectedRoute>
        } />
        <Route path="/create-job" element={
          <ProtectedRoute><CreateJob /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;