import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AssociadoDashboard } from "./pages/associado/AssociadoDashboard";
import { ComspradorDashboard } from "./pages/comprador/CompradorDashboard";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { WinnersScreen } from "./pages/winners";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/winners" element={<WinnersScreen />} />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/associado"
        element={
          <ProtectedRoute allowedRoles={["associado"]}>
            <AssociadoDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/comprador"
        element={
          <ProtectedRoute allowedRoles={["comprador"]}>
            <ComspradorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
