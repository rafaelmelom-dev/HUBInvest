// src/components/Toast.jsx
import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  
  // Fecha automaticamente depois de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border-l-4 ${
        type === 'success' 
          ? 'bg-white dark:bg-slate-800 border-green-500 text-gray-800 dark:text-white' 
          : 'bg-white dark:bg-slate-800 border-red-500 text-gray-800 dark:text-white'
      }`}>
        <div className={`p-1 rounded-full ${type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {type === 'success' ? (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          ) : (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          )}
        </div>
        <div>
          <h4 className="font-bold text-sm">{type === 'success' ? 'Sucesso!' : 'Erro'}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
            &times;
        </button>
      </div>
    </div>
  )
}