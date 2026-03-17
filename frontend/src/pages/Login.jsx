// src/pages/Login.jsx
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen flex">
      
      {/* --- LADO ESQUERDO (Visual / Marketing) --- */}
      {/* Só aparece em telas grandes (lg) */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        
        {/* Efeito de Fundo (Gradiente Abstrato) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        {/* Logo e Texto */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <span className="text-2xl font-bold tracking-wider">HUB Invest</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Domine seus <br/>
            <span className="text-indigo-400">investimentos</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-md">
            Acompanhe criptomoedas, ações e fundos em um único lugar. 
            Simule cenários e tome decisões baseadas em dados.
          </p>
        </div>

        {/* Depoimento / Footer Visual */}
        <div className="relative z-10">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                <p className="italic text-gray-300 mb-4">"Finalmente consegui organizar minha carteira de Bitcoin e Ações sem precisar de mil planilhas."</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">T</div>
                    <div>
                        <p className="font-bold text-sm">Túlio M.</p>
                        <p className="text-xs text-gray-500">Investidor desde 2024</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- LADO DIREITO (Formulário) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h2>
            <p className="mt-2 text-gray-500">Entre com suas credenciais para acessar o painel.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all" 
                  placeholder="exemplo@email.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all" 
                  placeholder="••••••••" 
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</a>
              </div>
            </div>

            <button type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Entrar na Plataforma
            </button>
          </form>

          {/* Links de Desenvolvimento (Estilizados como Menu Dev) */}
          <div className="pt-8 mt-8 border-t border-gray-100">
             <p className="text-xs text-gray-400 text-center uppercase tracking-widest mb-4">Ambiente de Desenvolvimento</p>
             <div className="grid grid-cols-2 gap-4">
                <Link to="/admin" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                    Admin Panel
                </Link>
                <Link to="/dashboard" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors group">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                    User Dashboard
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}