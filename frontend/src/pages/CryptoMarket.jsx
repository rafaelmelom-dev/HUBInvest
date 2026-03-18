// src/pages/CryptoMarket.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import CryptoDetailsModal from '../components/CryptoDetailsModal'

export default function CryptoMarket() {
    const navigate = useNavigate()
    const { theme, setTheme } = useTheme()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [search, setSearch] = useState('')
    const [sortKey, setSortKey] = useState(null)       // 'price' | 'change' | 'marketcap'
    const [sortDir, setSortDir] = useState('desc')     // 'asc' | 'desc'

    // Alterna direção se a coluna já é a ativa, senão ordena desc por padrão
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'desc' ? 'asc' : 'desc')
        } else {
            setSortKey(key)
            setSortDir('desc')
        }
    }

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => { setCoins(data); setLoading(false) })
            .catch(err => console.error(err))
    }, [])

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    // Filtra e ordena — recalcula só quando search, sortKey, sortDir ou coins mudam
    const filteredCoins = useMemo(() => {
        const query = search.trim().toLowerCase()
        let list = query
            ? coins.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.symbol.toLowerCase().includes(query)
              )
            : [...coins]

        if (sortKey) {
            const getValue = (c) => {
                if (sortKey === 'price')     return c.current_price ?? 0
                if (sortKey === 'change')    return c.price_change_percentage_24h ?? 0
                if (sortKey === 'marketcap') return c.market_cap ?? 0
            }
            list.sort((a, b) =>
                sortDir === 'desc'
                    ? getValue(b) - getValue(a)
                    : getValue(a) - getValue(b)
            )
        }

        return list
    }, [search, coins, sortKey, sortDir])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-300">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all hover-lift">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
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
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Mercado de Criptoativos
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    Clique em uma moeda para ver detalhes e análise completa.
                </p>

                {/* CAMPO DE BUSCA */}
                <div className="relative mb-6 max-w-md">
                    {/* Ícone de lupa */}
                    <svg
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>

                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nome ou símbolo... (ex: Bitcoin, BTC)"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm"
                    />

                    {/* Botão de limpar — aparece só quando há texto */}
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            aria-label="Limpar busca"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

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
                                        <SortTh
                                            label="Preço (BRL)"
                                            colKey="price"
                                            sortKey={sortKey}
                                            sortDir={sortDir}
                                            onSort={handleSort}
                                        />
                                        <SortTh
                                            label="24h %"
                                            colKey="change"
                                            sortKey={sortKey}
                                            sortDir={sortDir}
                                            onSort={handleSort}
                                        />
                                        <SortTh
                                            label="Mkt Cap"
                                            colKey="marketcap"
                                            sortKey={sortKey}
                                            sortDir={sortDir}
                                            onSort={handleSort}
                                            className="hidden md:table-cell"
                                        />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {filteredCoins.length > 0 ? (
                                        filteredCoins.map(coin => (
                                            <tr
                                                key={coin.id}
                                                onClick={() => setSelectedCoin(coin)}
                                                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all cursor-pointer group hover-lift"
                                            >
                                                <td className="p-4 text-gray-400 text-sm">{coin.market_cap_rank}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform group-hover:shadow-lg" />
                                                        <div>
                                                            <div className="font-bold text-gray-900 dark:text-white">
                                                                <HighlightMatch text={coin.symbol.toUpperCase()} query={search} />
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                <HighlightMatch text={coin.name} query={search} />
                                                            </div>
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
                                        ))
                                    ) : (
                                        // Empty state quando nenhuma moeda bate com a busca
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
                                                    <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                                    </svg>
                                                    <p className="font-medium text-base">Nenhuma moeda encontrada</p>
                                                    <p className="text-sm">
                                                        Sem resultados para{' '}
                                                        <span className="font-semibold text-blue-500">"{search}"</span>
                                                    </p>
                                                    <button
                                                        onClick={() => setSearch('')}
                                                        className="mt-1 text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                                                    >
                                                        Limpar busca
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Contador de resultados — visível quando há filtro ativo */}
                        {search && filteredCoins.length > 0 && (
                            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                {filteredCoins.length} resultado{filteredCoins.length !== 1 ? 's' : ''} para{' '}
                                <span className="font-semibold text-blue-500">"{search}"</span>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <CryptoDetailsModal
                isOpen={!!selectedCoin}
                onClose={() => setSelectedCoin(null)}
                coin={selectedCoin}
            />
        </div>
    )
}

// Cabeçalho de coluna ordenável
function SortTh({ label, colKey, sortKey, sortDir, onSort, className = '' }) {
    const active = sortKey === colKey
    return (
        <th
            className={`p-4 font-semibold text-right cursor-pointer select-none group ${className}`}
            onClick={() => onSort(colKey)}
        >
            <span className="inline-flex items-center justify-end gap-1.5">
                <span className={active ? 'text-blue-600 dark:text-blue-400' : ''}>
                    {label}
                </span>
                {/* Indicador de direção — sempre visível quando ativo, sutil no hover */}
                <span className={`flex flex-col gap-[1px] transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                    <svg
                        className={`w-2.5 h-2.5 transition-colors ${active && sortDir === 'asc' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
                        viewBox="0 0 10 6" fill="currentColor"
                    >
                        <path d="M5 0L10 6H0z" />
                    </svg>
                    <svg
                        className={`w-2.5 h-2.5 transition-colors ${active && sortDir === 'desc' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
                        viewBox="0 0 10 6" fill="currentColor"
                    >
                        <path d="M5 6L0 0H10z" />
                    </svg>
                </span>
            </span>
        </th>
    )
}

// Destaca o trecho que coincide com a busca
function HighlightMatch({ text, query }) {
    if (!query.trim()) return <>{text}</>

    const idx = text.toLowerCase().indexOf(query.trim().toLowerCase())
    if (idx === -1) return <>{text}</>

    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-yellow-200 dark:bg-yellow-500/30 text-inherit rounded px-0.5">
                {text.slice(idx, idx + query.trim().length)}
            </mark>
            {text.slice(idx + query.trim().length)}
        </>
    )
}