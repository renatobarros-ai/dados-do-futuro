# **📋 Plano de Trabalho Mínimo Essencial + Design**

## **🎯 Entregáveis Obrigatórios:**
1. ✅ **Tela Login** (massa/sohipren)
2. ✅ **Tela Inferência** (animação IBM Granite)  
3. ✅ **Tela Insights** (sacadas.md em cards)
4. ✅ **Tela Dados** (filtros + gráfico + export)
5. ✅ **Design elegante + modo escuro**

---

## **⚡ FASE 1: ESTRUTURA + DESIGN SYSTEM** 
*1.5 horas*

### **Etapa 1: Setup Base**
- **Atividade 1**: `npm create vite@latest . -- --template react-ts`
- **Atividade 2**: `npm install react-router-dom tailwindcss chart.js xlsx lucide-react`
- **Atividade 3**: Configurar Tailwind + design tokens (cores, tipografia, sombras)
- **Atividade 4**: 4 componentes vazios + roteamento básico
- **Atividade 5**: Context para modo escuro

---

## **🔐 FASE 2: LOGIN + NAVEGAÇÃO** 
*1 hora*

### **Etapa 2: Autenticação Elegante**
- **Atividade 1**: Formulário login estilizado (massa/sohipren hardcoded)
- **Atividade 2**: Header profissional com logo + navegação + toggle modo escuro + logout
- **Atividade 3**: Proteção de rotas
- **Atividade 4**: Transições suaves entre páginas

---

## **📊 FASE 3: DADOS** 
*20 min*

### **Etapa 3: CSV → JSON**
- **Atividade 1**: Converter sample30.csv para JSON estático
- **Atividade 2**: Funções básicas: filtrar por estado, produto, mês

---

## **🧠 FASE 4: TELA INFERÊNCIA** 
*45 min*

### **Etapa 4: Animação IBM Elegante**
- **Atividade 1**: Progress bar estilizada com 4 steps + logo IBM
- **Atividade 2**: Animações sutis + loading states
- **Atividade 3**: Auto-redirect para insights após 5s

---

## **💡 FASE 5: TELA INSIGHTS** 
*2 horas*

### **Etapa 5: Cards Profissionais**
- **Atividade 1**: Grid responsivo com cards elegantes
- **Atividade 2**: Conteúdo dos insights do sacadas2.md
- **Atividade 3**: Métricas calculadas com ícones (Lucide)
- **Atividade 4**: Hover effects + sombras + espaçamentos harmoniosos
- **Atividade 5**: Indicadores visuais de confiança/prioridade

---

## **📈 FASE 6: TELA DADOS** 
*2.5 horas*

### **Etapa 6: Interface Funcional e Bonita**
- **Atividade 1**: Dropdown estados estilizado (SP,MG,PR,RS,GO,EX)
- **Atividade 2**: Multi-select produtos com busca
- **Atividade 3**: Tabela dados bem formatada + scroll horizontal
- **Atividade 4**: Gráfico linha profissional (Chart.js + modo escuro)
- **Atividade 5**: Botões export estilizados (CSV/XLSX)
- **Atividade 6**: Loading states nos filtros

---

## **🎨 FASE 7: DESIGN SYSTEM COMPLETO** 
*1.5 horas*

### **Etapa 7: Polish Profissional**
- **Atividade 1**: Aplicar paleta completa (claro + escuro)
- **Atividade 2**: Tipografia hierárquica (Inter font)
- **Atividade 3**: Logos Sohipren + IBM bem posicionados
- **Atividade 4**: Layout centralizado max-width 1200px
- **Atividade 5**: Componentes reutilizáveis (Button, Card, Input)
- **Atividade 6**: Estados de hover/focus/active em todos elementos

---

## **♿ FASE 8: ACESSIBILIDADE + RESPONSIVO BÁSICO** 
*1 hora*

### **Etapa 8: Boas Práticas**
- **Atividade 1**: Focus indicators visíveis
- **Atividade 2**: Contrast ratios adequados (claro + escuro)
- **Atividade 3**: Keyboard navigation funcional
- **Atividade 4**: Responsivo desktop/tablet (mobile basic)
- **Atividade 5**: Aria-labels nos elementos interativos

---

## **⏱️ Total: 8.5 horas**

### **🎨 Design System Definido:**
```typescript
const designTokens = {
  cores: {
    claro: {
      primaria: "#1e40af",
      secundaria: "#3b82f6", 
      fundo: "#ffffff",
      texto: "#1e293b"
    },
    escuro: {
      primaria: "#60a5fa",
      secundaria: "#3b82f6",
      fundo: "#0f172a", 
      texto: "#f1f5f9"
    }
  },
  tipografia: "Inter",
  sombras: "sutis e progressivas",
  bordas: "rounded-lg",
  espacamentos: "grid 8px"
}
```

### **📋 Checklist Final:**
- [ ] Login elegante funciona (massa/sohipren)
- [ ] Modo escuro em todas as telas
- [ ] Inferência mostra animação IBM bonita + redireciona
- [ ] Insights mostra cards elegantes com sacadas
- [ ] Dados permite filtrar estado + produto + exportar (interface polida)
- [ ] Navegação suave entre insights ↔ dados
- [ ] Logout volta para login
- [ ] Acessibilidade básica (focus, contrast, keyboard)
- [ ] Responsivo desktop/tablet

### **✅ Foco Balanceado:**
- **Funcionalidade**: 60% (foco principal)
- **Design/UX**: 35% (importante para apresentação)
- **Acessibilidade**: 5% (básico mas presente)

**🎯 Resultado:** POC que demonstra todas as funcionalidades definidas + apresentação visual profissional e elegante.
