import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const success = login(username, password)
      
      if (success) {
        navigate('/inference')
      } else {
        setError('Credenciais inválidas')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo">S</div>
          <h1 className="title">Dados do Futuro</h1>
          <p className="subtitle">Sistema Preditivo Comercial</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Login</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Digite seu login"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error && (
            <div className="error">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="credentials-hint">
          <strong>Credenciais de teste:</strong><br />
          Login: <code>massa</code> | Senha: <code>sohipren</code>
        </div>
      </div>
    </div>
  )
}
