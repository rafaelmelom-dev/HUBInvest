import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import CryptoMarket from "./pages/CryptoMarket";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import UserDashboard from "./pages/UserDashboard";

// Mapa de rota → título da aba
const PAGE_TITLES = {
    "/":          "HUBInvest — Invista com inteligência",
    "/criptos":   "Mercado — HUBInvest",
    "/dashboard": "Dashboard — HUBInvest",
    "/admin":     "Admin — HUBInvest",
};

// Componente interno que lê a rota atual e atualiza document.title
function TitleUpdater() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = PAGE_TITLES[pathname] ?? "HUBInvest";
    }, [pathname]);

    return null; // não renderiza nada, só efeito colateral
}

function App() {
    return (
        <BrowserRouter>
            <TitleUpdater />
            <Routes>
                <Route path="/"          element={<LandingPage />} />
                <Route path="/criptos"   element={<CryptoMarket />} />
                <Route path="/admin"     element={<AdminDashboardUsers />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;