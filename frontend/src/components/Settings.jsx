// src/components/Settings.jsx
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext"; // <--- Importe o hook
import { useEffect } from "react";

export default function Settings() {
    const { theme, setTheme } = useTheme(); // <--- Pegue a função de trocar
    const [activeTab, setActiveTab] = useState("perfil");
    const [name, setName] = useState(localStorage.getItem("nome") ?? "");

    const changeName = async () => {
        localStorage.setItem("nome", name);
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:3000/api/usuarios/atualizar",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nome: name }),
            },
        );

        if (response.ok) {
            alert("Nome atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar o nome.");
        }
    };

    return (
        // Adicionamos dark:bg-slate-800 e dark:border-slate-700 no container principal
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 animate-fade-in overflow-hidden transition-colors">
            <div className="border-b border-gray-100 dark:border-slate-700 p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Minha Conta
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gerencie seus dados e preferências
                </p>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Menu Lateral */}
                <div className="w-full md:w-64 bg-gray-50 dark:bg-slate-900/50 p-4 border-r border-gray-100 dark:border-slate-700 space-y-1">
                    {["perfil", "seguranca", "aparencia"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                                activeTab === tab
                                    ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                            }`}
                        >
                            {tab === "aparencia"
                                ? "🎨 Aparência"
                                : tab === "seguranca"
                                  ? "🔒 Segurança"
                                  : "👤 Perfil"}
                        </button>
                    ))}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-6 text-gray-800 dark:text-gray-200">
                    {/* ABA PERFIL (Resumida para focar no tema) */}
                    {activeTab === "perfil" && (
                        <div className="space-y-6">
                            {/* Exemplo de input dark mode */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            {/* <p className="text-sm text-gray-500">
                                    O restante do formulário segue o mesmo
                                    padrão...
                                </p>*/}
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                                onClick={changeName}
                            >
                                Salvar alterações
                            </button>
                        </div>
                    )}

                    {/* ABA APARÊNCIA (AQUI É A MÁGICA) */}
                    {activeTab === "aparencia" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold mb-4 dark:text-white">
                                    Tema do Sistema
                                </h3>
                                <div className="flex gap-4">
                                    {/* Botão Claro */}
                                    <div
                                        onClick={() => setTheme("light")}
                                        className={`border-2 p-3 rounded-xl cursor-pointer transition-all ${theme === "light" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-slate-600 hover:border-gray-300"}`}
                                    >
                                        <div className="w-24 h-16 bg-gray-100 rounded-lg mb-2 border border-gray-200 shadow-sm flex items-center justify-center">
                                            <span className="text-xl">☀️</span>
                                        </div>
                                        <span
                                            className={`text-sm font-bold block text-center ${theme === "light" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
                                        >
                                            Claro
                                        </span>
                                    </div>

                                    {/* Botão Escuro */}
                                    <div
                                        onClick={() => setTheme("dark")}
                                        className={`border-2 p-3 rounded-xl cursor-pointer transition-all ${theme === "dark" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-slate-600 hover:border-gray-300"}`}
                                    >
                                        <div className="w-24 h-16 bg-slate-800 rounded-lg mb-2 border border-slate-700 shadow-sm flex items-center justify-center">
                                            <span className="text-xl">🌙</span>
                                        </div>
                                        <span
                                            className={`text-sm font-bold block text-center ${theme === "dark" ? "text-blue-600" : "text-gray-500 dark:text-gray-400"}`}
                                        >
                                            Escuro
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
