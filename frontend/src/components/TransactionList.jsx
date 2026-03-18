// src/components/TransactionList.jsx
import EditTransactionModal from "./EditTransactionModal";
import { useState } from "react";

export default function TransactionList({ transactions, onAtualizar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Map de id → { editing: bool, deleting: bool }
    // Permite loading independente por linha sem afetar as outras
    const [rowLoading, setRowLoading] = useState({});

    const setLoading = (id, key, value) =>
        setRowLoading(prev => ({
            ...prev,
            [id]: { ...prev[id], [key]: value },
        }));

    const handleEditTransaction = async (transacao) => {
        const id = transacao.id_transacao;
        const token = localStorage.getItem("token");
        setLoading(id, "editing", true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/transacoes/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(transacao),
                },
            );
            if (response.ok) {
                setIsModalOpen(false);
                onAtualizar();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(id, "editing", false);
        }
    };

    const handleDeletion = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setLoading(id, "deleting", true);
        try {
            await fetch(`http://localhost:3000/api/transacoes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            onAtualizar();
        } catch (error) {
            console.error("Erro ao remover transação:", error);
        } finally {
            setLoading(id, "deleting", false);
        }
    };

    const getAssetIcon = (ticker) => {
        const cryptoMap = {
            BTC: "https://assets.coincap.io/assets/icons/btc@2x.png",
            ETH: "https://assets.coincap.io/assets/icons/eth@2x.png",
            SOL: "https://assets.coincap.io/assets/icons/sol@2x.png",
            USDT: "https://assets.coincap.io/assets/icons/usdt@2x.png",
        };
        const src = cryptoMap[ticker]
            ?? `https://ui-avatars.com/api/?name=${ticker}&background=random&color=fff&size=64`;
        return <img src={src} alt={ticker} className="w-8 h-8 rounded-full" />;
    };

    return (
        <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                <h3 className="font-bold text-gray-700 dark:text-white mb-4 text-lg">
                    Histórico de Transações
                </h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-4 py-3">Data</th>
                                <th className="px-4 py-3">Ativo</th>
                                <th className="px-4 py-3 text-center">Tipo</th>
                                <th className="px-4 py-3 text-right">Valor</th>
                                <th className="px-4 py-3 text-right">Quantidade</th>
                                <th className="px-4 py-3 text-center">Editar</th>
                                <th className="px-4 py-3 text-center">Remover</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {transactions.map((t) => {
                                const id = t.id_transacao;
                                const isEditing  = rowLoading[id]?.editing  ?? false;
                                const isDeleting = rowLoading[id]?.deleting ?? false;
                                const isBusy     = isEditing || isDeleting;

                                return (
                                    <tr
                                        key={id}
                                        className={`transition-colors ${
                                            isBusy
                                                ? "opacity-60"
                                                : "hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                        }`}
                                    >
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                            {t.data}
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                {getAssetIcon(t.ticker_ativo)}
                                                <span>{t.ticker_ativo}</span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                t.tipo_operacao === "compra"
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            }`}>
                                                {t.tipo_operacao === "compra" ? "COMPRA" : "VENDA"}
                                            </span>
                                        </td>

                                        <td className={`px-4 py-3 text-right font-medium ${
                                            t.tipo_operacao === "compra"
                                                ? "text-red-600 dark:text-red-400"
                                                : "text-green-600 dark:text-green-400"
                                        }`}>
                                            {t.tipo_operacao === "compra" ? "-" : "+"}
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(t.preco_pago)}
                                        </td>

                                        <td className="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "decimal",
                                                minimumFractionDigits: 10,
                                            }).format(t.quantidade)}
                                        </td>

                                        {/* Botão Editar */}
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                disabled={isBusy}
                                                onClick={() => {
                                                    setEditingTransaction(t);
                                                    setIsModalOpen(true);
                                                }}
                                                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                                            >
                                                {isEditing ? (
                                                    <>
                                                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                                        </svg>
                                                        Salvando
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                        </svg>
                                                        Editar
                                                    </>
                                                )}
                                            </button>
                                        </td>

                                        {/* Botão Remover */}
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                disabled={isBusy}
                                                onClick={() => handleDeletion(id)}
                                                className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
                                            >
                                                {isDeleting ? (
                                                    <>
                                                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                                        </svg>
                                                        Removendo
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                        </svg>
                                                        Remover
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {transactions.length === 0 && (
                        <p className="text-center text-gray-400 py-8">
                            Nenhuma transação encontrada.
                        </p>
                    )}
                </div>
            </div>

            <EditTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleEditTransaction}
                transacao={editingTransaction}
            />
        </>
    );
}