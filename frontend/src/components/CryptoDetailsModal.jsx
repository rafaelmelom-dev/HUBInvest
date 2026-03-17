// src/components/CryptoDetailsModal.jsx
export default function CryptoDetailsModal({ isOpen, onClose, coin }) {
  if (!isOpen || !coin) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const formatCurrency = (value) => {
    if (typeof value !== 'number') return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 animate-slide-up">
        
        {/* CABEÇALHO COLORIDO */}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-10"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 pb-6 relative">
            
            {/* LOGO FLUTUANTE */}
            <div className="absolute -top-12 left-6">
                <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md bg-white object-cover" 
                />
            </div>

            {/* CABEÇALHO DO CARD (CORRIGIDO) */}
            {/* Usamos pl-28 para empurrar o texto para a direita da logo */}
            <div className="mt-2 pl-28 flex justify-between items-start min-h-[60px]">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-2 leading-tight">
                        {coin.name} 
                        <span className="text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 px-2 py-0.5 rounded uppercase">
                            {coin.symbol}
                        </span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Rank #{coin.market_cap_rank}</p>
                </div>
                <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(coin.current_price)}</p>
                    <p className={`text-sm font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
                    </p>
                </div>
            </div>

            {/* GRID DE DETALHES */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Máxima 24h</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(coin.high_24h)}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Mínima 24h</p>
                    <p className="text-lg font-bold text-red-500 dark:text-red-400">{formatCurrency(coin.low_24h)}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Volume Total</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white truncate">
                        {new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short", style: 'currency', currency: 'BRL' }).format(coin.total_volume)}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Recorde (ATH)</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(coin.ath)}</p>
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20"
            >
                Fechar Detalhes
            </button>
        </div>
      </div>
    </div>
  )
}