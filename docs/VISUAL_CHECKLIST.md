# ✅ Design System - Checklist Visual & Performance
## Guia de Validação e Testes

---

## 1. Checklist Visual - Antes de Mergear

### Tipografia

- [ ] Textos headings (h1, h2, h3) aplicam `text-balance`
- [ ] Textos body aplicam `text-pretty`
- [ ] Números e métricas usam `font-variant-numeric: tabular-nums`
- [ ] Apenas 5 tamanhos de fonte sendo usados (32px, 24px, 18px, 14px, 12px)
- [ ] Apenas 4 weights sendo usados (400, 500, 600, 700)
- [ ] Font Inter está sendo carregada via Google Fonts
- [ ] Line-height segue a escala (1.2, 1.3, 1.4, 1.5)
- [ ] Contraste de texto está ≥ 4.5:1 (verificar com WebAIM)

### Cores

- [ ] Fundo principal é #FFFFFF (branco puro)
- [ ] Superfícies secundárias são #F5F5F5 (light gray)
- [ ] Texto primário é #212121 (dark gray)
- [ ] Texto secundário é #757575 (medium gray)
- [ ] Borders são #E0E0E0 (gray 300)
- [ ] Vermelho iFood (#EB0033) usado APENAS em ações primárias
- [ ] Todas as cores passam no teste WCAG AAA
- [ ] Não há uso de muitas cores (máximo 7 cores core)

**Teste de Contraste:**
```
Usar: https://webaim.org/resources/contrastchecker/

Dark Gray (#212121) + White (#FFFFFF) = 18:1 ✅
Dark Gray (#212121) + Light Gray (#F5F5F5) = 17:1 ✅
Red (#EB0033) + White = 8.2:1 ✅
Gray 600 (#757575) + White = 5.7:1 ✅
```

### Espaçamento

- [ ] Todos os paddings são múltiplos de 4px
- [ ] Todos os margins são múltiplos de 4px
- [ ] Todos os gaps são múltiplos de 4px
- [ ] Cards têm padding 20px (5×4px)
- [ ] Buttons têm padding 10px 16px
- [ ] Seções têm gap 32px
- [ ] Ratio whitespace/conteúdo é ~60/40
- [ ] Sem valores aleatórios como 15px, 7px, 11px

### Border Radius

- [ ] Valores: 4px (small), 6px (medium), 8px (large)
- [ ] Cards usam 8px
- [ ] Buttons usam 6px
- [ ] Inputs usam 6px
- [ ] Sem valores como 2px, 3px, 5px, 7px em uso generalizado

### Sombras

- [ ] Shadow-sm: `0 1px 3px rgba(0,0,0,0.05)`
- [ ] Shadow-md: `0 4px 12px rgba(0,0,0,0.1)`
- [ ] Shadow-lg: `0 8px 24px rgba(0,0,0,0.12)`
- [ ] Sombras aplicadas apenas em elementos interactive ou elevated
- [ ] Sem "sombra pesada" em elementos básicos

### Componentes

**Button**
- [ ] Primary button tem background #EB0033
- [ ] Hover aumenta shadow + translateY(-2px)
- [ ] Active reduz shadow + translateY(0)
- [ ] Disabled tem opacity 0.5
- [ ] Focus visible tem outline 2px

**Card**
- [ ] Background é #F5F5F5
- [ ] Border é 1px #E0E0E0
- [ ] Padding é 20px
- [ ] Hover lift é -4px
- [ ] Shadow padrão é shadow-sm

**Input**
- [ ] Height é 40px
- [ ] Padding é 10px 12px
- [ ] Border é 1px #E0E0E0
- [ ] Focus tem outline + box-shadow
- [ ] Placeholder é #757575

**StatCard**
- [ ] Número em 32px, weight 700
- [ ] Label em 14px, weight 500
- [ ] Meta em 12px
- [ ] Min-height 120px
- [ ] Alinhamento centralizado

### Animações

- [ ] Fade-in: 200ms ease-out
- [ ] Slide-up: 300ms ease-out
- [ ] Hover lift: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
- [ ] Apenas `transform` e `opacity` animadas
- [ ] Nenhuma animação > 300ms
- [ ] prefers-reduced-motion é respeitado
- [ ] Stagger effect aplicado em grids

### Responsive

- [ ] Desktop (1920px): Grid 4 colunas
- [ ] Tablet (1024px): Grid 2 colunas
- [ ] Mobile (375px): Grid 1 coluna
- [ ] Hero section adapta corretamente
- [ ] Stats cards reflow corretamente
- [ ] Touch targets ≥ 44×44px (mobile)
- [ ] Sem overflow horizontal em mobile

### Acessibilidade

- [ ] Todos os buttons têm `aria-label` se só com ícone
- [ ] Focus indicators visíveis (2px outline)
- [ ] Focus outline não é removido
- [ ] Cores não são a única forma de comunicar
- [ ] Contraste 4.5:1 em todo texto
- [ ] Keyboard navigation funciona
- [ ] Estrutura semântica (h1, h2, nav, main)
- [ ] prefers-reduced-motion testado
- [ ] Teste com NVDA/VoiceOver

---

## 2. Performance Checklist

### Métricas Core Web Vitals

**LCP (Largest Contentful Paint)**
- [ ] < 2.5s em conexão rápida (4G)
- [ ] < 4.0s em conexão lenta (3G)
- [ ] Hero image otimizada (webp, lazy loading)
- [ ] Fonts não bloqueiam rendering

**FID (First Input Delay)**
- [ ] < 100ms (responsividade rápida)
- [ ] JavaScript não bloqueia main thread
- [ ] Event listeners não fazem trabalho pesado
- [ ] Usar `transform` em animações (não `width`/`height`)

**CLS (Cumulative Layout Shift)**
- [ ] < 0.1 (sem mudanças de layout)
- [ ] Nenhuma inserção de elementos sem space reservado
- [ ] Images têm dimensões explícitas (width/height)
- [ ] Fonts não causam FOUT/FOIT

### Otimizações CSS

- [ ] CSS é minificado em produção
- [ ] CSS Modules evitam global scope pollution
- [ ] Sem `!important` em CSS
- [ ] Sem `will-change` desnecessário
- [ ] Media queries organizadas (mobile-first)
- [ ] Removed unused CSS (PurgeCSS)

### Otimizações JavaScript

- [ ] Components são lazy-loaded quando possível
- [ ] Animações não rodam em background
- [ ] Event listeners são removidos ao desmontar
- [ ] useEffect dependencies são corretas
- [ ] Sem console.log em produção

### Otimizações de Imagens

- [ ] Imagens em formato WebP
- [ ] Sizes responsivos (srcset)
- [ ] Lazy loading (loading="lazy")
- [ ] Compression (ImageOptim)
- [ ] Aspect ratio correto (sem distorção)

### Fonte Web

- [ ] Font subsetting (apenas caracteres usados)
- [ ] Font loading strategy: `font-display: swap`
- [ ] Preload fonts críticas
- [ ] Fallback fonts legíveis similares

---

## 3. Testes de Navegador

### Desktop

```
Chrome (Windows)
┌─────────────────────────┐
│ ✓ Colors correct        │
│ ✓ Typography rendering  │
│ ✓ Hover states smooth   │
│ ✓ Animations smooth     │
│ ✓ No console errors     │
└─────────────────────────┘

Firefox (Windows/Mac)
┌─────────────────────────┐
│ ✓ Visual consistency    │
│ ✓ Font rendering        │
│ ✓ No flickering         │
│ ✓ CLS zero              │
└─────────────────────────┘

Safari (Mac)
┌─────────────────────────┐
│ ✓ Border-radius smooth  │
│ ✓ Shadows correct       │
│ ✓ Colors accurate       │
│ ✓ Transforms smooth     │
└─────────────────────────┘
```

### Tablet (iPad, Samsung Tab)

- [ ] Grid reduz para 2 colunas
- [ ] Touch targets ≥ 44×44px
- [ ] Hover states não ficam "presos"
- [ ] Portrait e landscape funcionam
- [ ] Sem overflow horizontal

### Mobile (iPhone, Android)

- [ ] Layout é 1 coluna em 375px
- [ ] Font sizes legíveis (min 16px para inputs)
- [ ] Buttons são clicáveis (44×44px min)
- [ ] Nenhum pinch-to-zoom necessário
- [ ] Performance em 4G
- [ ] Performance em 3G (ajustar expectations)

---

## 4. Testes de Acessibilidade

### Keyboard Navigation

```
Teste:
1. Remova o mouse
2. Use apenas TAB, SHIFT+TAB, ENTER
3. Verifique a ordem (lógica)
4. Nenhum elemento "invisível" para teclado
5. Focus indicators sempre visíveis

✓ Ordem de focus é lógica
✓ Nenhuma armadilha de foco
✓ Skip links funcionam
```

### Screen Reader (NVDA, JAWS, VoiceOver)

```
Teste:
1. Ative screen reader
2. Navegue linearmente
3. Ative screen reader
4. Navegue por headings
5. Navegue por landmarks

✓ Estrutura semântica clara
✓ Labels em inputs
✓ ARIA roles apropriados
✓ Nenhuma conteúdo "invisível"
```

### Color Blindness (Deuteranopia, Protanopia, Tritanopia)

```
Ferramentas:
- Daltonize: https://daltonize.org/
- Color Oracle: https://color-oracle.org/

Verificar:
✓ Vermelho não é a única cor em destaque
✓ Sem combinações red/green
✓ Usar pattern + cor
✓ Suficiente contraste sem cor
```

### WCAG AAA Compliance

```
✓ Contrast ratio ≥ 7:1 (AAA)
✓ Text resizing até 200%
✓ No CLS > 0.1
✓ Títulos sequenciais (h1, h2, h3)
✓ Alt text em imagens
✓ Error messages clara
✓ Timeout avisos
✓ Focus visible sempre
```

---

## 5. Testes Visuais Automatizados

### Percy (Visual Regression Testing)

```bash
# Integração com CI/CD
npm install --save-dev @percy/cli @percy/cypress

# Snapshot:
percySnapshot('home-page')
percySnapshot('button-states')
percySnapshot('empty-state')
```

### Pixel-Perfect Testing

```javascript
// Usar Pixelmatch ou similar
const diff = pixelmatch(
  img1,
  img2,
  null,
  width,
  height,
  { threshold: 0.1 }
);

expect(diff).toBe(0); // Pixel-perfect match
```

---

## 6. Checklist Final - Deploy

### Antes de Mergear para Main

- [ ] Código segue o design system
- [ ] Todas as cores estão documentadas
- [ ] Tipografia segue escala
- [ ] Espaçamento é grid de 4px
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Focus indicators visíveis
- [ ] Responsive de 375px até 1920px
- [ ] Performance: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Teste de contraste: WCAG AAA
- [ ] Sem console errors
- [ ] Sem warnings no build

### Revisão de Design

- [ ] Um designer revisa o componente
- [ ] Comparar com design system document
- [ ] Validar contra brand guidelines
- [ ] Feedback do time

### Documentação

- [ ] Componente documentado no Storybook
- [ ] Props estão tipadas corretamente
- [ ] Exemplo de uso incluído
- [ ] Acessibilidade documentada

---

## 7. Ferramentas Recomendadas

### Design Validation

| Ferramenta | Uso | Link |
|-----------|-----|------|
| WebAIM | Contraste | https://webaim.org/resources/contrastchecker/ |
| WAVE | Acessibilidade | https://wave.webaim.org/ |
| Lighthouse | Performance | Chrome DevTools |
| Percy | Visual regression | https://percy.io |
| Storybook | Component docs | https://storybook.js.org/ |

### Browser DevTools

| Tool | Uso |
|------|-----|
| Chrome DevTools | Performance, Accessibility |
| Firefox DevTools | Layout, Colors |
| Safari Web Inspector | WebKit issues |
| Responsive Design Mode | Viewport testing |

### Color Tools

| Tool | Uso |
|------|-----|
| Daltonize | Simular color blindness |
| Color Oracle | Color blind simulation |
| Contrast Ratio | Quick contrast check |

---

## 8. Exemplo: Validação de Um Button

```
BUTTON PRIMARY
┌───────────────────────────────────────┐
│ Tipografia:                           │
│ ✓ Font: Inter                         │
│ ✓ Size: 14px (body)                   │
│ ✓ Weight: 600 (semibold)              │
│ ✓ Height: 40px                        │
│                                        │
│ Cores:                                 │
│ ✓ Background: #EB0033 (red)           │
│ ✓ Text: #FFFFFF (white)               │
│ ✓ Contrast: 8.2:1 (AAA)               │
│                                        │
│ Spacing:                              │
│ ✓ Padding: 10px 16px (4px grid)       │
│ ✓ Gap com ícone: 8px                  │
│ ✓ Margin: 16px de adjacentes          │
│                                        │
│ Estados:                              │
│ ✓ Default: shadow-sm                  │
│ ✓ Hover: shadow-md, -2px translateY   │
│ ✓ Active: translateY 0                │
│ ✓ Disabled: opacity 0.5               │
│ ✓ Focus: 2px outline                  │
│                                        │
│ Animações:                            │
│ ✓ Transition: 200ms ease-out          │
│ ✓ prefers-reduced-motion: respeitado  │
│                                        │
│ Acessibilidade:                       │
│ ✓ aria-label se só ícone              │
│ ✓ Focus indicator visível             │
│ ✓ Keyboard acessível                  │
│ ✓ Touch target ≥ 44×44px              │
└───────────────────────────────────────┘
✅ APROVADO
```

---

## 9. Métricas de Sucesso

### Qualidade Visual

- [ ] Design System aderência: 100%
- [ ] Contraste WCAG AAA: 100%
- [ ] Responsive coverage: 375px-1920px
- [ ] Browser coverage: Chrome, Firefox, Safari, Edge

### Performance

- [ ] LCP: < 2.5s (90º percentil)
- [ ] FID: < 100ms (90º percentil)
- [ ] CLS: < 0.1 (90º percentil)
- [ ] Lighthouse score: ≥ 90

### Acessibilidade

- [ ] WCAG AAA compliance: 100%
- [ ] Keyboard navigation: 100%
- [ ] Screen reader compatible: 100%
- [ ] Color blind safe: 100%

### Código

- [ ] TypeScript strict mode: ✓
- [ ] Linter (ESLint) passed: ✓
- [ ] Formatter (Prettier) applied: ✓
- [ ] Tests coverage: ≥ 80%

---

**Este checklist deve ser revisto antes de cada pull request!**
