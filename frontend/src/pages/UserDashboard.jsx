// src/pages/UserDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioChart from "../components/PortfolioChart";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import Simulator from "../components/Simulator";
import Settings from "../components/Settings";
import Toast from "../components/Toast";

export default function UserDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado do Toast (Aviso)
    const [toast, setToast] = useState(null);

    // --- DADOS APENAS NA MEMÓRIA (Reseta ao dar F5) ---
    const [transactions, setTransactions] = useState([]);
    const [resumo, setResumo] = useState({
        totalInvestido: 0,
        patrimonioAtual: 0,
        percentualRetorno: 0,
    });

    const fetchTransacoes = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/transacoes",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        }
    };

    const fetchDashboard = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            setResumo(data);
        }
    };

    const recarregarDados = () => {
        fetchTransacoes();
        fetchDashboard();
    };

    useEffect(() => {
        recarregarDados();
    }, []);

    const handleAddTransaction = async (newTransaction) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:3000/api/transacoes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newTransaction),
                },
            );

            if (response.ok) {
                setToast({
                    message: "Transação salva no banco com sucesso!",
                    type: "success",
                });
                setIsModalOpen(false);
                fetchTransacoes();
                fetchDashboard();
            } else {
                const data = await response.json();
                setToast({
                    message: data.erro || "Erro ao salvar",
                    type: "error",
                });
            }
        } catch (error) {
            setToast({
                message: "Erro de conexão com o servidor",
                type: "error",
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tipo_perfil");
        navigate("/");
    };

    // // Cálculos
    // const totalInvestido = transactions
    //     .filter((t) => t.type === "compra")
    //     .reduce((acc, curr) => acc + curr.value, 0);
    // const totalVendido = transactions
    //     .filter((t) => t.type === "venda")
    //     .reduce((acc, curr) => acc + curr.value, 0);
    // const saldoAtual = totalInvestido - totalVendido + 2500;

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 font-sans transition-colors duration-300 relative">
            {/* --- AQUI ESTÁ O TOAST --- */}
            {/* Se 'toast' existir, mostra o componente */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* SIDEBAR */}
            <aside className="w-64 bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col transition-colors duration-300">
                <div className="p-6 text-center border-b border-gray-100 dark:border-gray-800">
                    <div className="text-xl font-bold tracking-tighter flex items-center justify-center gap-2 text-gray-800 dark:text-white">
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
                        HUB
                        <span className="text-blue-600 dark:text-blue-500">
                            Invest
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        {
                            id: "overview",
                            label: "Visão Geral",
                            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                        },
                        {
                            id: "simulator",
                            label: "Simulador",
                            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                        },
                        {
                            id: "settings",
                            label: "Configurações",
                            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
                        },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeTab === item.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-white"
                            }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={item.icon}
                                />
                            </svg>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm pl-2 w-full transition-colors font-medium"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Sair da conta
                    </button>
                </div>
            </aside>

            {/* CONTEÚDO */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-end mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {activeTab === "overview"
                                ? "Visão Geral"
                                : activeTab === "simulator"
                                  ? "Simulador IA"
                                  : "Configurações"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {activeTab === "overview"
                                ? "Acompanhe sua evolução"
                                : activeTab === "simulator"
                                  ? "Projete o futuro"
                                  : "Gerencie preferências"}
                        </p>
                    </div>
                    {activeTab === "overview" && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Nova Transação
                        </button>
                    )}
                </header>

                {activeTab === "overview" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
                            {/* CARDS */}
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between transition-colors">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                        Total Investido
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                                        {new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(resumo.totalInvestido)}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <span className="text-xl">💰</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between transition-colors">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                        Patrimônio Atual
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                                        {new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(resumo.patrimonioAtual)}
                                    </p>
                                </div>
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                    <span className="text-xl">📈</span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between transition-colors">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                        Retorno
                                    </p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                                        {resumo.percentualRetorno}%
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                    <span className="text-xl">🚀</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                            <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                                    Evolução Patrimonial
                                </h3>
                                <PortfolioChart resumo={resumo} />
                            </div>
                            <div className="lg:col-span-1">
                                <TransactionList
                                    transactions={transactions}
                                    onAtualizar={recarregarDados}
                                />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "simulator" && (
                    <div className="animate-fade-in">
                        <Simulator />
                    </div>
                )}
                {activeTab === "settings" && (
                    <div className="animate-fade-in">
                        <Settings />
                    </div>
                )}
            </main>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTransaction}
            />
        </div>
    );
}
