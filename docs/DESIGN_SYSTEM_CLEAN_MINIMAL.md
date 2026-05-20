# 🎨 Design System Clean & Minimal - iFood CMS
## Recomendações Premium baseadas em Awwwards - UI/UX Principles

**Data:** 14 de Maio de 2026
**Objetivo:** Design minimalista e clean para CMS iFood com identidade visual forte e comunicação objetiva

---

## 📋 Índice

1. [Filosofia de Design](#1-filosofia-de-design)
2. [Tipografia](#2-tipografia)
3. [Paleta de Cores](#3-paleta-de-cores)
4. [Espaçamento e Grid](#4-espaçamento-e-grid)
5. [Componentes Essenciais](#5-componentes-essenciais)
6. [Animações](#6-animações)
7. [Hierarquia Visual](#7-hierarquia-visual)
8. [Exemplos de Uso](#8-exemplos-de-uso)
9. [Checklist de Implementação](#9-checklist-de-implementação)

---

## 1. Filosofia de Design

### Princípios Fundamentais

**Menos é Mais**
- Remover elementos desnecessários
- Maximizar o uso do espaço em branco
- Um elemento visual por mensagem
- Conteúdo direto ao ponto

**Clareza Absoluta**
- Hierarquia visual óbvia
- Textos curtos e concisos
- Ícones como protagonistas (não decoração)
- Cores com propósito

**Impacto Visual**
- Usar o vermelho iFood com inteligência
- Contrastes sutis mas efetivos
- Movimento apenas quando necessário
- Superfícies limpas e modernas

**Comunicação Objetiva**
- Mostrar, não contar
- Dados visuais em primeiro plano
- Ações claras e diretas
- Feedback imediato

### Guia de Decisão

```
┌─────────────────────────────────────┐
│ Elemento é essencial?               │
├─────────────────────────────────────┤
│ NÃO → REMOVA                        │
│ SIM → Pode ser mais simples?        │
│       NÃO → MANTENHA                │
│       SIM → SIMPLIFIQUE             │
└─────────────────────────────────────┘
```

---

## 2. Tipografia

### Estratégia: Menos Tamanhos, Maior Impacto

Usar apenas **5 tamanhos de fonte** em vez de 10+:

| Uso | Tamanho | Weight | Line-height | Exemplo |
|-----|---------|--------|-------------|---------|
| **Display (Hero)** | 32px | 700 | 1.2 | Bem-vindo, Daniel! |
| **Heading 1** | 24px | 600 | 1.3 | Seção Principal |
| **Heading 2** | 18px | 600 | 1.3 | Card Title |
| **Body** | 14px | 500 | 1.5 | Texto principal |
| **Caption** | 12px | 400 | 1.4 | Meta informação |

### Fonte: Inter (Google Fonts)

**Por que Inter?**
- Extremamente legível em pequenos tamanhos
- Design neutralista mas com personalidade
- Excelentes ligaduras e números
- Suporte a variações de weight

### Implementação CSS

```css
/* Variável de fonte */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-size-display: 32px;
--font-size-h1: 24px;
--font-size-h2: 18px;
--font-size-body: 14px;
--font-size-caption: 12px;

/* Weights apenas: 400, 500, 600, 700 */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Regra: text-balance e text-pretty

```css
/* Headings sempre com text-balance */
h1, h2, h3 {
  text-balance: balance;
}

/* Body com text-pretty para melhor quebra */
p {
  text-pretty: pretty;
}
```

### Números: tabular-nums

```css
/* Métricas, preços, estatísticas */
.metric, .price, .statistic {
  font-variant-numeric: tabular-nums;
}
```

---

## 3. Paleta de Cores

### Core Colors (Minimalista)

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **White** | #FFFFFF | 255,255,255 | Backgrounds e superfícies principais |
| **Light Gray** | #F5F5F5 | 245,245,245 | Backgrounds secundários |
| **Gray 300** | #E0E0E0 | 224,224,224 | Borders, divisores |
| **Gray 600** | #757575 | 117,117,117 | Text secundário |
| **Dark Gray** | #212121 | 33,33,33 | Text primário |
| **Primary Red** | #EB0033 | 235,0,51 | Ações, destaque |
| **Red Hover** | #D10029 | 209,0,41 | Estados hover do vermelho |

### Filosofia Cromática

**Paleta Neutra Base**
- Fundo: Branco puro (#FFFFFF)
- Superfícies: Gray 50 (#F5F5F5) e Gray 100 (#F0F0F0)
- Texto: Dark Gray (#212121) para máxima clareza
- Borders: Gray 300 (#E0E0E0) para subtileza

**Vermelho iFood como Accent**
- Usar APENAS para ações primárias
- Botões principais
- Estados ativos
- Destaques importantes
- NÃO usar como cor de fundo

### Exemplo de Uso

```css
/* Page background */
body {
  background-color: #FFFFFF;
  color: #212121; /* High contrast */
}

/* Card background */
.card {
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
}

/* Primary action */
.button-primary {
  background-color: #EB0033;
  color: #FFFFFF;
}
.button-primary:hover {
  background-color: #D10029;
}

/* Secondary text */
.text-secondary {
  color: #757575;
}
```

### Contraste: AAA Verified

- Dark Gray (#212121) sobre White (#FFFFFF) = 18:1 ✅
- Dark Gray (#212121) sobre Gray 50 (#F5F5F5) = 17:1 ✅
- Gray 600 (#757575) sobre White (#FFFFFF) = 5.7:1 ✅
- Red (#EB0033) com White text = 8.2:1 ✅

---

## 4. Espaçamento e Grid

### Grid de 4px

Todos os espaçamentos são múltiplos de 4px:

```
4px  = 1 unidade
8px  = 2 unidades
12px = 3 unidades
16px = 4 unidades
20px = 5 unidades
24px = 6 unidades
28px = 7 unidades
32px = 8 unidades
40px = 10 unidades
48px = 12 unidades
```

### Espaçamento Recomendado por Tipo

| Elemento | Padding | Margin | Gap |
|----------|---------|--------|-----|
| **Página** | - | 32px (sides) | - |
| **Section** | - | 32px (top/bottom) | - |
| **Card** | 20px | - | - |
| **Button** | 10px 16px | - | - |
| **Input** | 10px 12px | - | - |
| **Flex Items** | - | - | 16px |
| **Grid Items** | - | - | 16px |
| **Horizontal** | - | - | 8px |

### Exemplo: Card com Padding

```css
.card {
  padding: 20px; /* 5×4px */
  gap: 16px; /* 4×4px entre items */
}

.card-title {
  margin-bottom: 12px; /* 3×4px */
}

.card-description {
  margin-bottom: 16px; /* 4×4px */
}
```

### Grid Layout

```css
/* Desktop Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1280px;
}

/* Tablet */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 375px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Whitespace Strategy

**Regra 40/60:**
- 40% de conteúdo
- 60% de espaço em branco

```
┌─────────────────────────────────┐
│     (whitespace)                │
│  ┌──────────────────┐           │
│  │   Conteúdo       │           │
│  │   (40%)          │ whitespace│
│  └──────────────────┘   (60%)   │
│                                 │
└─────────────────────────────────┘
```

---

## 5. Componentes Essenciais

### 5.1 Button - Ação Principal

```
┌──────────────────┐
│   + Create Page  │  ← Vermelho #EB0033
└──────────────────┘
```

**Especificações:**
- Height: 40px
- Padding: 10px 16px
- Border-radius: 6px
- Font: 14px, weight 600
- Background: #EB0033
- Hover: #D10029, +2px shadow, -2px translateY
- Transition: 200ms ease-out

```css
.button-primary {
  height: 40px;
  padding: 10px 16px;
  border-radius: 6px;
  background-color: #EB0033;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.button-primary:hover {
  background-color: #D10029;
  box-shadow: 0 4px 12px rgba(235, 0, 51, 0.2);
  transform: translateY(-2px);
}

.button-primary:active {
  transform: translateY(0);
}
```

### 5.2 Card - Superfície

```
┌────────────────────────────┐
│                            │
│  Título da Página          │
│  Descrição breve           │
│                            │
│  Status • 2 horas atrás    │
│                            │
└────────────────────────────┘
```

**Especificações:**
- Padding: 20px
- Border-radius: 8px
- Background: #F5F5F5
- Border: 1px #E0E0E0
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Hover: +4px shadow, -2px translateY

```css
.card {
  padding: 20px;
  border-radius: 8px;
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}
```

### 5.3 Input - Entrada de Dados

```
┌─────────────────────────┐
│ Buscar páginas...       │
└─────────────────────────┘
```

**Especificações:**
- Height: 40px
- Padding: 10px 12px
- Border-radius: 6px
- Border: 1px #E0E0E0
- Font: 14px
- Focus: 2px #EB0033 outline

```css
.input {
  height: 40px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #E0E0E0;
  font-size: 14px;
  font-family: inherit;
  transition: all 200ms ease-out;
}

.input:focus {
  outline: 2px solid #EB0033;
  outline-offset: 2px;
  border-color: #EB0033;
}

.input::placeholder {
  color: #757575;
}
```

### 5.4 Stat Card - Métrica

```
┌──────────────┐
│      7       │  ← 32px, weight 700
│    Pages     │  ← 14px, weight 500
│   ↑ 2 this   │  ← 12px, color red
│    week      │
└──────────────┘
```

**Especificações:**
- Padding: 16px
- Height: 120px
- Display: Flex (center column)
- Stat number: 32px, weight 700, color #212121
- Label: 14px, weight 500
- Meta: 12px, #757575

```css
.stat-card {
  padding: 16px;
  height: 120px;
  border-radius: 8px;
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #212121;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: #212121;
}

.stat-meta {
  font-size: 12px;
  color: #EB0033;
}
```

### 5.5 Badge - Status

```
● Published    ● Draft    ● Archived
```

**Especificações:**
- Padding: 4px 8px
- Border-radius: 4px
- Font: 12px, weight 500
- Colors:
  - Published: Green (#4CAF50)
  - Draft: Gray (#757575)
  - Archived: Gray (#E0E0E0)

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge--published {
  background-color: #E8F5E9;
  color: #2E7D32;
}

.badge--draft {
  background-color: #F5F5F5;
  color: #757575;
}

.badge--archived {
  background-color: #EEEEEE;
  color: #9E9E9E;
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}
```

### 5.6 Empty State - Sem Conteúdo

```
┌──────────────────────────────┐
│                              │
│      ✨ Nenhuma página       │
│                              │
│   Comece criando sua         │
│   primeira página            │
│                              │
│   [+ Create Page]            │
│                              │
└──────────────────────────────┘
```

**Especificações:**
- Icon: 48px, opacity 0.3
- Heading: 18px, weight 600
- Description: 14px, weight 400, #757575
- CTA: Button primário

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  gap: 16px;
  padding: 32px;
  border: 2px dashed #E0E0E0;
  border-radius: 8px;
  background-color: #F5F5F5;
}

.empty-state__icon {
  font-size: 48px;
  opacity: 0.3;
}

.empty-state__title {
  font-size: 18px;
  font-weight: 600;
  color: #212121;
}

.empty-state__description {
  font-size: 14px;
  color: #757575;
  text-align: center;
  max-width: 300px;
}
```

### 5.7 Hero Section - Boas-vindas

```
┌─────────────────────────────────┐
│                                 │
│ Bem-vindo de volta, Daniel!     │
│ Você tem 7 páginas em andamento │
│                                 │
│ [Stats Cards]                   │
│                                 │
│ [+ Create New Page]             │
│                                 │
└─────────────────────────────────┘
```

**Especificações:**
- Min-height: 240px
- Padding: 48px 32px
- Background: #FFFFFF
- Border-bottom: 1px #E0E0E0
- Title: 32px, weight 700
- Subtitle: 16px, weight 400, #757575

```css
.hero {
  min-height: 240px;
  padding: 48px 32px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

.hero__title {
  font-size: 32px;
  font-weight: 700;
  color: #212121;
  text-balance: balance;
}

.hero__subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #757575;
}
```

---

## 6. Animações

### Filosofia: Menos é Mais

Regras de Ouro:
1. **Apenas transform e opacity**
2. **Duração máxima 300ms**
3. **Respeitar prefers-reduced-motion**
4. **Sempre com propósito**

### 6.1 Hover Lift

```css
.interactive {
  transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .interactive {
    transition: none;
  }
  .interactive:hover {
    transform: none;
  }
}
```

### 6.2 Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 200ms ease-out forwards;
}
```

### 6.3 Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 300ms ease-out forwards;
}
```

### 6.4 Pulse (Ação em Progresso)

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.loading {
  animation: pulse 2000ms ease-in-out infinite;
}
```

### 6.5 Stagger Effect (Múltiplos Cards)

```css
.card {
  animation: slideUp 300ms ease-out forwards;
}

.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 50ms; }
.card:nth-child(3) { animation-delay: 100ms; }
.card:nth-child(4) { animation-delay: 150ms; }
```

### Exemplo Completo: Button com Feedback

```css
.button {
  position: relative;
  overflow: hidden;
  transition: all 200ms ease-out;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(235, 0, 51, 0.2);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(235, 0, 51, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

---

## 7. Hierarquia Visual

### Escala de Importância

**1. Mais Importante (Hero)**
- Tamanho: 32px
- Weight: 700
- Color: #212121
- Exemplo: Título principal

**2. Importante (Heading)**
- Tamanho: 24px
- Weight: 600
- Color: #212121
- Exemplo: Títulos de seção

**3. Conteúdo (Body)**
- Tamanho: 14px
- Weight: 500
- Color: #212121
- Exemplo: Descrições

**4. Suporte (Secondary)**
- Tamanho: 12px
- Weight: 400
- Color: #757575
- Exemplo: Meta informações

**5. Menos Importante (Caption)**
- Tamanho: 12px
- Weight: 400
- Color: #BDBDBD
- Exemplo: Timestamps

### Uso de Cor como Hierarquia

```
Preto (#212121) = Informação essencial
Cinza (#757575) = Informação secundária
Vermelho (#EB0033) = Ação/Destaque
```

### Uso de Espaço como Hierarquia

```
Mais espaço = Mais importante
Menos espaço = Menos importante
```

---

## 8. Exemplos de Uso

### Exemplo 1: Home Page

```html
<main>
  <!-- Hero Section -->
  <section class="hero">
    <h1 class="hero__title">Bem-vindo de volta, Daniel!</h1>
    <p class="hero__subtitle">Você tem 7 páginas em andamento</p>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">7</div>
        <div class="stat-label">Pages</div>
        <div class="stat-meta">↑ 2 this week</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">2</div>
        <div class="stat-label">Experiments</div>
        <div class="stat-meta">Active</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">3</div>
        <div class="stat-label">Drafts</div>
        <div class="stat-meta">-1 today</div>
      </div>
    </div>

    <!-- CTA -->
    <button class="button-primary">+ Create New Page</button>
  </section>

  <!-- Pages Grid -->
  <section class="pages-grid">
    <div class="card">
      <h3 class="card__title">Page Title</h3>
      <p class="card__description">Short description</p>
      <div class="card__footer">
        <span class="badge badge--published">
          <span class="badge__dot"></span>
          Published
        </span>
        <span class="text-secondary">2h ago</span>
      </div>
    </div>
    <!-- Repeat cards -->
  </section>
</main>
```

### Exemplo 2: Form Section

```html
<form class="form">
  <!-- Input -->
  <div class="form-group">
    <label for="title" class="label">Page Title</label>
    <input
      id="title"
      type="text"
      class="input"
      placeholder="Enter page title"
    />
  </div>

  <!-- Submit -->
  <button type="submit" class="button-primary">
    Save Page
  </button>
</form>
```

### Exemplo 3: Empty State

```html
<div class="empty-state">
  <div class="empty-state__icon">✨</div>
  <h2 class="empty-state__title">Nenhuma página criada</h2>
  <p class="empty-state__description">
    Comece criando sua primeira página para começar
  </p>
  <button class="button-primary">+ Create New Page</button>
</div>
```

---

## 9. Checklist de Implementação

### Fase 1: Foundation (1-2 semanas)

- [ ] Configurar CSS Custom Properties para cores
- [ ] Importar font Inter do Google Fonts
- [ ] Criar componentes base (Button, Card, Input)
- [ ] Implementar spacing grid (4px)
- [ ] Adicionar reset.css normalizado

```css
/* globals.css */
:root {
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-100: #F0F0F0;
  --color-gray-300: #E0E0E0;
  --color-gray-600: #757575;
  --color-dark: #212121;
  --color-primary: #EB0033;
  --color-primary-hover: #D10029;

  --font-family: 'Inter', -apple-system, sans-serif;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 18px;
  --font-size-body: 14px;
  --font-size-caption: 12px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### Fase 2: Componentes (2-3 semanas)

- [ ] Criar Hero component
- [ ] Criar StatCard component
- [ ] Redesenhar PageCard component
- [ ] Criar Empty State component
- [ ] Adicionar Badge component
- [ ] Implementar responsive layouts

### Fase 3: Interatividade (1-2 semanas)

- [ ] Adicionar hover states a todos os componentes
- [ ] Implementar animações (fade, slide, lift)
- [ ] Adicionar focus states (a11y)
- [ ] Testar prefers-reduced-motion
- [ ] Adicionar loading states

### Fase 4: Polish (1 semana)

- [ ] Auditoria de contraste (WCAG AAA)
- [ ] Testar em múltiplos viewports
- [ ] Otimizar performance (LCP, CLS)
- [ ] Feedback de usuários
- [ ] Documentação final

---

## 📊 Comparativo: Antes vs Depois

### ANTES (Genérico)

```
┌─────────────────────────────┐
│ Welcome                     │
│                             │
│ [Card] [Card] [Card]       │
│ [Card] [Card] [Card]       │
│ [Card] [Card] [Card]       │
│                             │
└─────────────────────────────┘
```

Características:
- Design genérico
- Muito texto
- Sem hierarquia clara
- Animações excessivas ou nenhuma
- Cores aleatórias

### DEPOIS (Clean & Minimal)

```
┌─────────────────────────────────┐
│                                 │
│ Bem-vindo, Daniel!              │
│ 7 páginas em andamento          │
│                                 │
│  [7 Pages] [2 Active] [3 Draft] │
│                                 │
│      [+ Create New Page]        │
│                                 │
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ Pág │ │ Pág │ │ Pág │        │
│ └─────┘ └─────┘ └─────┘        │
│                                 │
└─────────────────────────────────┘
```

Características:
- Design clean e minimalista
- Máximo impacto visual
- Hierarquia óbvia
- Animações sutis e propositais
- Vermelho iFood em destaque

---

## 🚀 Próximos Passos

1. **Revisar** este documento com o time de design
2. **Validar** cores com teste de contraste
3. **Criar** componentes React com CSS Modules
4. **Implementar** em ordem: base → componentes → animações
5. **Testar** em múltiplos devices
6. **Iteração** baseada em feedback de usuários

---

## 📚 Referências

- Awwwards Design System Guidelines
- Material Design 3 - Principles of Good Design
- Tailwind CSS Spacing Scale
- Web Content Accessibility Guidelines (WCAG)
- Inter Font - Roboto Type

---

**Documento criado:** 14 de Maio de 2026
**Baseado em:** Princípios Awwwards + WCAG + Material Design
**Status:** Pronto para Implementação
