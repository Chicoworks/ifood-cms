# 🎨 Proposta de Redesign - Home Page iFood CMS
## Baseado em Princípios Awwwards - Premium UI/UX

---

## 📐 Nova Arquitetura de Layout

### 1. **Hero Section Expandido** (Novo)
```
┌─────────────────────────────────────────────────────┐
│                                                       │
│  Bem-vindo de volta, Daniel!                        │
│  Você tem 7 páginas • 2 experimentos em andamento   │
│                                                       │
│  [📊 Stats]  [🎯 Quick Actions]  [⚡ Trending]      │
│                                                       │
└─────────────────────────────────────────────────────┘
```

**Características:**
- Altura: 240px (expandido, mais impactante)
- Gradiente sutil de fundo: surface-base → rgba(47,46,48,0.02)
- Typography: Heading em 28px, weight 700
- Stats em 3 colunas: Pages, Experiments, Drafts
- Call-to-action principal: "Create New Page" (prominent)

---

### 2. **Stats/Metrics Cards** (Novo)
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ 7 Pages  │  │ 2 Active │  │ 3 Drafts │
│ ↑ 2 this │  │Exps ↑ 1  │  │ -1 today │
│ week     │  │ week     │  │          │
└──────────┘  └──────────┘  └──────────┘
```

**Estilo:**
- Cards com height: 120px
- Subtle gradient: rgba(47,46,48,0.02) → transparent
- Border: none, apenas shadow-sm
- Hover: Lift effect + shadow-md
- Número grande (32px, weight 700)
- Meta texto em secondary gray

---

### 3. **Featured Project - Layout Horizontal** (Redesenhado)
```
┌─────────────────────────────────────────────┐
│ [Image]     Título do Projeto               │
│ 160×160     Status: Published                │
│             Última edição: 2 horas atrás     │
│             [Edit] [Duplicate] [Delete]      │
└─────────────────────────────────────────────┘
```

**Melhoria:**
- Layout horizontal em vez de vertical
- Imagem à esquerda (160×160px)
- Info + Actions à direita
- Altura: 160px
- Melhor uso do espaço

---

### 4. **Bento Grid - Cards de Diferentes Tamanhos**
```
┌─────────────────────────────────────────┐
│  PAGES               │  RECENT ACTIVITY  │
│                      │                   │
│  [Card 1]  [Card 2]  │  • Page A edited  │
│  [Card 3]  [Card 4]  │  • Page B created │
│  [Card 5]  [Card 6]  │  • Page C deleted │
└─────────────────────────────────────────┘
```

**Grid:**
```
grid-template-columns: repeat(6, 1fr);
gap: 16px;

.pageCard {
  grid-column: span 2;  /* 2/6 width */
  height: 140px;
}

.activityCard {
  grid-column: span 2;
  grid-row: span 3;  /* Tall card */
}
```

**Card Styles:**
- Borders: None (apenas shadows)
- Shadow-sm default → shadow-md on hover
- Border-radius: 10px
- Padding: 16px
- Background: var(--color-white)

---

### 5. **Empty State - Premium Design**
```
┌─────────────────────────────────────────┐
│                                          │
│         ✨ Nenhuma página criada        │
│                                          │
│    Comece criando sua primeira página   │
│                                          │
│         [+ Create New Page]              │
│                                          │
└─────────────────────────────────────────┘
```

**Estilo:**
- Background: rgba(47,46,48,0.02)
- Border: 1px dashed var(--color-border)
- Icon: Opacity 0.3 (muito sutil)
- CTA Button: Primary red com hover lift

---

### 6. **Page Card Variations**

#### **Default Page Card (Bento Item)**
```
┌─────────────────┐
│ [Image]         │
│                 │
│ Page Title      │
│ Published •2h   │
│                 │
│ [Menu]          │
└─────────────────┘
```

Height: 140px
Hover: Lift up 4px, shadow-md

---

#### **Featured/Recent Page Card (Horizontal)**
```
┌──────────────────────────────────┐
│ [Img] │ Title                    │
│ 160px │ Status info              │
│       │ Last edited              │
│       │ [Actions...]             │
└──────────────────────────────────┘
```

Height: 160px
Full width or 2/3 width

---

## 🎨 Design System Updates

### Colors
- **Background:** #E4E4E4 (surface-base)
- **Cards:** #2F2E30 (surface-raised)
- **Text:** #565656 (text-primary)
- **Accents:** #EB0033 (color-primary)

### Typography
- **Hero Title:** 28px, weight 700, text-balance
- **Card Title:** 16px, weight 600
- **Meta:** 12px, weight 400, color: text-secondary
- **Stats Number:** 32px, weight 700

### Spacing
- **Section Gaps:** 32px (8×4px)
- **Card Padding:** 16px (4×4px)
- **Grid Gap:** 16px (4×4px)

### Interactive States
- **Hover:**
  - Box shadow: shadow-md
  - Transform: translateY(-4px)
  - Transition: 0.2s ease
- **Focus:** 2px solid #5E6AD2 outline
- **Active:** shadow-md + subtle color shift

---

## 📏 Layout Grid

### Desktop (1920px)
```
Sidebar (260px) | Main (1660px)
                 ├─ Header (56px)
                 ├─ Hero (240px)
                 ├─ Stats (120px)
                 ├─ Featured (160px)
                 ├─ Pages Grid (6 cols)
```

### Tablet (1024px)
```
Sidebar (collapsed to 72px) | Main
Header expands
Hero: 180px
Stats: 3 rows (stacked)
Grid: 3 columns
Featured: 100% width
```

### Mobile (375px)
```
Stack layout
No sidebar (hidden)
Header: 48px
Hero: responsive
Stats: 1 column
Grid: 1-2 columns
```

---

## 🔄 Transitions & Animations

### Card Entrance
```css
animation: cardSlideUp 0.6s ease both;

@keyframes cardSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Hover Lift
```css
transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

&:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

### Page Load Stagger
```
Card 1: delay 0ms
Card 2: delay 50ms
Card 3: delay 100ms
...
```

---

## 📦 Component Structure

### New Home Layout

```
<HomePage>
  <Sidebar />
  <main>
    <HeroSection>
      <Greeting />
      <Stats>
        <StatCard pages={7} />
        <StatCard experiments={2} />
        <StatCard drafts={3} />
      </Stats>
      <PrimaryAction />
    </HeroSection>

    <FeaturedSection>
      <FeaturedPageCard page={mostRecent} />
    </FeaturedSection>

    <PagesGrid>
      <PageCard page={page} size="sm" />
      <PageCard page={page} size="sm" />
      <PageCard page={page} size="sm" />
      <RecentActivityCard /> {/* tall card */}
      <QuickActionsCard /> {/* tall card */}
    </PagesGrid>

    <EmptyState /> {/* if no pages */}
  </main>
</HomePage>
```

---

## 🎯 Benefits of New Design

✅ **Better Visual Hierarchy**
- Hero section immediately communicates context
- Stats provide quick insights
- Grid layout feels premium and organized

✅ **Improved Usability**
- Featured project easier to access
- Quick actions visible immediately
- Empty state encouraging

✅ **Premium Feel**
- More whitespace
- Subtle animations
- Consistent use of shadows
- Professional color palette

✅ **Better Performance**
- Fewer cards visible on initial load
- Lazy loading possible for grid items
- Optimized animations (transform only)

✅ **Accessibility**
- Better contrast ratios
- Clear focus states
- Semantic structure
- Proper heading hierarchy

---

## 📋 Implementation Checklist

- [ ] Create new `hero.module.css` for hero section
- [ ] Update `home.module.css` with grid layout
- [ ] Add StatCard component
- [ ] Update FeaturedCard to horizontal layout
- [ ] Redesign PageCard component
- [ ] Create ActivityCard component
- [ ] Add animations to `globals.css`
- [ ] Update page.tsx component structure
- [ ] Test responsive behavior
- [ ] Optimize performance
- [ ] A/B test with users

---

## 🚀 Next Steps

1. **Review this proposal** - Confirm direction is correct
2. **Create components** - Build StatCard, update layout
3. **Implement styles** - CSS Grid, animations
4. **Test responsiveness** - Mobile, tablet, desktop
5. **Performance audit** - LCP, CLS, FID
6. **User feedback** - Gather feedback on new design

