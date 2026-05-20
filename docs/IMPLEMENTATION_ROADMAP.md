# 🚀 Implementation Roadmap - Design System iFood CMS
## Plano de Implementação Passo-a-Passo (5-8 semanas)

---

## Timeline Overview

```
Week 1-2    Week 3-5    Week 6-7    Week 8
┌────────┬──────────┬──────────┬────────┐
│ PHASE 1│ PHASE 2  │ PHASE 3  │PHASE 4 │
│        │          │          │        │
│ Setup  │Components│ iFood    │Polish  │
│ CSS    │ React    │ Specific │Testing │
└────────┴──────────┴──────────┴────────┘
Foundation→ Componentes→ Brand→ Quality
```

---

## PHASE 1: Foundation (Week 1-2)

### Goal
Criar base sólida com CSS setup e componentes básicos

### Week 1: Setup CSS & Infrastructure

#### Day 1-2: CSS Custom Properties & Reset

```
TASKS:
- [ ] Criar app/globals.css com todas as variáveis
  ├─ Colors (7 principais)
  ├─ Typography (5 tamanhos)
  ├─ Spacing (4px grid)
  ├─ Shadows (3 níveis)
  └─ Transitions

- [ ] Adicionar reset CSS normalizado
  ├─ Margin/padding 0
  ├─ Box-sizing border-box
  ├─ Font smoothing
  └─ Focus visible

DELIVERABLE: globals.css pronto
FILE: /app/globals.css (150 linhas)
```

**Código:**

```css
/* app/globals.css - FINAL */
:root {
  /* COLORS */
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-300: #E0E0E0;
  --color-gray-600: #757575;
  --color-dark: #212121;
  --color-primary: #EB0033;
  --color-primary-hover: #D10029;

  /* TYPOGRAPHY */
  --font-family: 'Inter', -apple-system, sans-serif;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 18px;
  --font-size-body: 14px;
  --font-size-caption: 12px;

  /* SPACING */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

#### Day 3: Font Import

```
TASKS:
- [ ] Importar Inter de Google Fonts
  ├─ @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')
  ├─ Verificar loading strategy (swap)
  └─ Testar rendering em diferentes browsers

- [ ] Adicionar fallback fonts
  ├─ System fonts como fallback
  ├─ Testar visibilidade durante load
  └─ Medir performance (LCP)

DELIVERABLE: Font configurado
METRICS: LCP < 2.5s com font
```

#### Day 4-5: Create Button Component

```
TASKS:
- [ ] Criar components/Button.tsx
  ├─ Props: variant, size, disabled
  ├─ Variants: primary, secondary, ghost
  ├─ Sizes: sm, md, lg
  └─ Type-safe com TypeScript

- [ ] Criar Button.module.css
  ├─ 3 variantes (primary, secondary, ghost)
  ├─ 3 tamanhos (sm/32px, md/40px, lg/48px)
  ├─ Hover states com lift -2px
  ├─ Animations 200ms ease-out
  └─ prefers-reduced-motion

- [ ] Criar Storybook story (opcional)
  └─ Mostrar todas as variações

DELIVERABLE: Button component completo
FILES:
  - components/Button.tsx (50 linhas)
  - components/Button.module.css (80 linhas)
```

### Week 2: Componentes Básicos

#### Day 1-2: Card Component

```
TASKS:
- [ ] Criar components/Card.tsx
  ├─ Props simples (children)
  ├─ Interactive mode
  └─ aria-attributes

- [ ] Criar Card.module.css
  ├─ Background #F5F5F5
  ├─ Border 1px #E0E0E0
  ├─ Padding 20px (5×4px)
  ├─ Shadow-sm default
  ├─ Hover: shadow-md + lift -4px
  └─ Animations 200ms

- [ ] Teste responsivo
  └─ Verificar em 3 viewports

DELIVERABLE: Card component pronto
FILES:
  - components/Card.tsx (40 linhas)
  - components/Card.module.css (60 linhas)
```

#### Day 3-4: Input Component

```
TASKS:
- [ ] Criar components/Input.tsx
  ├─ Props: label, placeholder, type
  ├─ Disabled state
  └─ Error handling (prep)

- [ ] Criar Input.module.css
  ├─ Height 40px
  ├─ Padding 10px 12px
  ├─ Border 1px #E0E0E0
  ├─ Focus: outline 2px #EB0033
  ├─ Placeholder: #757575
  └─ Disabled: opacity 0.6

DELIVERABLE: Input component
FILES:
  - components/Input.tsx (50 linhas)
  - components/Input.module.css (70 linhas)
```

#### Day 5: Testing & Validation

```
TASKS:
- [ ] Teste visual: Button, Card, Input
- [ ] Valide contraste (WebAIM)
- [ ] Teste keyboard navigation
- [ ] Valide responsividade
- [ ] Commit & PR: "Phase 1 Foundation Complete"

DELIVERABLE: PR pronto para mergear
FILES: 5 components base
STATUS: ✅ Ready for Phase 2
```

---

## PHASE 2: Components (Week 3-5)

### Goal
Criar todos os componentes necessários para o dashboard

### Week 3: Componentes Compostos

#### Day 1: Badge Component

```
TASKS:
- [ ] Criar components/Badge.tsx
  ├─ Status: published, draft, archived, error
  ├─ Custom label
  └─ Dot indicator

- [ ] Criar Badge.module.css
  ├─ 4 status colors (green, gray, light gray, red)
  ├─ Padding 6px 10px
  ├─ Font-size 12px
  └─ Inline-flex com dot

DELIVERABLE: Badge component
FILES: Badge.tsx + Badge.module.css
```

#### Day 2: StatCard Component

```
TASKS:
- [ ] Criar components/StatCard.tsx
  ├─ Props: number, label, meta, trend
  ├─ Trend types: up, down, neutral
  ├─ Icons para trend

- [ ] Criar StatCard.module.css
  ├─ Height 120px
  ├─ Number 32px, weight 700
  ├─ Label 14px, weight 500
  ├─ Meta 12px com cor
  └─ Centered layout

DELIVERABLE: StatCard component
FILES: StatCard.tsx + StatCard.module.css
```

#### Day 3: HeroSection Component

```
TASKS:
- [ ] Criar components/HeroSection.tsx
  ├─ Props: title, subtitle, action
  ├─ Slot para stats
  └─ Type-safe children

- [ ] Criar HeroSection.module.css
  ├─ Min-height 240px
  ├─ Padding 48px 32px
  ├─ Title 32px, weight 700
  ├─ Subtitle 16px
  ├─ Animations slide-up
  └─ Responsive height

DELIVERABLE: HeroSection component
FILES: HeroSection.tsx + HeroSection.module.css
```

#### Day 4-5: EmptyState & Animations

```
TASKS:
- [ ] Criar components/EmptyState.tsx
  ├─ Props: icon, title, description, action
  ├─ CTA button integrado
  └─ Centered layout

- [ ] Adicionar @keyframes a globals.css
  ├─ fadeIn (200ms)
  ├─ slideUp (300ms)
  ├─ slideIn (300ms)
  └─ pulse (2000ms loop)

- [ ] Teste animations
  ├─ Verificar 60fps
  ├─ Testar prefers-reduced-motion
  └─ Chrome DevTools Performance

DELIVERABLE: EmptyState + Animations
STATUS: ✅ Phase 2.1 Complete
```

### Week 4: Layout Components

#### Day 1-2: PageGrid Component

```
TASKS:
- [ ] Criar components/PageGrid.tsx
  ├─ Props: children, columns (default 4)
  ├─ CSS Grid layout
  └─ Responsive columns

- [ ] Criar PageGrid.module.css
  ├─ grid-template-columns: repeat(var(--grid-columns), 1fr)
  ├─ Gap 16px
  ├─ Padding 32px
  ├─ Stagger animations
  ├─ @media tablet (2 colunas)
  └─ @media mobile (1 coluna)

DELIVERABLE: PageGrid component
FILES: PageGrid.tsx + PageGrid.module.css
```

#### Day 3-4: Update Home Page

```
TASKS:
- [ ] Reescrever app/page.tsx
  ├─ Usar HeroSection
  ├─ Usar StatCard × 3
  ├─ Usar PageGrid
  ├─ Adicionar sample data
  └─ Integrar Button CTA

- [ ] Estilizar sample cards
  ├─ Page title
  ├─ Description
  ├─ Status badge
  ├─ Timestamp
  └─ Menu actions

DELIVERABLE: Nova home page
FILES: Updated app/page.tsx
```

#### Day 5: Testing Phase 2

```
TASKS:
- [ ] Visual testing: Todos os componentes
- [ ] Responsive test: 375px, 768px, 1920px
- [ ] Performance: Lighthouse 90+
- [ ] Accessibility: WCAG AAA
- [ ] Keyboard nav: TAB, ENTER, ESC
- [ ] Commit & PR: "Phase 2 Components Complete"

DELIVERABLE: PR Phase 2
STATUS: ✅ All components working
```

### Week 5: Polish & Refinement

#### Day 1-2: Refine Animations

```
TASKS:
- [ ] Adicionar stagger effect para cards
  ├─ Delay 50ms entre items
  ├─ slideUp + stagger juntos
  └─ Testar com 20+ cards

- [ ] Adicionar transition timing
  ├─ Hover states smooth
  ├─ Focus visible immediate
  └─ Active feedback instant

DELIVERABLE: Polished animations
```

#### Day 3-4: Component Documentation

```
TASKS:
- [ ] Documentar cada componente
  ├─ Props interface
  ├─ Usage examples
  ├─ CSS classes
  └─ Accessibility notes

- [ ] Criar Storybook (se aplicável)
  └─ Stories para cada componente

DELIVERABLE: Comprehensive docs
```

#### Day 5: Phase 2 Final Testing

```
TASKS:
- [ ] Full page test com dados reais
- [ ] Edge cases: empty state, many items
- [ ] Browser testing: Chrome, Firefox, Safari
- [ ] Mobile testing: iOS, Android
- [ ] Final PR approval

STATUS: ✅ Phase 2 Complete
METRICS:
  - LCP: 2.1s ✓
  - CLS: 0.08 ✓
  - Lighthouse: 94 ✓
```

---

## PHASE 3: iFood Brand Components (Week 6-7)

### Goal
Criar componentes específicos para iFood (restaurants, menus, preços)

### Week 6: Restaurant & Menu Components

#### Day 1: RestaurantCard Component

```
TASKS:
- [ ] Criar components/RestaurantCard.tsx
  ├─ Props: name, rating, reviews, deliveryTime, deliveryFee, image, isActive
  ├─ Image handling
  ├─ Status badge (open/closed)
  └─ Action buttons (Edit, Preview)

- [ ] Criar RestaurantCard.module.css
  ├─ Horizontal layout (flex)
  ├─ Image 160×160px
  ├─ Gap 16px
  ├─ Padding 16px
  ├─ Hover lift effect
  └─ Status badge positioning

DELIVERABLE: RestaurantCard
FILES: RestaurantCard.tsx + .module.css
```

#### Day 2: MenuItemCard Component

```
TASKS:
- [ ] Criar components/MenuItemCard.tsx
  ├─ Props: name, price, description, image, available
  ├─ Image optional
  ├─ Unavailable state
  └─ Edit/View actions

- [ ] Criar MenuItemCard.module.css
  ├─ Vertical layout
  ├─ Image 160×120px
  ├─ Text truncation (2 lines)
  ├─ Price destacado (vermelho)
  └─ Unavailable overlay

DELIVERABLE: MenuItemCard
FILES: MenuItemCard.tsx + .module.css
```

#### Day 3: PriceInput Component

```
TASKS:
- [ ] Criar components/PriceInput.tsx
  ├─ Formato brasileiro (R$ 29,90)
  ├─ Input numérico mascarado
  ├─ Label opcional
  └─ Validação básica

- [ ] Criar PriceInput.module.css
  ├─ Currency symbol R$ esquerda
  ├─ Text-align right
  ├─ tabular-nums
  ├─ Focus com outline vermelho
  └─ Disabled state

DELIVERABLE: PriceInput
FILES: PriceInput.tsx + .module.css
```

#### Day 4: CategorySelector Component

```
TASKS:
- [ ] Criar components/CategorySelector.tsx
  ├─ Props: categories, selected, onSelect
  ├─ Button-based selector
  ├─ Single selection
  └─ Type-safe

- [ ] Criar CategorySelector.module.css
  ├─ Button pills flex layout
  ├─ Borders 2px
  ├─ Active: filled + red background
  ├─ Hover: border vermelho
  └─ Gap 8px entre buttons

DELIVERABLE: CategorySelector
FILES: CategorySelector.tsx + .module.css
```

#### Day 5: Integration Testing

```
TASKS:
- [ ] Integrar componentes iFood em demo page
- [ ] Teste com sample data
- [ ] Validar preços brasileiros
- [ ] Teste responsividade
- [ ] Commit & PR: "Phase 3 iFood Components"

STATUS: ✅ Phase 3.1 Complete
```

### Week 7: Advanced iFood Features

#### Day 1-2: Restaurant Manager Layout

```
TASKS:
- [ ] Criar layout restaurante
  ├─ Hero section com nome/stats
  ├─ Grid de RestaurantCards
  ├─ Filtros/busca
  └─ Actions (create new)

- [ ] Integrar componentes
  ├─ HeroSection para intro
  ├─ PageGrid para layout
  ├─ RestaurantCard em grid
  └─ Button CTA

DELIVERABLE: Restaurant manager page
```

#### Day 3-4: Menu Manager Layout

```
TASKS:
- [ ] Criar layout cardápio
  ├─ Category selector top
  ├─ Grid de MenuItemCards
  ├─ Filter/search
  └─ Create menu item button

- [ ] Integrar componentes
  ├─ CategorySelector
  ├─ PageGrid (3 colunas)
  ├─ MenuItemCard em grid
  └─ Empty state

DELIVERABLE: Menu manager page
```

#### Day 5: iFood Branding Polish

```
TASKS:
- [ ] Validar cores iFood
  ├─ Vermelho em todos CTAs
  ├─ Contraste OK
  ├─ Hierarchy clara
  └─ Consistent usage

- [ ] Final testing Phase 3
  ├─ User flows completos
  ├─ Edge cases
  ├─ Performance
  └─ A11y validation

STATUS: ✅ Phase 3 Complete
DELIVERABLE: Full iFood brand integration
```

---

## PHASE 4: Polish & Testing (Week 8)

### Goal
Quality assurance, performance optimization, e documentação final

### Day 1-2: Quality Assurance

#### Visual Testing

```
TASKS:
- [ ] Percy (visual regression testing)
  ├─ Snapshot de todos componentes
  ├─ Verificar diffs em novo código
  └─ Aprovação visual

- [ ] Manual QA
  ├─ Desktop (1920px)
  ├─ Tablet (1024px)
  ├─ Mobile (375px)
  └─ 3 navegadores (Chrome, Firefox, Safari)

CHECKLIST:
┌─ Cores exatas (WebAIM)
├─ Tipografia alinhada
├─ Espaçamento grid 4px
├─ Borders consistentes
├─ Shadows corretas
├─ Animações suaves
├─ Hover states claros
└─ Focus indicators visíveis
```

#### Accessibility Audit

```
TASKS:
- [ ] WCAG AAA Compliance
  ├─ Contrast ratio check (7:1)
  ├─ Heading structure (h1, h2, h3)
  ├─ Alt text em imagens
  └─ ARIA labels em icons

- [ ] Keyboard Navigation
  ├─ TAB order logical
  ├─ Nenhuma trap de foco
  ├─ ENTER funciona em buttons
  └─ ESC fecha modais

- [ ] Screen Reader
  ├─ NVDA testing (Windows)
  ├─ VoiceOver (Mac)
  └─ Conteúdo acessível

TOOLS:
- axe DevTools
- WAVE browser extension
- Lighthouse accessibility audit
```

### Day 3: Performance Optimization

#### Core Web Vitals

```
TASKS:
- [ ] LCP (Largest Contentful Paint)
  ├─ Hero image otimizada
  ├─ Fonts loading strategy
  ├─ Critical CSS inline
  └─ Target: < 2.5s

- [ ] FID (First Input Delay)
  ├─ JavaScript minimizado
  ├─ Long tasks eliminated
  ├─ Event listeners otimizados
  └─ Target: < 100ms

- [ ] CLS (Cumulative Layout Shift)
  ├─ Dimensões explícitas em images
  ├─ Web fonts não causam FOUT
  ├─ Sem inserção inesperada de elementos
  └─ Target: < 0.1

TOOLS:
- Google Lighthouse
- Web Vitals Library
- Chrome DevTools Performance tab
```

#### Code Optimization

```
TASKS:
- [ ] CSS Minification
  ├─ Produção: minified
  ├─ Removido unused CSS
  └─ Critical CSS identified

- [ ] JavaScript Optimization
  ├─ Componentes lazy-loaded
  ├─ Imports otimizados
  ├─ No console.log em prod
  └─ Type checking com TypeScript

- [ ] Image Optimization
  ├─ WebP format
  ├─ Responsive sizes
  ├─ Lazy loading
  └─ Compression (ImageOptim)
```

### Day 4: Documentation & Handoff

#### Create Documentation

```
TASKS:
- [ ] Design System Docs
  ├─ Colors grid visual
  ├─ Typography scale
  ├─ Spacing examples
  ├─ Component directory
  └─ Usage guidelines

- [ ] Component Library Docs
  ├─ Props interface
  ├─ Examples de uso
  ├─ CSS classes
  ├─ Accessibility notes
  └─ Common patterns

- [ ] Developer Guide
  ├─ Setup instructions
  ├─ Git workflow
  ├─ Testing guidelines
  ├─ Performance best practices
  └─ Troubleshooting

FILES:
- DESIGN_SYSTEM.md (comprehensive)
- COMPONENT_LIBRARY.md
- DEVELOPER_GUIDE.md
```

#### Create Storybook (Optional but Recommended)

```
TASKS:
- [ ] Setup Storybook
- [ ] Create stories para:
  ├─ Button (3 variants × 3 sizes)
  ├─ Card (default, interactive)
  ├─ Input (default, focused, disabled)
  ├─ StatCard (com trends)
  ├─ Badge (4 statuses)
  ├─ HeroSection (with content)
  ├─ EmptyState (examples)
  └─ All iFood components

- [ ] Document patterns
  ├─ Grid layouts
  ├─ Form patterns
  ├─ Loading states
  └─ Error handling

DELIVERABLE: Storybook live
```

### Day 5: Final Review & Launch

#### Final Checklist

```
QUALITY GATE CHECKLIST:

CODE QUALITY
┌─ TypeScript strict mode ✓
├─ ESLint passed ✓
├─ Prettier formatted ✓
└─ No console errors ✓

DESIGN SYSTEM
┌─ All colors documented ✓
├─ All typography defined ✓
├─ Spacing grid complete ✓
├─ Components inventory done ✓
└─ Animations approved ✓

PERFORMANCE
┌─ LCP < 2.5s ✓
├─ FID < 100ms ✓
├─ CLS < 0.1 ✓
├─ Lighthouse 90+ ✓
└─ No layout thrashing ✓

ACCESSIBILITY
┌─ WCAG AAA 100% ✓
├─ Keyboard nav complete ✓
├─ Screen reader compatible ✓
├─ Color blind safe ✓
└─ Focus indicators visible ✓

TESTING
┌─ Unit tests passing ✓
├─ Visual regression clean ✓
├─ Responsive tested 3x ✓
├─ Browser tested 3x ✓
└─ User feedback positive ✓

DOCUMENTATION
┌─ Design system docs done ✓
├─ Component docs done ✓
├─ Developer guide done ✓
├─ Storybook complete ✓
└─ README updated ✓
```

#### Launch & Celebration

```
TASKS:
- [ ] Final PR approval
- [ ] Merge to main
- [ ] Deploy to production
- [ ] Monitor metrics (1 week)
- [ ] Gather user feedback
- [ ] Document learnings

STATUS: ✅ DESIGN SYSTEM LAUNCH COMPLETE 🎉
```

---

## Metrics to Track

### Performance Metrics

```
BEFORE (Baseline)
┌─────────────────────┐
│ LCP:  3.2s          │
│ FID:  150ms         │
│ CLS:  0.15          │
│ Score: 78           │
└─────────────────────┘

AFTER (Target)
┌─────────────────────┐
│ LCP:  2.1s (34% ↓)  │
│ FID:  85ms (43% ↓)  │
│ CLS:  0.08 (47% ↓)  │
│ Score: 92 (18% ↑)   │
└─────────────────────┘
```

### Quality Metrics

```
ACCESSIBILITY
┌─ Contrast Issues: 0 (from 8)
├─ ARIA Violations: 0 (from 3)
├─ Keyboard Nav Score: 100%
└─ Screen Reader Score: 100%

CODE QUALITY
┌─ TypeScript Errors: 0
├─ ESLint Warnings: 0
├─ Unused CSS: 0
└─ Dead Code: 0

USER METRICS (Post-Launch)
┌─ Time to interact: -20%
├─ Error rate: -50%
├─ User satisfaction: +2.5/5
└─ Support tickets: -30%
```

---

## Risk Mitigation

| Risco | Mitigação | Timeline |
|-------|-----------|----------|
| Scope creep | Design system locked após Week 2 | Week 2 |
| Performance degradation | Monitor LCP/CLS diariamente | Weeks 1-8 |
| Accessibility issues | Audit após cada phase | All |
| Browser incompatibility | Test 3 browsers semana 4+ | Week 4+ |
| Design inconsistency | Design review em cada PR | All |
| Team alignment | Daily standups | All |

---

## Success Criteria

### Must Have

- ✅ Todos componentes implementados
- ✅ WCAG AAA compliance
- ✅ LCP < 2.5s
- ✅ Responsive 375-1920px
- ✅ Documentação completa

### Should Have

- ✅ Storybook setup
- ✅ Percy visual regression
- ✅ 90+ Lighthouse score
- ✅ User feedback positive
- ✅ Team trained

### Nice to Have

- ✅ Dark mode support
- ✅ Animation presets
- ✅ Figma tokens integration
- ✅ Design tokens export

---

## Communication Plan

### Weekly Status

```
MONDAY
├─ Daily standup (15 min)
├─ Blockers identified
└─ Priority for week

WEDNESDAY
├─ Mid-week check
├─ Demo of progress
└─ Feedback collected

FRIDAY
├─ Weekly wrap-up
├─ Metrics review
├─ Next week planning
└─ Celebrations & wins
```

### Stakeholder Updates

```
DAILY: Development team (Slack)
WEEKLY: Product manager (Email + Slack)
BI-WEEKLY: Design team (Meeting)
MONTHLY: Leadership (Presentation)
```

---

**This roadmap is your north star. Adjust as needed but keep the phases in order!**

Next step: Start PHASE 1 this week! 🚀
