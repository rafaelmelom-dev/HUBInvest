// src/components/TransactionModal.jsx
import { useState, useEffect } from "react";

export default function TransactionModal({ isOpen, onClose, onSave }) {
    const [type, setType] = useState("compra");
    const [asset, setAsset] = useState("");
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Animação de entrada — mesmo padrão do LoginModal
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        let timer;
        if (isOpen) {
            setVisible(true);
            timer = setTimeout(() => setAnimating(true), 10);
        } else {
            setAnimating(false);
            timer = setTimeout(() => setVisible(false), 300);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    if (!visible) return null;

    const resetForm = () => {
        setAsset("");
        setValue("");
        setDate("");
        setQuantity("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // onSave agora é aguardado — o UserDashboard precisa retornar
            // uma Promise (handleAddTransaction já é async, então funciona)
            await onSave({
                ticker_ativo: asset.toUpperCase(),
                tipo_operacao: type,
                preco_pago: parseFloat(value),
                data: date.split("-").reverse().join("/"),
                quantidade: parseFloat(quantity),
            });
            // Só reseta e fecha se o save foi bem sucedido
            resetForm();
        } catch {
            // Erro já tratado no UserDashboard via Toast — só para o spinner
        } finally {
            setIsLoading(false);
        }
    };

    const corBotao = type === "compra"
        ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
        : "bg-green-600 hover:bg-green-700 disabled:bg-green-400";

    const textoBotao = type === "compra" ? "Registrar Compra" : "Registrar Venda";
    const textoLoading = type === "compra" ? "Registrando..." : "Registrando...";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: animating ? 1 : 0 }}
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Card */}
            <div
                className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 transition-all duration-300"
                style={{
                    opacity: animating ? 1 : 0,
                    transform: animating ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
                }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Nova Movimentação
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Seletor Compra / Venda */}
                    <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 dark:bg-slate-900 rounded-lg">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setType("compra")}
                            className={`py-2 text-sm font-bold rounded-md transition-all disabled:cursor-not-allowed ${
                                type === "compra"
                                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            Compra
                        </button>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setType("venda")}
                            className={`py-2 text-sm font-bold rounded-md transition-all disabled:cursor-not-allowed ${
                                type === "venda"
                                    ? "bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            Venda
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Ativo (Ticker)
                            </label>
                            <input
                                required
                                type="text"
                                disabled={isLoading}
                                value={asset}
                                onChange={(e) => setAsset(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Ex: BTC, PETR4"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Quantidade
                            </label>
                            <input
                                required
                                type="number"
                                step="0.00001"
                                disabled={isLoading}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="0,00"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Valor (R$)
                            </label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                disabled={isLoading}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="0,00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Data
                            </label>
                            <input
                                required
                                type="date"
                                disabled={isLoading}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-75 ${corBotao}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                {textoLoading}
                            </>
                        ) : (
                            textoBotao
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}