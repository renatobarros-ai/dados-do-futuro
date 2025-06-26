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
    <div className="header">
      <div className="header-content">
        {/* Logo */}
        <div 
          onClick={() => navigate('/insights')}
          className="header-logo"
        >
          <div className="header-logo-container">
            <img 
              src="/logo_sohipren.png" 
              alt="Sohipren" 
              className="header-logo-image"
            />
          </div>
          <div className="header-text">
            <h1 className="header-title">Dados do Futuro</h1>
            <p className="header-subtitle">Sistema Preditivo</p>
          </div>
        </div>

        {/* Navegação Central */}
        <nav className="nav-buttons">
          <button
            onClick={() => navigate('/insights')}
            className={`nav-btn ${isActive('/insights') ? 'active' : ''}`}
          >
            <BarChart3 size={18} />
            <span>Insights</span>
          </button>
          
          <button
            onClick={() => navigate('/data')}
            className={`nav-btn ${isActive('/data') ? 'active' : ''}`}
          >
            <Database size={18} />
            <span>Dados</span>
          </button>
        </nav>

        {/* Controles Direita */}
        <div className="header-controls">
          {/* Toggle Modo Escuro */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
          >
            {theme === 'light' ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="logout-btn"
            title="Sair do sistema"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  )
}
