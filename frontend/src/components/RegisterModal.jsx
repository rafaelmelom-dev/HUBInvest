// src/components/RegisterModal.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const navigate = useNavigate();
    const [nomeDigitado, setNomeDigitado] = useState("");
    const [emailDigitado, setEmailDigitado] = useState("");
    const [senhaDigitada, setSenhaDigitada] = useState("");

    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nomeDigitado,
                    email: emailDigitado,
                    senha: senhaDigitada,
                    tipo_perfil: "comum",
                }),
            });
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop — fade in/out */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: animating ? 1 : 0 }}
            />

            {/* Card do modal — scale + fade + leve subida */}
            <div
                className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transition-all duration-300"
                style={{
                    opacity: animating ? 1 : 0,
                    transform: animating ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            value={senhaDigitada}
                            onChange={(e) => setSenhaDigitada(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Criando conta...
                            </>
                        ) : (
                            "Criar Conta Grátis"
                        )}
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