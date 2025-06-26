import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  BarChart3, 
  Eye, 
  Activity,
  Medal,
  AlertTriangle
} from 'lucide-react'

interface InsightItem {
  titulo: string
  descricao: string
  contexto: string
}

interface InsightCard {
  titulo: string
  confianca: string
  items: InsightItem[]
}

interface InsightsData {
  tendencia_nacional: InsightCard
  volatilidade_estados: InsightCard
  produtos_alta: InsightCard
  produtos_baixa: InsightCard
  produtos_base: InsightCard
  produtos_observacao: InsightCard
}

export default function Insights() {
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/data/insights_cards.json')
        if (!response.ok) {
          throw new Error('Erro ao carregar insights')
        }
        const data = await response.json()
        setInsightsData(data)
      } catch (err) {
        console.error('Erro ao carregar insights:', err)
        setError('Erro ao carregar dados de insights')
      } finally {
        setIsLoading(false)
      }
    }

    loadInsights()
  }, [])

  // Função para extrair info do produto
  const parseProductInfo = (titulo: string, descricao: string) => {
    const match = titulo.match(/^(.+?)\s*\((\w+)\)/)
    if (match) {
      return {
        codigo: match[1],
        uf: match[2],
        nome: descricao.includes('vendas') ? 'Volume' : descricao.split(' ')[0]
      }
    }
    return { codigo: titulo, uf: '', nome: '' }
  }

  // Função para extrair percentual
  const parsePercentage = (descricao: string) => {
    const match = descricao.match(/([+-]?\d+\.?\d*)%/)
    return match ? match[1] : '0'
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Processando insights com IBM Granite...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !insightsData) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="error-container">
            <p>❌ {error || 'Erro ao carregar insights'}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="insights-header">
          <h1 className="page-title">Insights Comerciais</h1>
          <p className="insights-subtitle">
            Análises baseadas em dados reais processados pelo IBM Granite - Jul/Ago/Set 2025
          </p>
        </div>

        {/* Cards de Insights Redesenhados */}
        <div className="insights-grid-new">
          
          {/* 1. Crescimento Nacional */}
          <div className="insight-card-new growth-card">
            <div className="card-header-new">
              <div className="card-icon-new growth-icon">
                <Activity size={24} />
              </div>
              <h3 className="card-title-new">Crescimento Nacional</h3>
            </div>
            <div className="card-content-new">
              <div className="variation-month">
                <div className="month-label">Julho → Agosto</div>
                <div className="variation-value positive">+157.4%</div>
                <div className="variation-detail">584 → 1.503 vendas</div>
              </div>
              <div className="variation-month">
                <div className="month-label">Agosto → Setembro</div>
                <div className="variation-value negative">-21.8%</div>
                <div className="variation-detail">1.503 → 1.176 vendas</div>
              </div>
            </div>
          </div>

          {/* 2. Estados Mais Voláteis */}
          <div className="insight-card-new volatility-card">
            <div className="card-header-new">
              <div className="card-icon-new volatility-icon">
                <Zap size={24} />
              </div>
              <h3 className="card-title-new">Estados Mais Voláteis</h3>
            </div>
            <div className="card-content-new">
              {insightsData.volatilidade_estados.items.map((item, index) => {
                const volatilidade = item.descricao.match(/(\d+\.?\d*)%/)?.[1] || '0'
                const variacao = item.contexto.match(/([+-]\d+\.?\d*)%/)?.[1] || '0'
                const uf = item.titulo.split(' ')[2]
                
                return (
                  <div key={index} className="ranking-item">
                    <div className="ranking-position">{index + 1}º</div>
                    <div className="ranking-content">
                      <div className="ranking-title">{uf}</div>
                      <div className="ranking-metric">{volatilidade}% volatilidade</div>
                      <div className="ranking-detail">Jul→Set: {variacao}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 3. Maiores Crescimentos */}
          <div className="insight-card-new growth-products-card">
            <div className="card-header-new">
              <div className="card-icon-new growth-products-icon">
                <TrendingUp size={24} />
              </div>
              <h3 className="card-title-new">Maiores Crescimentos</h3>
            </div>
            <div className="card-content-new">
              {insightsData.produtos_alta.items.map((item, index) => {
                const produto = parseProductInfo(item.titulo, item.descricao)
                const crescimento = parsePercentage(item.descricao)
                const vendas = item.contexto.match(/(\d+) → (\d+)/)
                
                return (
                  <div key={index} className="ranking-item">
                    <div className="ranking-position">{index + 1}º</div>
                    <div className="ranking-content">
                      <div className="ranking-title">{produto.codigo}</div>
                      <div className="ranking-location">{produto.uf}</div>
                      <div className="ranking-metric positive">+{crescimento}%</div>
                      <div className="ranking-detail">
                        {vendas ? `${vendas[1]} → ${vendas[2]} vendas` : item.contexto}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4. Maiores Declínios */}
          <div className="insight-card-new decline-card">
            <div className="card-header-new">
              <div className="card-icon-new decline-icon">
                <TrendingDown size={24} />
              </div>
              <h3 className="card-title-new">Maiores Declínios</h3>
            </div>
            <div className="card-content-new">
              {insightsData.produtos_baixa.items.map((item, index) => {
                const produto = parseProductInfo(item.titulo, item.descricao)
                const declinio = Math.abs(parseFloat(parsePercentage(item.descricao)))
                const vendas = item.contexto.match(/(\d+) → (\d+)/)
                
                return (
                  <div key={index} className="ranking-item">
                    <div className="ranking-position">{index + 1}º</div>
                    <div className="ranking-content">
                      <div className="ranking-title">{produto.codigo}</div>
                      <div className="ranking-location">{produto.uf}</div>
                      <div className="ranking-metric negative">-{declinio}%</div>
                      <div className="ranking-detail">
                        {vendas ? `${vendas[1]} → ${vendas[2]} vendas` : item.contexto}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 5. Alto Volume / Baixo Crescimento */}
          <div className="insight-card-new base-card">
            <div className="card-header-new">
              <div className="card-icon-new base-icon">
                <BarChart3 size={24} />
              </div>
              <h3 className="card-title-new">Alto Volume / Baixo Crescimento</h3>
            </div>
            <div className="card-content-new">
              {insightsData.produtos_base.items.map((item, index) => {
                const produto = parseProductInfo(item.titulo, item.descricao)
                const volume = item.descricao.match(/(\d+) vendas/)?.[1] || '0'
                const crescimento = item.contexto.match(/([+-]?\d+\.?\d*)%/)?.[1] || '0'
                
                return (
                  <div key={index} className="ranking-item">
                    <div className="ranking-position">{index + 1}º</div>
                    <div className="ranking-content">
                      <div className="ranking-title">{produto.codigo}</div>
                      <div className="ranking-location">{produto.uf}</div>
                      <div className="ranking-metric volume">{volume} vendas</div>
                      <div className="ranking-detail">Crescimento: {crescimento}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 6. Baixo Volume / Baixo Crescimento */}
          <div className="insight-card-new observation-card">
            <div className="card-header-new">
              <div className="card-icon-new observation-icon">
                <Eye size={24} />
              </div>
              <h3 className="card-title-new">Baixo Volume / Baixo Crescimento</h3>
            </div>
            <div className="card-content-new">
              {insightsData.produtos_observacao.items.map((item, index) => {
                const produto = parseProductInfo(item.titulo, item.descricao)
                const volume = item.descricao.match(/(\d+) vendas/)?.[1] || '0'
                const tendencia = item.contexto.match(/([+-]?\d+\.?\d*)%/)?.[1] || '0'
                
                return (
                  <div key={index} className="ranking-item">
                    <div className="ranking-position">{index + 1}º</div>
                    <div className="ranking-content">
                      <div className="ranking-title">{produto.codigo}</div>
                      <div className="ranking-location">{produto.uf}</div>
                      <div className="ranking-metric volume-low">{volume} vendas</div>
                      <div className="ranking-detail">Tendência: {tendencia}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
