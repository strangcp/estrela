
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Assine from "./pages/Assine";
import Aulas from "./pages/Aulas";
import Login from "./pages/Login";
import AulasOnline from "./pages/AulasOnline";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import GerenciarPerfil from "./pages/GerenciarPerfil";
import GerenciarAssinatura from "./pages/GerenciarAssinatura";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assine" element={<Assine />} />
            <Route path="/aulas" element={<Aulas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aulas-online" element={<AulasOnline />} />
            <Route path="/gerenciar-perfil" element={<GerenciarPerfil />} />
            <Route path="/gerenciar-assinatura" element={<GerenciarAssinatura />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
