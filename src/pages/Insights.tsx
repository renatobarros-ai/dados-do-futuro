import Header from '../components/Header'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Globe, Clock, BarChart3, PieChart } from 'lucide-react'

export default function Insights() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div className="insights-header">
          <h1 className="page-title">Insights Comerciais</h1>
          <p className="insights-subtitle">
            Análises preditivas baseadas em séries temporais dos próximos 3 meses - Período: Jul/2025 a Set/2025
          </p>
        </div>

        {/* Métricas Principais */}
        <div className="metrics-grid">
          <div className="metric-card metric-primary">
            <div className="metric-icon">
              <BarChart3 size={24} />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">1.563</h3>
              <p className="metric-label">Previsões Geradas</p>
            </div>
          </div>

          <div className="metric-card metric-success">
            <div className="metric-icon">
              <TrendingUp size={24} />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">R$ 7.241</h3>
              <p className="metric-label">Ticket Médio</p>
            </div>
          </div>

          <div className="metric-card metric-info">
            <div className="metric-icon">
              <Globe size={24} />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">6</h3>
              <p className="metric-label">Estados Analisados</p>
            </div>
          </div>

          <div className="metric-card metric-warning">
            <div className="metric-icon">
              <PieChart size={24} />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">15%</h3>
              <p className="metric-label">Participação EX</p>
            </div>
          </div>
        </div>

        {/* Cards de Insights */}
        <div className="insights-grid">
          
          {/* Tendências Identificadas */}
          <div className="insight-card trend-card">
            <div className="card-header">
              <div className="card-icon trend-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="card-title">Tendências Identificadas</h3>
                <span className="confidence-badge high">Alta Confiança</span>
              </div>
            </div>
            <div className="card-content">
              <div className="trend-item">
                <h4>BOMBA CNH A-008 (EX)</h4>
                <p>Pico previsto para agosto (68 unidades), seguido de declínio</p>
                <span className="trend-context">Baseado em padrão sazonal identificado</span>
              </div>
              <div className="trend-item">
                <h4>MUD BO 8 (SP/MG)</h4>
                <p>Performance forte em SP/MG, ausente em GO/PR/RS</p>
                <span className="trend-context">Potencial de expansão geográfica identificado</span>
              </div>
            </div>
          </div>

          {/* Padrões Analíticos */}
          <div className="insight-card pattern-card">
            <div className="card-header">
              <div className="card-icon pattern-icon">
                <Target size={20} />
              </div>
              <div>
                <h3 className="card-title">Padrões Analíticos</h3>
                <span className="confidence-badge high">Alto (3+ meses)</span>
              </div>
            </div>
            <div className="card-content">
              <div className="pattern-item">
                <h4>Especialização Regional</h4>
                <p>GO apresenta concentração em Bombas CNH (3x média nacional)</p>
                <span className="pattern-implication">Estratégia regional pode ser replicável</span>
              </div>
              <div className="pattern-item">
                <h4>Mercado Internacional Subestimado</h4>
                <p>EX representa 15% volume, mas maior ticket médio</p>
                <span className="pattern-implication">Potencial de ampliação de portfólio para exportação</span>
              </div>
            </div>
          </div>

          {/* Variações Regionais */}
          <div className="insight-card regional-card">
            <div className="card-header">
              <div className="card-icon regional-icon">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="card-title">Variações Regionais</h3>
                <span className="confidence-badge medium">Médio</span>
              </div>
            </div>
            <div className="card-content">
              <div className="regional-item">
                <div className="region-row">
                  <span className="region-name">Goiás (GO)</span>
                  <span className="region-specialty">Especialista em Bombas CNH</span>
                </div>
                <div className="region-row">
                  <span className="region-name">São Paulo (SP)</span>
                  <span className="region-specialty">Portfólio Diversificado</span>
                </div>
                <div className="region-row">
                  <span className="region-name">Exportação (EX)</span>
                  <span className="region-specialty">Alto Valor Agregado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pontos de Atenção */}
          <div className="insight-card attention-card">
            <div className="card-header">
              <div className="card-icon attention-icon">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="card-title">Pontos de Atenção</h3>
                <span className="confidence-badge medium">Monitoramento</span>
              </div>
            </div>
            <div className="card-content">
              <div className="attention-item risk">
                <h4>Declínio Projetado</h4>
                <p>Produto com redução de 40% prevista pós-agosto</p>
                <span className="attention-action">Monitoramento próximo sugerido</span>
              </div>
              <div className="attention-item warning">
                <h4>Concentração de Risco</h4>
                <p>85% das vendas concentradas em 3 estados</p>
                <span className="attention-action">Considerar diversificação geográfica</span>
              </div>
            </div>
          </div>

          {/* Análise Temporal */}
          <div className="insight-card temporal-card">
            <div className="card-header">
              <div className="card-icon temporal-icon">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="card-title">Análise Temporal</h3>
                <span className="confidence-badge high">Padrão Consistente</span>
              </div>
            </div>
            <div className="card-content">
              <div className="temporal-item">
                <h4>Tendência Trimestral</h4>
                <p>Bombas CNH: crescimento esperado | Motores MLS: estabilidade</p>
              </div>
              <div className="temporal-item">
                <h4>Variação Mensal</h4>
                <p>Flutuação de até 45% entre meses no período analisado</p>
              </div>
            </div>
          </div>

          {/* Simulador de Cenários */}
          <div className="insight-card scenario-card">
            <div className="card-header">
              <div className="card-icon scenario-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="card-title">Cenários Projetados</h3>
                <span className="confidence-badge medium">Simulação</span>
              </div>
            </div>
            <div className="card-content">
              <div className="scenario-item">
                <h4>Replicação de Performance Regional</h4>
                <p>Aplicar estratégia GO (Bombas CNH) em SP</p>
                <div className="scenario-metrics">
                  <span className="metric">~156 unidades adicionais</span>
                  <span className="metric">R$ 245.000 potencial</span>
                  <span className="probability moderate">Probabilidade: Moderada a Alta</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
