import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Inference() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const steps = useMemo(() => [
    { 
      id: 1, 
      title: "Carregando modelo IBM Granite Time Series TTM R2", 
      subtitle: "Inicializando algoritmos de séries temporais...",
      duration: 1200 
    },
    { 
      id: 2, 
      title: "Processando dados de 6 estados", 
      subtitle: "Analisando SP, MG, PR, RS, GO, EX...",
      duration: 1000 
    },
    { 
      id: 3, 
      title: "Analisando top 100 produtos por estado", 
      subtitle: "Identificando padrões de vendas...",
      duration: 1300 
    },
    { 
      id: 4, 
      title: "Calculando previsões julho/2025 - Setembro/2025", 
      subtitle: "Gerando insights preditivos...",
      duration: 1100 
    },
    { 
      id: 5, 
      title: "Identificando padrões comerciais", 
      subtitle: "Processamento concluído com sucesso!",
      duration: 800 
    }
  ], [])

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, steps[currentStep]?.duration || 1000)

      return () => clearTimeout(timer)
    } else {
      // Todos os steps concluídos, redirecionar após delay
      const redirectTimer = setTimeout(() => {
        navigate('/insights')
      }, 1500)

      return () => clearTimeout(redirectTimer)
    }
  }, [currentStep, navigate, steps])

  useEffect(() => {
    // Atualizar progresso suavemente
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const targetProgress = ((currentStep + 1) / steps.length) * 100
        if (prev < targetProgress) {
          return Math.min(prev + 2, targetProgress)
        }
        return prev
      })
    }, 50)

    return () => clearInterval(progressTimer)
  }, [currentStep, steps.length])

  return (
    <div className="inference-container">
      <div className="inference-content">
        {/* Logo IBM */}
        <div className="ibm-logo-container">
          <div className="ibm-logo">
            <img 
              src="/logo_ibm.png" 
              alt="IBM" 
              className="ibm-logo-image"
            />
        </div>
        </div>

        {/* Título Principal */}
        <div className="inference-header">
          <h1 className="inference-title">
            IBM Granite Time Series TTM R2
          </h1>
          <p className="inference-subtitle">
            Modelo Avançado de Previsão de Séries Temporais
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-text">
            {Math.round(progress)}% Concluído
          </div>
        </div>

        {/* Steps */}
        <div className="steps-container">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`step ${index <= currentStep ? 'step-active' : ''} ${index < currentStep ? 'step-completed' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStep ? (
                  <svg className="step-check" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : index === currentStep ? (
                  <div className="step-spinner" />
                ) : (
                  <span className="step-number">{step.id}</span>
                )}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-subtitle">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status Final */}
        {currentStep >= steps.length && (
          <div className="completion-message">
            <div className="completion-icon">✓</div>
            <p>Redirecionando para insights...</p>
          </div>
        )}
      </div>
    </div>
  )
}
