// src/components/RegisterModal.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const navigate = useNavigate();
    const [nomeDigitado, setNomeDigitado] = useState("");
    const [emailDigitado, setEmailDigitado] = useState("");
    const [senhaDigitada, setSenhaDigitada] = useState("");

    if (!isOpen) return null;

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/registrar",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: nomeDigitado,
                        email: emailDigitado,
                        senha: senhaDigitada,
                        tipo_perfil: "comum",
                    }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                alert("Conta criada com sucesso! Faça login.");
                onClose();
                onSwitchToLogin();
            } else {
                alert(data.erro || "Erro ao criar conta");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all scale-100 p-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Crie sua conta
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Comece a investir em minutos
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            placeholder="Seu nome"
                            value={nomeDigitado}
                            onChange={(e) => setNomeDigitado(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            placeholder="exemplo@email.com"
                            value={emailDigitado}
                            onChange={(e) => setEmailDigitado(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                            placeholder="••••••••"
                            value={senhaDigitada}
                            onChange={(e) => setSenhaDigitada(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Criar Conta Grátis
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Já tem uma conta?{" "}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        </div>
    );
}
