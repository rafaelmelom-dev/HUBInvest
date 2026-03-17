// src/components/TransactionList.jsx
import EditTransactionModal from "./EditTransactionModal";
import { useState } from "react";

export default function TransactionList({ transactions, onAtualizar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleEditTransaction = async (transacao) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:3000/api/transacoes/${transacao.id_transacao}`,
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
                onAtualizar();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletion = async (id_transacao) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/transacoes/${id_transacao}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            onAtualizar();
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        }
    };

    const getAssetIcon = (ticker) => {
        const cryptoMap = {
            BTC: "https://assets.coincap.io/assets/icons/btc@2x.png",
            ETH: "https://assets.coincap.io/assets/icons/eth@2x.png",
            SOL: "https://assets.coincap.io/assets/icons/sol@2x.png",
            USDT: "https://assets.coincap.io/assets/icons/usdt@2x.png",
        };

        if (cryptoMap[ticker]) {
            return (
                <img
                    src={cryptoMap[ticker]}
                    alt={ticker}
                    className="w-8 h-8 rounded-full"
                />
            );
        } else {
            return (
                <img
                    src={`https://ui-avatars.com/api/?name=${ticker}&background=random&color=fff&size=64`}
                    alt={ticker}
                    className="w-8 h-8 rounded-full"
                />
            );
        }
    };

    return (
        // ADICIONADO: dark:bg-slate-800 dark:border-slate-700
        <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                <h3 className="font-bold text-gray-700 dark:text-white mb-4 text-lg">
                    Histórico de Transações
                </h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        {/* Cabeçalho Escuro no Dark Mode */}
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-4 py-3">Data</th>
                                <th className="px-4 py-3">Ativo</th>
                                <th className="px-4 py-3 text-center">Tipo</th>
                                <th className="px-4 py-3 text-right">Valor</th>
                                <th className="px-4 py-3 text-right">
                                    Quantidade
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Editar
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Remover
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {transactions.map((t) => (
                                <tr
                                    key={t.id_transacao}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
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
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                t.tipo_operacao === "compra"
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            }`}
                                        >
                                            {t.tipo_operacao === "compra"
                                                ? "COMPRA"
                                                : "VENDA"}
                                        </span>
                                    </td>
                                    <td
                                        className={`px-4 py-3 text-right font-medium ${
                                            t.tipo_operacao === "compra"
                                                ? "text-red-600 dark:text-red-400"
                                                : "text-green-600 dark:text-green-400"
                                        }`}
                                    >
                                        {t.tipo_operacao === "compra"
                                            ? "-"
                                            : "+"}
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
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => {
                                                setEditingTransaction(t);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 dark:text-blue-400"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() =>
                                                handleDeletion(t.id_transacao)
                                            }
                                            className="text-red-600 dark:text-red-400"
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {transactions.length === 0 && (
                        <p className="text-center text-gray-400 py-4">
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
