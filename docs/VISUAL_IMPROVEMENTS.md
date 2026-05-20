# 🎨 Sugestões de Melhorias Visuais - ifood-cms
## Baseado em Awwwards UI Skills Guidelines

---

## 1. 📱 Paleta de Cores - Awwwards Style

### Atual vs Recomendado:
```
ATUAL                          RECOMENDADO (Awwwards)
─────────────────────────────────────────────────────
#FFFFFF (branco)        →      #E4E4E4 (surface-base)
#141414 (preto)         →      #565656 (text-primary)
#EB0033 (vermelho)      →      Manter, mas como accent
#F5F5F5 (bg light)      →      #2F2E30 (surface-raised)
#EBEBEB (border)        →      #3A3A3A (border-default)
```

### Implementação:
- ✅ Mudar background da página de `#FFFFFF` para `#E4E4E4`
- ✅ Mudar text-primary de `#141414` para `#565656`
- ✅ Cards passam de `#FFFFFF` para `#2F2E30`
- ✅ Manter `#EB0033` como accent color para highlights

---

## 2. 🔤 Tipografia - Inter Font

### Implementação Recomendada:

**Heading 1 (Títulos principais)**
- Font: Inter
- Size: 28px (para dashboard, usar 20px adaptado)
- Weight: 700
- Color: #565656
- Aplicar: `text-balance` para melhor quebra de linha

**Body Text (Texto principal)**
- Font: Inter
- Size: 16px
- Weight: 500
- Color: #565656
- Aplicar: `text-pretty` para melhor legibilidade

**Secondary Text**
- Font: Inter
- Size: 14px
- Weight: 400
- Color: #939393

### Mudanças:
- ✅ Já adicionado Inter font em globals.css
- ✅ Unificar todos os tamanhos de fonte para a escala: 7px, 8px, 10px, 12px, 14px, 16px, 18px, 28px
- ✅ Reduzir font-weights para apenas 400, 500, 700
- ✅ Aplicar `text-balance` em headings
- ✅ Aplicar `text-pretty` em body text
- ✅ Usar `tabular-nums` em métricas numéricas

---

## 3. 📐 Spacing - Grid de 4px

### Escala Recomendada:
```
1px  → separadores finos
2px  → micro-spacing
3px  → gaps pequenos
4px  → padding padrão
5px  → gap entre elementos (default)
6px  → spacing médio
8px  → spacing maior
```

### Aplicar ao Dashboard:
- ✅ Padding dos cards: 24px → 20px (5 × 4px)
- ✅ Gaps entre elementos: 8px → 5px (default)
- ✅ Padding dos botões: 8px 12px → 8px 12px (já ok)
- ✅ Border radius: variar entre 4px, 6px, 8px

---

## 4. 🔲 Border Radius - Escala Consistente

### Escala Recomendada:
```
2px  → very small (input focus)
4px  → small elements
6px  → medium elements
7px  → default para cards (RECOMENDADO)
8px  → large elements
9px  → largest elements
```

### Mudanças:
- ✅ Cards: 8px → 7px (default Awwwards)
- ✅ Botões: 8px → 7px
- ✅ Inputs: 8px → 7px
- ✅ Borders sempre 1px

---

## 5. 🎯 Layout - 1920px Base

### Recomendações:
- ✅ Dashboard usa fullscreen (ok)
- ✅ Viewport base: 1920px
- ✅ Manter max-width para readability
- ✅ Usar `h-dvh` em vez de `h-screen`
- ✅ Respeitar `safe-area-inset` em elementos fixed

---

## 6. 🔘 Componentes - Interactive States

### Buttons
```css
/* Ghost Button (atual) */
background: transparent
text: #565656
border: none
hover: background #2F2E30
focus: 2px solid #5E6AD2 outline-offset 2px
disabled: opacity 0.5, cursor not-allowed
```

### Cards
```css
/* Raised Surface */
background: #2F2E30
border: 1px #3A3A3A
padding: 20px (5×4px)
radius: 7px
shadow: subtle (0 2px 4px rgba(0,0,0,0.1))
hover: background #3A3A3A
```

### Inputs
- Height: 32px (não 0px - aquele é erro na spec)
- Padding: 8px
- Border: 1px #3A3A3A
- Radius: 4px
- Focus outline: 2px #5E6AD2

---

## 7. ✨ Animações - Performance First

### Recomendações:
- ✅ Usar apenas `transform` e `opacity` (já fazendo com GSAP)
- ✅ Duração máxima: 200ms para feedback
- ✅ Usar `ease-out` em animações de entrada
- ✅ Respeitar `prefers-reduced-motion`
- ⚠️ Não animar `blur()` ou `backdrop-filter` em grandes áreas
- ✅ Remover `will-change` fora de animações ativas

### Implementação:
```css
/* Correto */
transition: transform 200ms ease-out, opacity 200ms ease-out;

/* Evitar */
transition: width, height, margin, padding;
will-change: left, top, width;
```

---

## 8. ♿ Acessibilidade

### MUST DO:
- ✅ Adicionar `aria-label` em botões com apenas ícone
- ✅ Focus outline: `2px solid #5E6AD2` com `outline-offset: 2px`
- ✅ Contrast ratio: mínimo 4.5:1 (verificar com cores)
- ✅ Nunca remover focus indicators
- ✅ Respeitar `prefers-reduced-motion`

---

## 📋 Checklist de Implementação

### Fase 1: Cores & Typography
- [ ] Mudar background de #FFFFFF para #E4E4E4
- [ ] Mudar text-primary de #141414 para #565656
- [ ] Mudar cards de #FFFFFF para #2F2E30
- [ ] Aplicar `text-balance` em headings
- [ ] Aplicar `text-pretty` em body
- [ ] Usar `tabular-nums` em números

### Fase 2: Spacing & Layout
- [ ] Revisar todos os paddings (usar 4px grid)
- [ ] Revisar todos os gaps (usar 5px default)
- [ ] Padronizar border-radius (4px, 6px, 7px, 8px)
- [ ] Atualizar sombras (0 2px 4px, 0 4px 8px)

### Fase 3: Interatividade
- [ ] Adicionar focus outlines (2px #5E6AD2)
- [ ] Atualizar hover states
- [ ] Adicionar `aria-label` em icon buttons
- [ ] Testar contrast ratio

### Fase 4: Animações
- [ ] Revisar duração máxima 200ms
- [ ] Remover `will-change` não-utilizados
- [ ] Adicionar `prefers-reduced-motion`

---

## 🎨 Resultado Esperado

**Antes:**
- Design limpo mas genérico
- Cores muito contrastantes (preto/branco)
- Tipografia padrão do sistema

**Depois (Awwwards Style):**
- Visual mais sofisticado e premium
- Paleta neutra e elegante
- Tipografia Inter elegante
- Transições suaves e refinadas
- Acessibilidade excepcional
- Animações performáticas

---

## 🚀 Próximos Passos

1. Implementar Fase 1 (cores & typography)
2. Testar contraste e acessibilidade
3. Implementar Fase 2 (spacing)
4. Revisar hover states
5. Testar em diferentes viewports
6. Implementar Fase 3 e 4

---

*Baseado em: Awwwards UI Skills - Design System Guidelines*
