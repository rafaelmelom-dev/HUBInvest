// src/pages/AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [recentActivity] = useState([
        {
            id: 1,
            action: "Novo Usuário",
            detail: "Carlos Eduardo se cadastrou",
            time: "2 min atrás",
            type: "user",
        },
        {
            id: 2,
            action: "Ativo Atualizado",
            detail: "Preço do BTC ajustado",
            time: "15 min atrás",
            type: "asset",
        },
        {
            id: 3,
            action: "Novo Ativo",
            detail: "Ação MGLU3 adicionada",
            time: "1 hora atrás",
            type: "asset",
        },
        {
            id: 4,
            action: "Novo Usuário",
            detail: "Ana Paula se cadastrou",
            time: "3 horas atrás",
            type: "user",
        },
    ]);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            const tipo_perfil = localStorage.getItem("tipo_perfil");

            if (!token || !tipo_perfil) {
                navigate("/");
            }

            if (tipo_perfil !== "admin") {
                navigate("/");
            }
        };
        checkUser();
    }, []);

    return (
        // Fundo Geral: Branco gelo no Light / Slate 900 no Dark
        <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 font-sans transition-colors duration-300">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col z-10 transition-colors">
                <div className="p-6 text-center border-b border-gray-100 dark:border-gray-800">
                    <div className="mb-3 flex justify-center">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold tracking-wider text-gray-800 dark:text-white">
                        ADMIN
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Painel de Controle
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2 font-medium">
                    <button className="flex items-center gap-3 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/30">
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
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                        Visão Geral
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all">
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
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Ativos & Criptos
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all">
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
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        Usuários
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm pl-2 transition-colors font-medium"
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
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                localStorage.removeItem("nome");
                            }}
                        >
                            Sair do Sistema
                        </button>
                    </Link>
                </div>
            </aside>

            {/* ÁREA PRINCIPAL */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 hidden md:block">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Painel do Sistema
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Status e atalhos de gerenciamento.
                    </p>
                </header>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Total Usuários
                            </p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                1,245
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Ativos Listados
                            </p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                84
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 transition-colors">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Status Sistema
                            </p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                Operacional
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 opacity-60">
                        <div className="p-3 bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-300 rounded-lg">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Avisos
                            </p>
                            <p className="text-lg font-bold text-gray-600 dark:text-gray-300">
                                Nenhum
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* AÇÕES */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            Gerenciar Ativos
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            Cadastre novas criptos e ações.
                                        </p>
                                    </div>
                                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors">
                                    Adicionar Novo Ativo
                                </button>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            Base de Usuários
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            Visualize cadastros e acessos.
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <button className="w-full py-3 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-2 transition-all bg-transparent">
                                    Ver Lista Completa
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* LOGS */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-between">
                                Atividade do Sistema
                            </h3>
                            <div className="space-y-4">
                                {recentActivity.map((log) => (
                                    <div
                                        key={log.id}
                                        className="flex items-start gap-3 pb-3 border-b border-gray-50 dark:border-slate-700 last:border-0 last:pb-0"
                                    >
                                        <div
                                            className={`p-2 rounded-full flex-shrink-0 ${log.type === "user" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-500" : "bg-orange-50 dark:bg-orange-900/30 text-orange-500"}`}
                                        >
                                            {log.type === "user" ? (
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
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            ) : (
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
                                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                                {log.detail}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {log.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
