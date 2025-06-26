# Dados do Futuro - Sistema Preditivo de Vendas

Sistema avançado de previsão de vendas para empresa multinacional fabricante de motores e bombas hidráulicas para tratores e equipamentos agrícolas, baseado em inteligência artificial IBM Granite Time Series TTM R2.

## 🎯 Visão Geral

O **Dados do Futuro** é uma plataforma web que utiliza técnicas complexas de deep learning para séries temporais através de large language models, implementando ajustes avançados de fine-tuning seletivo e preprocessamento automatizado para prever com alta precisão as vendas dos próximos 12 meses.

O sistema foca nos **6 estados mais estratégicos** que representam mais de 90% das vendas e faturamento da empresa: São Paulo, Minas Gerais, Paraná, Rio Grande do Sul, Goiás e Exportação. Para cada estado, analisa os **100 produtos mais vendidos**, responsáveis por mais de 90% das vendas e faturamento regional.

## 🚀 Tecnologias

- **Frontend**: React 19.1.0 + TypeScript + Vite
- **Roteamento**: React Router DOM 7.6.2
- **Estilização**: Tailwind CSS 4.1.10
- **Visualização**: Chart.js 4.5.0
- **Ícones**: Lucide React 0.523.0
- **Exportação**: XLSX 0.18.5
- **IA/ML**: IBM Granite Time Series TTM R2

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   └── Header.tsx       # Cabeçalho com navegação e controles
├── contexts/            # Gerenciamento de estado global
│   ├── AuthContext.tsx  # Autenticação e autorização
│   └── ThemeContext.tsx # Modo claro/escuro
├── pages/              # Páginas principais da aplicação
│   ├── Login.tsx       # Autenticação de usuários
│   ├── Inference.tsx   # Processamento IA em tempo real
│   ├── Insights.tsx    # Dashboard de análises preditivas
│   └── Data.tsx        # Interface de exploração de dados
└── data/               # Dados mockados para desenvolvimento
    └── mockData.ts     # Estruturas de dados de exemplo
```

### Padrões Arquiteturais
- **Context API**: Gerenciamento de estado para autenticação e tema
- **Rotas Protegidas**: Componente `ProtectedRoute` para controle de acesso
- **Hooks Customizados**: `useAuth()` e `useTheme()` para lógica reutilizável
- **TypeScript**: Tipagem forte com interfaces bem definidas

## 🔐 Sistema de Autenticação

O sistema implementa autenticação segura com credenciais corporativas:
- **Login**: Interface profissional com validação em tempo real
- **Sessão**: Controle de estado persistente durante navegação
- **Logout**: Limpeza segura de sessão e redirecionamento
- **Proteção**: Rotas protegidas com redirecionamento automático

## 🤖 IBM Granite Time Series TTM R2

### Processo de Inferência
O sistema simula o processamento avançado de IA através de 5 etapas:

1. **Inicialização do Modelo**: Carregamento dos algoritmos de séries temporais
2. **Processamento Regional**: Análise dos 6 estados estratégicos
3. **Análise de Produtos**: Identificação de padrões nos top 100 produtos por estado
4. **Geração de Previsões**: Cálculo preditivo para 12 meses futuros
5. **Identificação de Padrões**: Processamento de insights comerciais

### Capacidades do Modelo
- **Deep Learning**: Redes neurais especializadas em séries temporais
- **Fine-tuning Seletivo**: Ajustes personalizados para dados agrícolas
- **Preprocessamento Automatizado**: Limpeza e normalização inteligente
- **Alta Precisão**: Modelos otimizados para o setor de equipamentos agrícolas

## 📊 Dashboard de Insights

### Análises Disponíveis

#### 1. **Crescimento Nacional**
- Variação percentual mensal de vendas
- Comparação período a período
- Indicadores de tendência nacional

#### 2. **Volatilidade por Estados**
- Ranking de estados por oscilação de vendas
- Métricas de variabilidade regional
- Análise de risco por mercado

#### 3. **Produtos em Alta**
- Top performers com maior crescimento
- Análise de códigos de produto específicos
- Projeções de demanda crescente

#### 4. **Produtos em Declínio**
- Identificação de produtos com queda nas vendas
- Alertas de tendência negativa
- Recomendações de estratégia

#### 5. **Alto Volume / Baixo Crescimento**
- Produtos consolidados no mercado
- Análise de maturidade de produto
- Oportunidades de otimização

#### 6. **Baixo Volume / Baixo Crescimento**
- Produtos que requerem atenção especial
- Análise de viabilidade comercial
- Recomendações estratégicas

### Características dos Insights
- **Confiança Alta**: Baseado em 3+ meses de dados históricos
- **Tempo Real**: Atualizações automáticas dos indicadores
- **Granularidade**: Análise por produto, estado e período
- **Actionable**: Insights orientados para tomada de decisão

## 🎨 Interface e Experiência

### Design System
- **Tipografia**: Inter - fonte corporativa moderna
- **Cores**: Paleta profissional azul/cinza
- **Espaçamento**: Grid system consistente
- **Ícones**: Lucide React - biblioteca unificada

### Modo Escuro
- **Toggle Automático**: Alternância suave entre temas
- **Persistência**: Preferência salva no localStorage
- **Contraste**: Otimizado para uso prolongado
- **Acessibilidade**: Conformidade com padrões WCAG

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação inteligente para diferentes telas
- **Touch Friendly**: Controles otimizados para touch
- **Performance**: Carregamento otimizado em todas as resoluções

## 🚦 Estados da Aplicação

### Estados de Loading
- **Autenticação**: Feedback visual durante login
- **Processamento IA**: Progress bar com etapas detalhadas
- **Carregamento de Dados**: Spinners contextualizados
- **Exportações**: Indicadores de progresso para downloads

### Tratamento de Erros
- **Mensagens Contextuais**: Erros específicos por funcionalidade
- **Fallbacks**: Estados alternativos para falhas
- **Retry Logic**: Tentativas automáticas quando apropriado
- **User Feedback**: Comunicação clara de problemas

## 🔧 Configuração e Deploy

### Desenvolvimento Local
```bash
# Instalação de dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Linting
npm run lint
```

### Variáveis de Ambiente
- **VITE_API_URL**: URL da API de produção
- **VITE_IBM_GRANITE_ENDPOINT**: Endpoint do modelo IA
- **VITE_EXPORT_LIMIT**: Limite de registros para export

### Build e Deploy
- **Otimização**: Bundle splitting automático
- **Minificação**: Código otimizado para produção
- **Assets**: Otimização de imagens e recursos
- **PWA Ready**: Configuração para Progressive Web App

---

**Dados do Futuro** - Transformando dados em decisões estratégicas para o futuro do agronegócio.
