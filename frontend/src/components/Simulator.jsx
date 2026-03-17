// src/components/Simulator.jsx
import { useState, useEffect } from 'react'

export default function Simulator() {
  const [amount, setAmount] = useState(1000)
  const [months, setMonths] = useState(12)
  const [selectedType, setSelectedType] = useState('cdb') 
  const [cdiPercent, setCdiPercent] = useState(100) 
  const CDI_BASE_MENSAL = 0.9 
  const [rate, setRate] = useState(0.9)

  useEffect(() => {
    if (selectedType === 'cdb') {
      const calculatedRate = CDI_BASE_MENSAL * (cdiPercent / 100)
      setRate(parseFloat(calculatedRate.toFixed(2)))
    } 
    else if (selectedType === 'poupanca') setRate(0.5)
    else if (selectedType === 'acoes') setRate(2.5)
    else if (selectedType === 'bitcoin') setRate(8.0)
  }, [selectedType, cdiPercent])

  const total = amount * Math.pow((1 + rate / 100), months)
  const profit = total - amount

  return (
    // Fundo Branco (Light) / Slate-800 (Dark)
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 animate-fade-in transition-colors">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Simulador de Rendimentos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LADO ESQUERDO: CONTROLES */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valor Inicial (R$)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              // Inputs escuros no Dark Mode
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempo (Meses)</label>
            <input 
              type="range" 
              min="1" max="60" 
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-right text-sm text-blue-600 dark:text-blue-400 font-bold mt-1">{months} meses</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Escolha o Investimento:</label>
            
            {/* BOTÕES DE SELEÇÃO */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { id: 'poupanca', label: '🐷 Poupança', activeColor: 'bg-blue-600 border-blue-600 text-white' },
                  { id: 'cdb', label: '🏦 CDB (CDI)', activeColor: 'bg-blue-600 border-blue-600 text-white' },
                  { id: 'acoes', label: '📈 Ações', activeColor: 'bg-orange-500 border-orange-500 text-white' },
                  { id: 'bitcoin', label: '₿ Bitcoin', activeColor: 'bg-yellow-500 border-yellow-500 text-white' }
                ].map(btn => (
                  <button 
                    key={btn.id}
                    onClick={() => setSelectedType(btn.id)} 
                    className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                      selectedType === btn.id 
                      ? btn.activeColor 
                      : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
            </div>

            {/* ÁREA DINÂMICA */}
            <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
                {selectedType === 'cdb' ? (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Porcentagem do CDI</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                value={cdiPercent}
                                onChange={(e) => setCdiPercent(Number(e.target.value))}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-800 dark:text-white"
                            />
                            <span className="text-gray-500 dark:text-gray-400 font-bold">%</span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            Taxa efetiva: <strong>{rate}% ao mês</strong>
                        </p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Taxa Mensal Estimada</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-800 dark:text-white"
                            />
                            <span className="text-gray-500 dark:text-gray-400 font-bold">%</span>
                        </div>
                    </div>
                )}
            </div>

          </div>
        </div>

      
        <div className="bg-[#0f172a] text-white p-8 rounded-xl flex flex-col justify-center relative overflow-hidden shadow-2xl ring-1 ring-white/10">
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-700 ${rate > 3 ? 'bg-yellow-500' : rate > 1.0 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
          
          <div className="relative z-10 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Resultado Estimado</p>
            <p className="text-5xl font-bold text-white mb-2 tracking-tight">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
            </p>
            <div className="inline-block bg-white/10 px-4 py-1 rounded-full backdrop-blur-md border border-white/10">
              <p className="text-sm text-gray-300">
                Lucro: <span className="text-green-400 font-bold">+{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(profit)}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700/50">
             <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase font-semibold">
                <span>Investido</span>
                <span>Lucro</span>
             </div>
             <div className="flex w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div style={{ width: `${(amount / total) * 100}%` }} className="h-full bg-blue-600 transition-all duration-500"></div>
                <div style={{ width: `${(profit / total) * 100}%` }} className="h-full bg-green-500 transition-all duration-500"></div>
             </div>
             <div className="flex justify-between text-xs mt-2 text-gray-500">
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}</span>
                <span>{((profit / amount) * 100).toFixed(0)}% retorno</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}