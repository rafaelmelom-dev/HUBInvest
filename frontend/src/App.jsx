import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CryptoMarket from "./pages/CryptoMarket";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import UserDashboard from "./pages/UserDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/criptos" element={<CryptoMarket />} />
                <Route path="/admin" element={<AdminDashboardUsers />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
