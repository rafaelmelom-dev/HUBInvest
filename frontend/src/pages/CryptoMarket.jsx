// src/pages/CryptoMarket.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import CryptoDetailsModal from '../components/CryptoDetailsModal' // <--- 1. IMPORTE O MODAL

export default function CryptoMarket() {
    const navigate = useNavigate()
    const { theme, setTheme } = useTheme()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)

    // 2. ESTADO PARA CONTROLAR O MODAL
    const [selectedCoin, setSelectedCoin] = useState(null) // Guarda a moeda clicada

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => {
                setCoins(data)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    // 3. FUNÇÃO PARA ABRIR O MODAL
    const handleOpenModal = (coin) => {
        setSelectedCoin(coin)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-300">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all hover-lift">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <div className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-1" onClick={() => navigate('/')}>
                        <span>HUB<span className="text-blue-600">Invest</span></span>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded ml-2">Market</span>
                    </div>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-xl transition-all hover-lift">
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Mercado de Criptoativos</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Clique em uma moeda para ver detalhes e análise completa.</p>

                {loading ? (
                    <div className="text-center py-20 animate-pulse text-gray-500 text-lg">Carregando mercado...</div>
                ) : (
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#0b0f19] dark:to-[#151f32] text-xs uppercase text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                        <th className="p-4 font-semibold">#</th>
                                        <th className="p-4 font-semibold">Moeda</th>
                                        <th className="p-4 font-semibold text-right">Preço (BRL)</th>
                                        <th className="p-4 font-semibold text-right">24h %</th>
                                        <th className="p-4 font-semibold text-right hidden md:table-cell">Mkt Cap</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {coins.map((coin, idx) => (
                                        <tr
                                            key={coin.id}
                                            onClick={() => handleOpenModal(coin)}
                                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all cursor-pointer group hover-lift"
                                        >
                                            <td className="p-4 text-gray-400 text-sm">{coin.market_cap_rank}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform group-hover:shadow-lg" />
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white">{coin.symbol.toUpperCase()}</div>
                                                        <div className="text-xs text-gray-500">{coin.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-semibold text-gray-900 dark:text-white">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(coin.current_price)}
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className={`font-bold px-2 py-1 rounded text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'}`}>
                                                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="p-4 text-right text-gray-500 dark:text-gray-400 text-sm hidden md:table-cell">
                                                {new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short", style: 'currency', currency: 'BRL' }).format(coin.market_cap)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* 5. RENDERIZA O MODAL AQUI */}
            <CryptoDetailsModal
                isOpen={!!selectedCoin} // Abre se selectedCoin não for null
                onClose={() => setSelectedCoin(null)}
                coin={selectedCoin}
            />

        </div>
    )
}
