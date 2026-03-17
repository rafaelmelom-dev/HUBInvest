import { useState } from "react";

export default function TransactionModal({ isOpen, onClose, onSave }) {
    const [type, setType] = useState("compra");
    const [asset, setAsset] = useState("");
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            ticker_ativo: asset.toUpperCase(),
            tipo_operacao: type,
            preco_pago: parseFloat(value),
            data: date.split("-").reverse().join("/"),
            quantidade: parseFloat(quantity),
        });
        setAsset("");
        setValue("");
        setDate("");
        setQuantity("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* CARD ADAPTÁVEL */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Nova Movimentação
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Seletor de Tipo */}
                    <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 dark:bg-slate-900 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setType("compra")}
                            className={`py-2 text-sm font-bold rounded-md transition-all ${
                                type === "compra"
                                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            Compra
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("venda")}
                            className={`py-2 text-sm font-bold rounded-md transition-all ${
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
                                value={asset}
                                onChange={(e) => setAsset(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase text-gray-900 dark:text-white"
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
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase text-gray-900 dark:text-white"
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
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
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
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition-colors ${type === "compra" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {type === "compra"
                            ? "Registrar Compra"
                            : "Registrar Venda"}
                    </button>
                </form>
            </div>
        </div>
    );
}
