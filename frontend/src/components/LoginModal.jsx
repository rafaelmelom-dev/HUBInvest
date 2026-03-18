// src/components/LoginModal.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const navigate = useNavigate();
    const [emailDigitado, setEmailDigitado] = useState("");
    const [senhaDigitada, setSenhaDigitada] = useState("");

    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (isOpen) {
            // 1. Monta o componente com estado inicial (invisível, deslocado)
            setVisible(true);
            // 2. Aguarda 10ms para o browser pintar o estado inicial,
            //    só então ativa a transição CSS para o estado final
            timer = setTimeout(() => setAnimating(true), 10);
        } else {
            // 1. Dispara a animação de saída
            setAnimating(false);
            // 2. Desmonta após a transição terminar (300ms)
            timer = setTimeout(() => setVisible(false), 300);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    if (!visible) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("tipo_perfil", data.tipo_perfil);
                localStorage.setItem("nome", data.nome);
                onClose();
                if (data.tipo_perfil === "admin") navigate("/admin");
                else navigate("/dashboard");
            } else {
                alert(data.erro || "Email ou senha incorretos");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: animating ? 1 : 0 }}
            />

            {/* Card do modal */}
            <div
                className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transition-all duration-300"
                style={{
                    opacity: animating ? 1 : 0,
                    transform: animating
                        ? "scale(1) translateY(0)"
                        : "scale(0.95) translateY(12px)",
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

                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Acesse sua conta
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Gerencie seus ativos com segurança
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            value={senhaDigitada}
                            onChange={(e) => setSenhaDigitada(e.target.value)}
                        />
                        <div className="flex justify-end mt-1">
                            <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                Esqueceu a senha?
                            </a>
                        </div>
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
                                Entrando...
                            </>
                        ) : (
                            "Entrar no Hub"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Não tem conta?{" "}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        Registre-se grátis
                    </button>
                </div>
            </div>
        </div>
    );
}