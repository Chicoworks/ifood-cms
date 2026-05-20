# 🎨 Visual Reference - Design System iFood CMS
## Referência Visual de Componentes e Layouts

---

## 1. Paleta de Cores

### Core Colors

```
WHITE               LIGHT GRAY          GRAY 300            TEXT GRAY
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│          │       │          │       │          │       │          │
│ #FFFFFF  │       │ #F5F5F5  │       │ #E0E0E0  │       │ #757575  │
│          │       │          │       │          │       │          │
└──────────┘       └──────────┘       └──────────┘       └──────────┘
Pure White         Light Gray         Medium Gray        Medium Gray


DARK GRAY           PRIMARY RED         RED HOVER           RED DARK
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│          │       │          │       │          │       │          │
│ #212121  │       │ #EB0033  │       │ #D10029  │       │ #B5001F  │
│          │       │          │       │          │       │          │
└──────────┘       └──────────┘       └──────────┘       └──────────┘
Text Primary       iFood Brand        On Hover           On Active


GREEN               ORANGE              RED ERROR           BLUE INFO
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│          │       │          │       │          │       │          │
│ #4CAF50  │       │ #FF9800  │       │ #F44336  │       │ #2196F3  │
│          │       │          │       │          │       │          │
└──────────┘       └──────────┘       └──────────┘       └──────────┘
Success            Warning             Danger             Information
```

---

## 2. Tipografia - Escala

```
DISPLAY (32px, weight 700)
╔═════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║  Bem-vindo de volta, Daniel!                                        ║
║  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  ║
║                                                                       ║
╚═════════════════════════════════════════════════════════════════════╝


HEADING 1 (24px, weight 600)
╔═════════════════════════════════════════════════════════════════════╗
║ Seu Cardápio                                                         ║
║ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz              ║
╚═════════════════════════════════════════════════════════════════════╝


HEADING 2 (18px, weight 600)
╔═════════════════════════════════════════════════════════════════════╗
║ Hamburger Clássico                                                   ║
║ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz              ║
╚═════════════════════════════════════════════════════════════════════╝


BODY TEXT (14px, weight 500)
╔═════════════════════════════════════════════════════════════════════╗
║ Este é o texto principal usado em descrições e conteúdo principal. ║
║ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  ║
╚═════════════════════════════════════════════════════════════════════╝


CAPTION (12px, weight 400)
╔═════════════════════════════════════════════════════════════════════╗
║ Metainfo, timestamps, e labels secundários • 2 horas atrás        ║
║ ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz              ║
╚═════════════════════════════════════════════════════════════════════╝
```

**Font: Inter (Google Fonts)**
- Regular (400)
- Medium (500)
- Semibold (600)
- Bold (700)

---

## 3. Componentes Principais

### Button - Primary

```
DEFAULT                    HOVER                      ACTIVE
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│                      │   │  ↑ +Shadow           │   │                      │
│  + Create New Page   │   │  + Create New Page   │   │  + Create New Page   │
│                      │   │  ↑ -2px              │   │                      │
└──────────────────────┘   └──────────────────────┘   └──────────────────────┘
Height: 40px             Hover effect              Less elevation
Red #EB0033              shadow-md                 Ready to click
Text White               translateY(-2px)

DISABLED
┌──────────────────────┐
│                      │
│  + Create New Page   │   (opacity: 0.5)
│                      │
└──────────────────────┘
```

### Button - Secondary

```
DEFAULT                    HOVER
┌──────────────────────┐   ┌──────────────────────┐
│                      │   │  ↑ Background darker │
│  [View Details]      │   │  [View Details]      │
│                      │   │  ↑ -2px              │
└──────────────────────┘   └──────────────────────┘
Gray #F5F5F5             Subtle lift
```

### Card - Surface

```
DEFAULT                          HOVER
┌────────────────────────┐       ┌────────────────────────┐
│ Página Título          │       │ Página Título          │
│                        │       │                        │
│ Descrição breve        │       │ Descrição breve        │
│                        │       │  ↑ -4px (lifted)       │
│ Status • 2h ago        │       │  ↑ +Shadow             │
└────────────────────────┘       └────────────────────────┘
Background #F5F5F5              Elevation visible
Border 1px #E0E0E0              box-shadow-md
Padding 20px                    Interactive feedback
Shadow-sm (subtle)
```

### Input - Text Field

```
EMPTY                      FOCUSED                    DISABLED
┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
│ Search pages...      │   │ Search pages...█     │   │ Search pages...      │
└──────────────────────┘   ├──────────────────────┤   └──────────────────────┘
Border: #E0E0E0         └──────────────────────┘   (opacity: 0.6)
                        2px outline #EB0033     Cursor: not-allowed
                        box-shadow glow
```

### StatCard - Metric

```
┌────────────────┐
│                │
│       7        │  ← 32px, weight 700
│    Pages       │  ← 14px, weight 500
│   ↑ 2 week     │  ← 12px, red color
│                │
└────────────────┘
Height: 120px
Background: #F5F5F5
Border: 1px #E0E0E0
Centered text
```

### Badge - Status Indicator

```
● Published              ● Draft                  ● Archived
Green background         Gray background          Light gray
#E8F5E9                 #F5F5F5                  #EEEEEE
text #2E7D32            text #757575             text #9E9E9E
```

### Empty State - No Content

```
┌─────────────────────────────────────────┐
│                                         │
│          ✨                             │
│                                         │
│     Nenhuma página criada               │
│                                         │
│   Comece criando sua primeira página   │
│                                         │
│     [+ Create New Page]                │
│                                         │
└─────────────────────────────────────────┘
Border: 2px dashed #E0E0E0
Padding: 32px
Background: #F5F5F5
Centered content
Icon: opacity 0.3
```

---

## 4. Layouts

### Hero Section - Home Page

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║ Bem-vindo de volta, Daniel!                                                   ║
║ Você tem 7 páginas em andamento                                               ║
║                                                                                ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐                                     ║
║  │  7       │  │  2       │  │  3       │                                     ║
║  │ Pages    │  │Experiment│  │ Drafts   │                                     ║
║  │ ↑ 2week  │  │ Active   │  │ -1 today │                                     ║
║  └──────────┘  └──────────┘  └──────────┘                                     ║
║                                                                                ║
║           [+ Create New Page]                                                 ║
║                                                                                ║
╚═══════════════════════════════════════════════════════════════════════════════╝
Min-height: 240px
Padding: 48px 32px
Background: White
Border-bottom: 1px gray
```

### Pages Grid - 4 Columns

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Page 1      │  │ Page 2      │  │ Page 3      │  │ Page 4      │ │
│  │ Published   │  │ Published   │  │ Draft       │  │ Published   │ │
│  │ 2h ago      │  │ 1h ago      │  │ 5h ago      │  │ 30m ago     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Page 5      │  │ Page 6      │  │ Page 7      │  │ Page 8      │ │
│  │ Published   │  │ Archived    │  │ Published   │  │ Draft       │ │
│  │ 10h ago     │  │ 2d ago      │  │ 15m ago     │  │ 3h ago      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
grid-template-columns: repeat(4, 1fr)
gap: 16px
Padding: 32px
```

### Restaurant Card - Horizontal

```
╔════════════════════════════════════════════════════╗
║  ┌──────────┐                                      ║
║  │          │  Restaurant Name                    ║
║  │          │  ⭐ 4.8 (320 reviews)                ║
║  │ Image    │  📍 Delivery: 25-30 minutes         ║
║  │ 160×160  │  💵 R$ 8,00 taxa                    ║
║  │          │                                      ║
║  └──────────┘  [Edit] [Preview]                   ║
║                                                    ║
╚════════════════════════════════════════════════════╝
Padding: 16px
Gap: 16px
Height: 160px
Hover: lift -4px
```

### Menu Item Card - Grid

```
┌──────────────────────┐
│ [Image 120×120]      │
│                      │
│ Burger Clássico      │
│ R$ 29,90             │
│                      │
│ Pão, hambúrguer,     │
│ queijo e molho       │
│                      │
│ [View] [Edit]        │
└──────────────────────┘
Padding: 16px
Border-radius: 8px
Hover effect: lift -4px
```

---

## 5. Spacing Grid - 4px

```
Margin/Padding Values:
4px   ■ (1 unit)
8px   ■■ (2 units)
12px  ■■■ (3 units)
16px  ■■■■ (4 units)
20px  ■■■■■ (5 units)
24px  ■■■■■■ (6 units)
32px  ■■■■■■■■ (8 units)
48px  ■■■■■■■■■■■■ (12 units)

EXEMPLO: Card Padding
┌────────────────────────┐
│•20px (5×4)             │
│20px ┌────────────┐ 20px│
│     │ Content    │     │
│     │ Inside     │     │
│20px │ Card       │ 20px│
│     └────────────┘     │
│•20px (5×4)             │
└────────────────────────┘

EXEMPLO: Grid Gap
┌─────┐ 16px ┌─────┐ 16px ┌─────┐
│Card │      │Card │      │Card │
└─────┘      └─────┘      └─────┘
   4×4px        4×4px        4×4px
```

---

## 6. Border Radius Escala

```
Small (4px)          Medium (6px)         Large (8px)
┌────────┐          ┌──────────┐         ┌──────────┐
│        │          │          │         │          │
│        │          │          │         │          │
└────────┘          └──────────┘         └──────────┘
Input focus         Button default       Card default
Inputs              Buttons              Cards
Small elements      Medium elements      Large elements
```

---

## 7. Sombras - Elevation System

```
NO SHADOW (Default)
┌────────────┐
│ Element    │  0 shadow
└────────────┘


SHADOW-SM (Subtle Elevation)
┌────────────┐
│ Element    │ ↑ 1px
└────────────┘
0 1px 3px rgba(0,0,0,0.05)


SHADOW-MD (Hover/Focus)
╔════════════╗
║ Element    ║ ↑ 4px
╚════════════╝
0 4px 12px rgba(0,0,0,0.1)


SHADOW-LG (Modals/Dropdowns)
╔════════════╗
║ Element    ║ ↑ 8px
╚════════════╝
0 8px 24px rgba(0,0,0,0.12)
```

---

## 8. Animações - Duração e Ease

```
FADE IN (200ms ease-out)
  ▂▄▆█████  ▂▄▆█████

SLIDE UP (300ms ease-out)
  ▂▄▆█████  ▂▄▆█████
  ↑ from 16px down to 0px

HOVER LIFT (200ms)
  before:  ████████
  after:   ▬▬▬▬▬▬▬▬ (higher)

PULSE (2000ms loop)
  ●●●●●◌◌◌◌◌ → ◌◌◌●●●●●◌◌ → ◌◌◌◌◌●●●●●

STAGGER (50ms increments)
  Card 1: 0ms   ▮
  Card 2: 50ms    ▮
  Card 3: 100ms     ▮
  Card 4: 150ms       ▮
```

---

## 9. Responsive Breakpoints

```
DESKTOP (1920px)
┌─────────────────────────────────────────────┐
│ Sidebar  │  Main Content                    │
│ 260px    │  Grid 4 columns                  │
│          │  Max-width 1280px                │
│          │                                   │
│          │  ┌──┐ ┌──┐ ┌──┐ ┌──┐            │
│          │  │  │ │  │ │  │ │  │            │
│          │  └──┘ └──┘ └──┘ └──┘            │
│          │                                   │
└─────────────────────────────────────────────┘


TABLET (1024px)
┌─────────────────────────┐
│  Main Content           │
│  Grid 2 columns         │
│                          │
│  ┌──────┐ ┌──────┐     │
│  │      │ │      │     │
│  └──────┘ └──────┘     │
│  ┌──────┐ ┌──────┐     │
│  │      │ │      │     │
│  └──────┘ └──────┘     │
│                          │
└─────────────────────────┘
Sidebar collapses
Hero responsive


MOBILE (375px)
┌──────────────┐
│ Main Content │
│ Grid 1 column│
│              │
│ ┌──────────┐ │
│ │          │ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │          │ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │          │ │
│ └──────────┘ │
│              │
└──────────────┘
Full width
Stacked
Touch friendly
```

---

## 10. Exemplo: Home Page Completa

```
╔═══════════════════════════════════════════════════════════════════════════╗
║ iFood CMS                                          User ▼  Settings ▲     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║ Bem-vindo de volta, Daniel!                                               ║
║ Você tem 7 páginas em andamento                                           ║
║                                                                             ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐                                 ║
║  │  7       │  │  2       │  │  3       │                                 ║
║  │ Pages    │  │Experiment│  │ Drafts   │                                 ║
║  │ ↑ 2week  │  │ Active   │  │ -1 today │                                 ║
║  └──────────┘  └──────────┘  └──────────┘                                 ║
║                                                                             ║
║         [+ Create New Page]                                               ║
║                                                                             ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ║
║ │ Página 1     │  │ Página 2     │  │ Página 3     │  │ Página 4     │   ║
║ │ Published    │  │ Published    │  │ Draft        │  │ Published    │   ║
║ │ 2h ago       │  │ 1h ago       │  │ 5h ago       │  │ 30m ago      │   ║
║ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   ║
║                                                                             ║
║ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   ║
║ │ Página 5     │  │ Página 6     │  │ Página 7     │  │ Página 8     │   ║
║ │ Published    │  │ Archived     │  │ Published    │  │ Draft        │   ║
║ │ 10h ago      │  │ 2d ago       │  │ 15m ago      │  │ 3h ago       │   ║
║ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   ║
║                                                                             ║
╚═══════════════════════════════════════════════════════════════════════════╝

CORES:
Header: White #FFFFFF
Cards: Light Gray #F5F5F5
Borders: Gray #E0E0E0
Text: Dark Gray #212121
Button: Red #EB0033

SPACING:
Header-padding: 16px
Hero-padding: 48px
Grid-padding: 32px
Card-padding: 16px
Grid-gap: 16px (4×4px)

TIPOGRAFIA:
Hero-title: 32px, weight 700
Stats: 14px, weight 500
Card-title: 14px, weight 500
```

---

## Checklist Visual Rápido

Ao revisar um componente, valide:

```
TIPOGRAFIA
┌─ Tamanho correto? (32, 24, 18, 14, 12)
├─ Weight correto? (400, 500, 600, 700)
├─ Cor correta? (Dark, Gray, Red)
└─ text-balance em headings?

CORES
┌─ Background correto?
├─ Text com contraste ≥ 7:1?
├─ Vermelho APENAS em ações primárias?
└─ Cores semânticas corretas?

SPACING
┌─ Padding múltiplo de 4px?
├─ Gap múltiplo de 4px?
├─ Card padding é 20px?
└─ Sem valores aleatórios?

COMPONENTES
┌─ Button altura 40px?
├─ Card com border 1px #E0E0E0?
├─ Input altura 40px?
└─ Shadow correta no hover?

ANIMAÇÕES
┌─ Duração máxima 300ms?
├─ Apenas transform + opacity?
├─ prefers-reduced-motion respeitado?
└─ Hover lift é -4px?

ACESSIBILIDADE
┌─ Focus indicator visível (2px)?
├─ Contraste 7:1 (WCAG AAA)?
├─ aria-label em icon buttons?
└─ Keyboard navigation funciona?
```

---

**Use este documento como referência visual durante o desenvolvimento!**
Imprima ou compartilhe com seu time de design.
