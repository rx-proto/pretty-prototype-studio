import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import HomePage from "@/pages/HomePage";
import EmployeesPage from "@/pages/EmployeesPage";
import EmployeeDetailPage from "@/pages/EmployeeDetailPage";
import SkillsPage from "@/pages/SkillsPage";
import ConnectionsPage from "@/pages/ConnectionsPage";
import BillingPage from "@/pages/BillingPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/preview/workspace" replace />} />
          <Route path="/preview" element={<AppLayout />}>
            <Route path="workspace" element={<HomePage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="employees/:id" element={<EmployeeDetailPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="connections" element={<ConnectionsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
