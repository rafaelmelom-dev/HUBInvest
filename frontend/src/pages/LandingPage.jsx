// src/pages/LandingPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import CryptoDetailsModal from "../components/CryptoDetailsModal";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";

export default function LandingPage() {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=4&page=1&sparkline=true&price_change_percentage=24h",
                );
                if (!response.ok) throw new Error("Erro na API");
                const data = await response.json();
                const formattedData = data.map((coin) => {
                    const prices = coin.sparkline_in_7d.price;
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    const path = prices
                        .map((price, i) => {
                            const x = (i / (prices.length - 1)) * 140;
                            const y = 50 - ((price - min) / (max - min)) * 50;
                            return `${i === 0 ? "M" : "L"}${x},${y}`;
                        })
                        .join(" ");

                    return {
                        id: coin.id,
                        name: coin.name,
                        symbol: coin.symbol.toUpperCase(),
                        image: coin.image,
                        displayPrice: new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(coin.current_price),
                        displayChange: `${coin.price_change_percentage_24h.toFixed(2)}%`,
                        up: coin.price_change_percentage_24h > 0,
                        chart: path,
                        current_price: coin.current_price,
                        price_change_percentage_24h:
                            coin.price_change_percentage_24h,
                        market_cap_rank: coin.market_cap_rank,
                        high_24h: coin.high_24h,
                        low_24h: coin.low_24h,
                        total_volume: coin.total_volume,
                        ath: coin.ath,
                    };
                });
                setCryptos(formattedData);
            } catch (error) {
                console.error("Usando dados de fallback:", error);
                setCryptos([
                    {
                        id: "bitcoin",
                        name: "Bitcoin",
                        symbol: "BTC",
                        image: "https://assets.coincap.io/assets/icons/btc@2x.png",
                        displayPrice: "R$ 345.200",
                        displayChange: "+2.4%",
                        up: true,
                        chart: "M0,50 L20,45 L40,60 L60,40 L80,55 L100,30 L120,40 L140,20",
                        current_price: 345200,
                        price_change_percentage_24h: 2.4,
                        market_cap_rank: 1,
                        high_24h: 350000,
                        low_24h: 340000,
                        total_volume: 50000000000,
                        ath: 380000,
                    },
                    {
                        id: "ethereum",
                        name: "Ethereum",
                        symbol: "ETH",
                        image: "https://assets.coincap.io/assets/icons/eth@2x.png",
                        displayPrice: "R$ 18.400",
                        displayChange: "-1.2%",
                        up: false,
                        chart: "M0,30 L20,40 L40,35 L60,55 L80,50 L100,70 L120,65 L140,80",
                        current_price: 18400,
                        price_change_percentage_24h: -1.2,
                        market_cap_rank: 2,
                        high_24h: 19000,
                        low_24h: 18000,
                        total_volume: 20000000000,
                        ath: 24000,
                    },
                    {
                        id: "solana",
                        name: "Solana",
                        symbol: "SOL",
                        image: "https://assets.coincap.io/assets/icons/sol@2x.png",
                        displayPrice: "R$ 650",
                        displayChange: "+5.7%",
                        up: true,
                        chart: "M0,60 L20,55 L40,70 L60,50 L80,45 L100,30 L120,25 L140,10",
                        current_price: 650,
                        price_change_percentage_24h: 5.7,
                        market_cap_rank: 5,
                        high_24h: 660,
                        low_24h: 630,
                        total_volume: 5000000000,
                        ath: 1200,
                    },
                    {
                        id: "binancecoin",
                        name: "BNB",
                        symbol: "BNB",
                        image: "https://assets.coincap.io/assets/icons/bnb@2x.png",
                        displayPrice: "R$ 3.200",
                        displayChange: "+0.8%",
                        up: true,
                        chart: "M0,50 L20,52 L40,48 L60,50 L80,48 L100,45 L120,48 L140,40",
                        current_price: 3200,
                        price_change_percentage_24h: 0.8,
                        market_cap_rank: 4,
                        high_24h: 3250,
                        low_24h: 3150,
                        total_volume: 1000000000,
                        ath: 3500,
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchCryptos();
    }, []);

    const openLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };
    const openRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    };
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-300">
            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl fixed w-full top-0 z-40 bg-white/90 dark:bg-[#0f172a]/90 transition-all shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span>
                            HUB<span className="text-blue-600">Invest</span>
                        </span>
                    </div>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <button
                            onClick={() => navigate("/criptos")}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Criptoativos
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-xl transition-all hover-lift"
                    >
                        {theme === "dark" ? "🌙" : "☀️"}
                    </button>
                    <button
                        onClick={openLogin}
                        className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        Entrar
                    </button>
                    <button
                        onClick={openRegister}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm hover:shadow-xl hover:shadow-blue-600/30 transition-all hover-lift btn-modern"
                    >
                        Criar Conta
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-6 pt-32 pb-24 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 space-y-6 relative z-10 animate-fade-in">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-500/40 rounded-full text-blue-600 dark:text-blue-300 text-xs font-semibold mb-2 hover-glow transition-all">
                        🚀 A plataforma #1 do mercado
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                        O futuro dos seus <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            investimentos
                        </span>{" "}
                        começa aqui.
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md leading-relaxed">
                        Gerencie criptomoedas, ações e renda fixa em uma única
                        interface inteligente.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={openRegister}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3.5 rounded-lg font-bold hover:shadow-2xl hover:shadow-blue-600/40 transition-all transform hover:scale-105 btn-modern"
                        >
                            Começar Agora
                        </button>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="glass-card text-gray-900 dark:text-white px-8 py-3.5 rounded-lg font-bold hover-lift"
                        >
                            Ver Demo
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative animate-scale-in">
                    <div className="hidden dark:block w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] absolute -top-10 right-10"></div>
                    <div className="relative glass-card p-6 w-80 rotate-3 hover:rotate-0 transition-transform duration-500 z-10 hover-lift shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                    Saldo Total
                                </span>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    R$ 145.200,00
                                </div>
                            </div>
                            <div className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                                +12.5%
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <span>Bitcoin</span>
                                    <span>45%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <span>Ethereum</span>
                                    <span>30%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-cyan-400 w-[30%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0b0f19] dark:to-[#0f172a] py-12 border-t border-gray-200/50 dark:border-gray-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-8 animate-fade-in">
                        <div>
                            <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                Tendências de Mercado
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                Cotações em tempo real.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/criptos")}
                            className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline hidden md:block"
                        >
                            Ver todos os ativos &rarr;
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500 animate-pulse">
                            Carregando cotações...
                        </div>
                    ) : (
                        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 scrollbar-hide snap-x">
                            {cryptos.map((crypto, idx) => (
                                <div
                                    key={crypto.id || crypto.symbol}
                                    onClick={() => setSelectedCoin(crypto)}
                                    className="min-w-[260px] md:min-w-0 glass-card p-5 rounded-2xl hover-lift cursor-pointer group snap-center fade-in-down"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={crypto.image}
                                                alt={crypto.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <div className="text-base font-bold text-gray-800 dark:text-gray-100">
                                                    {crypto.symbol}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {crypto.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                                                crypto.up
                                                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                            }`}
                                        >
                                            {crypto.up ? "▲" : "▼"}{" "}
                                            {crypto.displayChange}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">
                                                Preço Atual
                                            </div>
                                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                                {crypto.displayPrice}
                                            </div>
                                        </div>
                                        <div className="w-24 h-12">
                                            <svg
                                                viewBox="0 0 140 50"
                                                className="w-full h-full overflow-visible"
                                            >
                                                <path
                                                    d={crypto.chart}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className={
                                                        crypto.up
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 text-center md:hidden">
                        <button
                            onClick={() => navigate("/criptos")}
                            className="text-blue-600 dark:text-blue-400 text-sm font-semibold"
                        >
                            Ver mercado completo &rarr;
                        </button>
                    </div>
                </div>
            </section>

            {/* --- AQUI ESTÁ O FOOTER  --- */}
            <Footer />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={openRegister}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={openLogin}
            />
            <CryptoDetailsModal
                isOpen={!!selectedCoin}
                onClose={() => setSelectedCoin(null)}
                coin={selectedCoin}
            />
        </div>
    );
}
