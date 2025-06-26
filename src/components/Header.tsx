import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, LogOut, BarChart3, Database } from 'lucide-react'

export default function Header() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-app mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-corporate-blue rounded-lg flex items-center justify-center 
                          group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Dados do Futuro
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                Sistema Preditivo
              </p>
            </div>
          </div>

          {/* Navegação Central */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => navigate('/insights')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/insights')
                  ? 'bg-corporate-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <BarChart3 size={18} />
              <span className="font-medium">Insights</span>
            </button>
            
            <button
              onClick={() => navigate('/data')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/data')
                  ? 'bg-corporate-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Database size={18} />
              <span className="font-medium">Dados</span>
            </button>
          </nav>

          {/* Controles Direita */}
          <div className="flex items-center gap-3">
            {/* Toggle Modo Escuro */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 
                       hover:bg-slate-200 dark:hover:bg-slate-600
                       transition-colors duration-200"
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? (
                <Moon size={18} className="text-slate-600" />
              ) : (
                <Sun size={18} className="text-yellow-500" />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                       text-slate-600 dark:text-slate-300
                       hover:bg-red-50 dark:hover:bg-red-900/20
                       hover:text-red-600 dark:hover:text-red-400
                       transition-all duration-200"
              title="Sair do sistema"
            >
              <LogOut size={18} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
