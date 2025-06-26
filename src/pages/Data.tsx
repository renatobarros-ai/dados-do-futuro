import { useState, useMemo, useEffect } from 'react'
import Header from '../components/Header'
import { Download, Filter, BarChart, PieChart, Search, ChevronDown, Play } from 'lucide-react'

// Interfaces
interface SalesData {
  mes: string
  uf: string
  produto_codigo: string
  produto_descricao: string
  vendas: number
  faturamento: number
}

interface ProdutoComVendas {
  codigo: string
  descricao: string
  totalVendas: number
}

// Função de parser CSV
const parseCSV = (csvText: string): SalesData[] => {
  const lines = csvText.trim().split('\n')
  const header = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    const values = line.split(',')
    return {
      mes: values[0],
      uf: values[1], 
      produto_codigo: values[2],
      produto_descricao: values[3].replace(/"/g, ''), // Remove aspas se houver
      vendas: parseInt(values[4]),
      faturamento: parseFloat(values[5])
    }
  }).filter(item => !isNaN(item.vendas) && !isNaN(item.faturamento)) // Filtra linhas inválidas
}

// Constantes
const estados = [
  { code: 'SP', name: 'São Paulo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'PR', name: 'Paraná' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'EX', name: 'Exportação' },
  { code: 'RS', name: 'Rio Grande do Sul' }
]

// Gerar meses dinamicamente (12 meses)
const gerarMeses = () => {
  const meses = []
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  
  for (let i = 0; i < 12; i++) {
    const data = new Date(2025, 6 + i, 1) // Começa em julho 2025
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const mesFormatado = `${ano}-${String(mes + 1).padStart(2, '0')}-01`
    
    meses.push({
      value: mesFormatado,
      label: `${nomesMeses[mes]} ${ano}`
    })
  }
  
  return meses
}

const meses = gerarMeses()

export default function Data() {
  // Estados de controle da interface
  const [selectedEstado, setSelectedEstado] = useState<string>('')
  const [selectedProduto, setSelectedProduto] = useState<string>('')
  const [selectedMesInicio, setSelectedMesInicio] = useState<string>('')
  const [selectedMesFim, setSelectedMesFim] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProdutoDropdown, setShowProdutoDropdown] = useState(false)
  const [dadosApresentados, setDadosApresentados] = useState(false)

  // Estados para dados CSV
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [error, setError] = useState<string>('')

  // Carregar dados do CSV
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setIsLoadingData(true)
        console.log('Carregando CSV...')
        
        const response = await fetch('/data/df_consolidadov2.csv')
        if (!response.ok) {
          throw new Error('Erro ao carregar arquivo CSV')
        }
        
        const csvText = await response.text()
        console.log('CSV carregado, tamanho:', csvText.length)
        
        const parsedData = parseCSV(csvText)
        console.log('Dados parseados:', parsedData.length, 'registros')
        
        setSalesData(parsedData)
        setError('')
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setError('Erro ao carregar dados. Verifique se o arquivo CSV está na pasta public/data/')
      } finally {
        setIsLoadingData(false)
      }
    }

    loadCSVData()
  }, [])

  // Produtos do estado selecionado ordenados por vendas
  const produtosDoEstado = useMemo(() => {
    if (!selectedEstado) return []
    
    // Agrupar produtos e somar vendas
    const produtosMap = new Map<string, ProdutoComVendas>()
    
    salesData
      .filter(item => item.uf === selectedEstado)
      .forEach(item => {
        const key = item.produto_codigo
        if (produtosMap.has(key)) {
          produtosMap.get(key)!.totalVendas += item.vendas
        } else {
          produtosMap.set(key, {
            codigo: item.produto_codigo,
            descricao: item.produto_descricao,
            totalVendas: item.vendas
          })
        }
      })
    
    // Converter para array e ordenar por vendas (maior para menor)
    return Array.from(produtosMap.values()).sort((a, b) => b.totalVendas - a.totalVendas)
  }, [selectedEstado, salesData])

  // Dados filtrados
  const dadosFiltrados = useMemo(() => {
    if (!dadosApresentados) return []
    
    return salesData.filter(item => {
      const estadoMatch = !selectedEstado || item.uf === selectedEstado
      const produtoMatch = !selectedProduto || item.produto_codigo === selectedProduto
      
      let mesMatch = true
      if (selectedMesInicio) {
        if (selectedMesFim) {
          // Período entre dois meses
          mesMatch = item.mes >= selectedMesInicio && item.mes <= selectedMesFim
        } else {
          // Apenas um mês
          mesMatch = item.mes === selectedMesInicio
        }
      }
      
      return estadoMatch && produtoMatch && mesMatch
    })
  }, [selectedEstado, selectedProduto, selectedMesInicio, selectedMesFim, salesData, dadosApresentados])

  // Estatísticas (sempre com dados globais até apresentar)
  const stats = useMemo(() => {
    const dadosParaCalculo = dadosApresentados ? dadosFiltrados : salesData
    const totalVendas = dadosParaCalculo.reduce((sum, item) => sum + item.vendas, 0)
    const totalFaturamento = dadosParaCalculo.reduce((sum, item) => sum + item.faturamento, 0)
    const ticketMedio = totalVendas > 0 ? totalFaturamento / totalVendas : 0
    return { totalVendas, totalFaturamento, ticketMedio, registros: dadosParaCalculo.length }
  }, [dadosFiltrados, salesData, dadosApresentados])

  // Handlers
  const handleEstadoChange = (estado: string) => {
    setSelectedEstado(estado)
    setSelectedProduto('') // Reset produto
    setSelectedMesInicio('') // Reset período
    setSelectedMesFim('')
    setDadosApresentados(false) // Reset apresentação
    setShowProdutoDropdown(false)
  }

  const handleProdutoSelect = (codigo: string) => {
    setSelectedProduto(codigo)
    setSelectedMesInicio('') // Reset período
    setSelectedMesFim('')
    setDadosApresentados(false) // Reset apresentação
    setShowProdutoDropdown(false) // Recolhe dropdown
    setSearchTerm('') // Limpa busca
  }

  const handleMesInicioChange = (mes: string) => {
    setSelectedMesInicio(mes)
    setSelectedMesFim('') // Reset fim
    setDadosApresentados(false) // Reset apresentação
  }

  const handleMesFimChange = (mes: string) => {
    setSelectedMesFim(mes)
    setDadosApresentados(false) // Reset apresentação
  }

  const handleApresentarDados = () => {
    setDadosApresentados(true)
  }

  const exportCSV = () => {
    setIsLoading(true)
    setTimeout(() => {
      const headers = ['Mês', 'Estado', 'Código Produto', 'Descrição', 'Vendas', 'Faturamento']
      const csvContent = [
        headers.join(','),
        ...dadosFiltrados.map(row => [
          row.mes,
          row.uf,
          `"${row.produto_codigo}"`,
          `"${row.produto_descricao}"`,
          row.vendas,
          row.faturamento.toFixed(2)
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'dados-filtrados.csv'
      a.click()
      URL.revokeObjectURL(url)
      setIsLoading(false)
    }, 1000)
  }

  const exportXLSX = () => {
    setIsLoading(true)

    // Simular delay (remover em produção)
    setTimeout(() => {
      try {
        // Importar biblioteca xlsx dinamicamente
        import('xlsx').then((XLSX) => {
          // Preparar dados para planilha
          const dadosParaPlanilha = dadosFiltrados.map(row => ({
            'Mês': new Date(row.mes).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' }),
                                                               'Estado': row.uf,
                                                               'Código Produto': row.produto_codigo,
                                                               'Descrição': row.produto_descricao,
                                                               'Vendas': row.vendas,
                                                               'Faturamento': row.faturamento
          }))

          // Criar workbook
          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.json_to_sheet(dadosParaPlanilha)

          // Adicionar worksheet ao workbook
          XLSX.utils.book_append_sheet(wb, ws, 'Dados Filtrados')

          // Salvar arquivo
          XLSX.writeFile(wb, 'dados-filtrados.xlsx')

          setIsLoading(false)
        }).catch(error => {
          console.error('Erro ao carregar biblioteca XLSX:', error)
          alert('Erro ao exportar XLSX. Biblioteca não encontrada.')
          setIsLoading(false)
        })
      } catch (error) {
        console.error('Erro no export XLSX:', error)
        alert('Erro ao exportar arquivo XLSX')
        setIsLoading(false)
      }
    }, 500)
  }

  // Busca produtos com código sem pontos
  const filteredProdutos = produtosDoEstado.filter(produto => {
    const searchLower = searchTerm.toLowerCase()
    const codigoSemPontos = produto.codigo.replace(/\./g, '')
    
    return produto.descricao.toLowerCase().includes(searchLower) ||
           produto.codigo.toLowerCase().includes(searchLower) ||
           codigoSemPontos.toLowerCase().includes(searchLower)
  })

  // Produto selecionado para exibir
  const produtoSelecionado = produtosDoEstado.find(p => p.codigo === selectedProduto)

  // Verificar se pode apresentar dados
  const podeApresentar = selectedEstado && selectedProduto && selectedMesInicio

  // Meses disponíveis para "fim" (após o início selecionado)
  const mesesFim = useMemo(() => {
    if (!selectedMesInicio) return []
    const indiceInicio = meses.findIndex(m => m.value === selectedMesInicio)
    return meses.slice(indiceInicio + 1)
  }, [selectedMesInicio])

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="data-header">
          <h1 className="page-title">Análise de Dados</h1>
          <p className="data-subtitle">
            Explore e analise as previsões de vendas com filtros interativos
          </p>
        </div>

        {/* Loading State */}
        {isLoadingData && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando dados do CSV...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Conteúdo Principal */}
        {!isLoadingData && !error && (
          <>
            {/* Indicador de dados carregados */}
            <div className="data-info">
              <p>✅ O IBM Granite Time Series TTM R2 previu <strong>{salesData.length} registros</strong> com sucesso</p>
            </div>

            {/* Filtros */}
            <div className="filters-section">
              <div className="filters-grid">
                
                {/* Filtro Estado */}
                <div className="filter-group">
                  <label className="filter-label">Estado</label>
                  <select 
                    value={selectedEstado} 
                    onChange={(e) => handleEstadoChange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map(estado => (
                      <option key={estado.code} value={estado.code}>
                        {estado.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Produto */}
                <div className="filter-group">
                  <label className="filter-label">Produto</label>
                  <div className="multi-select-container">
                    <button
                      onClick={() => setShowProdutoDropdown(!showProdutoDropdown)}
                      className="multi-select-trigger"
                      disabled={!selectedEstado}
                    >
                      <span>
                        {!selectedProduto 
                          ? 'Selecione um produto...' 
                          : `${produtoSelecionado?.codigo} - ${produtoSelecionado?.descricao.substring(0, 30)}...`
                        }
                      </span>
                      <ChevronDown size={16} />
                    </button>
                    
                    {showProdutoDropdown && selectedEstado && (
                      <div className="multi-select-dropdown">
                        <div className="search-container">
                          <Search size={16} />
                          <input
                            type="text"
                            placeholder="Buscar produto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                          />
                        </div>
                        <div className="options-container">
                          {filteredProdutos.length === 0 ? (
                            <div className="no-options">
                              <p>Nenhum produto encontrado</p>
                            </div>
                          ) : (
                            filteredProdutos.map(produto => (
                              <div 
                                key={produto.codigo} 
                                className="option-item-click"
                                onClick={() => handleProdutoSelect(produto.codigo)}
                              >
                                <span className="option-text">
                                  <span className="option-code">{produto.codigo}</span>
                                  <span className="option-desc">{produto.descricao}</span>
                                  <span className="option-vendas">{produto.totalVendas} vendas</span>
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Filtro Período - De */}
                <div className="filter-group">
                  <label className="filter-label">De</label>
                  <select 
                    value={selectedMesInicio} 
                    onChange={(e) => handleMesInicioChange(e.target.value)}
                    className="filter-select"
                    disabled={!selectedProduto}
                  >
                    <option value="">Selecione o mês inicial</option>
                    {meses.map(mes => (
                      <option key={mes.value} value={mes.value}>
                        {mes.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Período - Até */}
                <div className="filter-group">
                  <label className="filter-label">Até</label>
                  <select 
                    value={selectedMesFim} 
                    onChange={(e) => handleMesFimChange(e.target.value)}
                    className="filter-select"
                    disabled={!selectedMesInicio}
                  >
                    <option value="">Apenas {selectedMesInicio ? meses.find(m => m.value === selectedMesInicio)?.label : 'o mês'} selecionado</option>
                    {mesesFim.map(mes => (
                      <option key={mes.value} value={mes.value}>
                        {mes.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Botão Apresentar Dados */}
              <div className="present-data-section">
                <button
                  onClick={handleApresentarDados}
                  disabled={!podeApresentar}
                  className="present-data-btn"
                >
                  <Play size={16} />
                  Apresentar Dados
                </button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <BarChart size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.registros}</div>
                    <div className="stat-label">Registros</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <PieChart size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.totalVendas}</div>
                    <div className="stat-label">Total Vendas</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BarChart size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">R$ {stats.totalFaturamento.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</div>
                    <div className="stat-label">Faturamento</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <PieChart size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">R$ {stats.ticketMedio.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</div>
                    <div className="stat-label">Ticket Médio</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações - Só aparecem após apresentar dados */}
            {dadosApresentados && (
              <div className="actions-section">
                <button 
                  onClick={exportCSV}
                  disabled={isLoading || dadosFiltrados.length === 0}
                  className="export-btn"
                >
                  <Download size={16} />
                  {isLoading ? 'Exportando...' : 'Exportar CSV'}
                </button>
                <button 
                  onClick={exportXLSX}
                  disabled={dadosFiltrados.length === 0}
                  className="export-btn"
                >
                  <Download size={16} />
                  Exportar XLSX
                </button>
              </div>
            )}

            {/* Tabela - Só aparece após apresentar dados */}
            {dadosApresentados && (
              <div className="table-section">
                <div className="table-header">
                  <h3>Dados Filtrados</h3>
                  <span className="table-count">{dadosFiltrados.length} registros</span>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Mês</th>
                        <th>Estado</th>
                        <th>Código</th>
                        <th>Produto</th>
                        <th>Vendas</th>
                        <th>Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="empty-state">
                            <Filter size={24} />
                            <span>Nenhum registro encontrado com os filtros aplicados</span>
                          </td>
                        </tr>
                      ) : (
                        dadosFiltrados.map((row, index) => (
                          <tr key={index}>
                            <td>{new Date(row.mes).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' })}</td>
                            <td>
                              <span className="estado-badge">{row.uf}</span>
                            </td>
                            <td className="codigo-cell">{row.produto_codigo}</td>
                            <td className="produto-cell">{row.produto_descricao}</td>
                            <td className="numero-cell">{row.vendas}</td>
                            <td className="valor-cell">R$ {row.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </>
  )
}
