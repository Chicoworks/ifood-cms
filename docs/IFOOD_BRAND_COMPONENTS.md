# 🍔 iFood Brand Components
## Componentes específicos alinhados com identidade visual iFood

---

## 1. Paleta iFood Extended

### Cores Primárias

| Nome | Hex | RGB | Uso | Exemplo |
|------|-----|-----|-----|---------|
| **iFood Red** | #EB0033 | 235,0,51 | Ações principais, CTAs | Botões criar, editar |
| **Red Hover** | #D10029 | 209,0,41 | Hover states | Ao passar mouse |
| **Red Dark** | #B5001F | 181,0,31 | Active states | Ao clicar |
| **Red Light** | #FFE5EB | 255,229,235 | Backgrounds | Alertas, highlights |

### Cores Neutras

| Nome | Hex | Uso |
|------|-----|-----|
| **White** | #FFFFFF | Backgrounds principais |
| **Gray 50** | #F5F5F5 | Backgrounds secundários |
| **Gray 200** | #EEEEEE | Borders, divisores |
| **Gray 600** | #757575 | Texto secundário |
| **Dark** | #212121 | Texto primário |

### Cores Semânticas

| Nome | Hex | Uso |
|------|-----|-----|
| **Success** | #4CAF50 | Published, ativo, sucesso |
| **Warning** | #FF9800 | Draft, em revisão |
| **Danger** | #F44336 | Delete, erro, crítico |
| **Info** | #2196F3 | Informação, dica |

---

## 2. Tipografia iFood

### Fonte Principal: Inter

**Recomendação iFood:**
- Usar Inter para todo o CMS
- Sem serifs (moderno, limpo)
- Excelente legibilidade em telas
- Alinhado com design moderno de apps

### Tamanhos Tipográficos

```css
/* DISPLAY - Para títulos principais */
.display {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
}
/* Uso: Welcome message, Page titles */

/* HEADING 1 - Para seções principais */
.h1 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
}
/* Uso: Section titles, Card titles */

/* HEADING 2 - Para subsções */
.h2 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}
/* Uso: Subtitles, Labels */

/* BODY - Texto principal */
.body {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}
/* Uso: Descrições, Conteúdo */

/* CAPTION - Texto pequeno */
.caption {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: #757575;
}
/* Uso: Meta informações, Timestamps */

/* LABEL - Para inputs */
.label {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}
/* Uso: Labels de form */
```

---

## 3. Componentes iFood Específicos

### 3.1 Restaurant Card - Menu Principal

```
┌──────────────────────────────────┐
│ [Image]        Restaurant Name   │
│ 160×160        ⭐ 4.8 (320)      │
│                Delivery: 25-30m  │
│                R$ 8 taxa         │
│                                  │
│                [Edit] [Preview]  │
└──────────────────────────────────┘
```

**RestaurantCard.tsx**

```tsx
interface RestaurantCardProps {
  name: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string;
  image?: string;
  isActive: boolean;
}

export default function RestaurantCard({
  name,
  rating,
  reviews,
  deliveryTime,
  deliveryFee,
  image,
  isActive,
}: RestaurantCardProps) {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
        <badge className={`status ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? '● Open' : '● Closed'}
        </badge>
      </div>

      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>

        <div className="restaurant-meta">
          <span className="rating">
            ⭐ {rating.toFixed(1)} ({reviews})
          </span>
        </div>

        <div className="delivery-info">
          <span className="delivery-time">📍 {deliveryTime}</span>
          <span className="delivery-fee">💵 R$ {deliveryFee}</span>
        </div>

        <div className="actions">
          <button className="btn-secondary">Edit</button>
          <button className="btn-secondary">Preview</button>
        </div>
      </div>
    </div>
  );
}
```

**RestaurantCard.module.css**

```css
.restaurant-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  transition: all 200ms ease-out;
}

.restaurant-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.restaurant-image {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.restaurant-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.restaurant-image .placeholder {
  width: 100%;
  height: 100%;
  background-color: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  font-size: 12px;
}

.status {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status.active {
  color: #4CAF50;
}

.status.inactive {
  color: #F44336;
}

.restaurant-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.restaurant-name {
  font-size: 18px;
  font-weight: 600;
  color: #212121;
}

.restaurant-meta {
  display: flex;
  gap: 16px;
  align-items: center;
}

.rating {
  font-size: 14px;
  font-weight: 500;
  color: #212121;
}

.delivery-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #757575;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-secondary {
  padding: 8px 16px;
  background-color: #E0E0E0;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.btn-secondary:hover {
  background-color: #D0D0D0;
  transform: translateY(-2px);
}
```

### 3.2 Menu Item Card

```
┌──────────────────────────────┐
│ Item Name                    │
│ R$ 29,90                     │
│ Descrição do item (2 lines)  │
│                              │
│ [View] [Edit]                │
└──────────────────────────────┘
```

**MenuItemCard.tsx**

```tsx
interface MenuItemProps {
  name: string;
  price: number;
  description: string;
  image?: string;
  available: boolean;
  onEdit: () => void;
  onView: () => void;
}

export default function MenuItemCard({
  name,
  price,
  description,
  image,
  available,
  onEdit,
  onView,
}: MenuItemProps) {
  return (
    <div className={`menu-item-card ${!available ? 'unavailable' : ''}`}>
      {image && (
        <img src={image} alt={name} className="menu-item-image" />
      )}

      <div className="menu-item-content">
        <h3 className="menu-item-name">{name}</h3>

        <p className="menu-item-price">
          R$ {price.toFixed(2).replace('.', ',')}
        </p>

        <p className="menu-item-description">{description}</p>

        {!available && (
          <div className="unavailable-badge">Indisponível</div>
        )}

        <div className="menu-item-actions">
          <button
            className="btn-small"
            onClick={onView}
          >
            View
          </button>
          <button
            className="btn-small btn-primary"
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
```

**MenuItemCard.module.css**

```css
.menu-item-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #F5F5F5;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  transition: all 200ms ease-out;
  position: relative;
}

.menu-item-card:hover:not(.unavailable) {
  box-shadow: 0 4px 12px rgba(235, 0, 51, 0.1);
  transform: translateY(-4px);
}

.menu-item-card.unavailable {
  opacity: 0.6;
}

.menu-item-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
}

.menu-item-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item-name {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  line-height: 1.3;
}

.menu-item-price {
  font-size: 18px;
  font-weight: 700;
  color: #EB0033;
  font-variant-numeric: tabular-nums;
}

.menu-item-description {
  font-size: 12px;
  color: #757575;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.unavailable-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background-color: #F44336;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
}

.menu-item-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-small {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #E0E0E0;
  background-color: transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.btn-small:hover {
  background-color: #E0E0E0;
}

.btn-small.btn-primary {
  background-color: #EB0033;
  color: white;
  border-color: #EB0033;
}

.btn-small.btn-primary:hover {
  background-color: #D10029;
}
```

### 3.3 Order Status Badge

```
Status: ● Published     ● Draft     ● Archived     ● Error
```

**OrderStatusBadge.tsx**

```tsx
type Status = 'published' | 'draft' | 'archived' | 'error' | 'pending';

interface OrderStatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig = {
  published: { color: '#4CAF50', label: 'Published' },
  draft: { color: '#757575', label: 'Draft' },
  archived: { color: '#BDBDBD', label: 'Archived' },
  error: { color: '#F44336', label: 'Error' },
  pending: { color: '#FF9800', label: 'Pending' },
};

export default function OrderStatusBadge({
  status,
  label,
}: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className="status-badge"
      style={{
        borderColor: config.color,
        color: config.color,
      }}
    >
      <span className="status-dot" style={{ backgroundColor: config.color }} />
      {label || config.label}
    </span>
  );
}
```

**OrderStatusBadge.module.css**

```css
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.5);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
```

### 3.4 Price Input - Brasileiro

```
┌───────────────────────┐
│ R$ [    29,90]        │
└───────────────────────┘
```

**PriceInput.tsx**

```tsx
interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export default function PriceInput({
  value,
  onChange,
  label = 'Price',
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const numValue = parseInt(input, 10) / 100;
    onChange(numValue);
  };

  const displayValue = value.toFixed(2).replace('.', ',');

  return (
    <div className="price-input-group">
      {label && <label className="price-label">{label}</label>}
      <div className="price-input-wrapper">
        <span className="currency">R$</span>
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className="price-input"
          placeholder="0,00"
        />
      </div>
    </div>
  );
}
```

**PriceInput.module.css**

```css
.price-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-label {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
}

.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  pointer-events: none;
}

.price-input {
  width: 100%;
  height: 40px;
  padding: 10px 12px 10px 36px;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  text-align: right;
  transition: all 200ms ease-out;
}

.price-input:focus {
  outline: none;
  border-color: #EB0033;
  box-shadow: 0 0 0 3px rgba(235, 0, 51, 0.1);
}
```

### 3.5 Category Selector

```
┌─────────────────────────────────┐
│ Categoria Principal             │
│ [Burgers] [Pizzas] [Bebidas]    │
│           [Selecionado]         │
└─────────────────────────────────┘
```

**CategorySelector.tsx**

```tsx
interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategorySelector({
  categories,
  selected,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="category-selector">
      <label className="category-label">Categoria Principal</label>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selected === category.id ? 'active' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**CategorySelector.module.css**

```css
.category-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-label {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
}

.category-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 2px solid #E0E0E0;
  background-color: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #212121;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.category-btn:hover {
  border-color: #EB0033;
  color: #EB0033;
}

.category-btn.active {
  background-color: #EB0033;
  border-color: #EB0033;
  color: white;
}
```

---

## 4. Layout iFood - Dashboard

### Dashboard Layout

```tsx
export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        {/* Sidebar content */}
      </aside>

      <main className="main-content">
        <header className="header">
          {/* Header content */}
        </header>

        <section className="hero-section">
          <h1>Seu Restaurante no iFood</h1>
          <p>Gerencie cardápio, pedidos e mais</p>
        </section>

        <section className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              {...restaurant}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
```

**Dashboard.module.css**

```css
.dashboard {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background-color: #FFFFFF;
}

.sidebar {
  grid-column: 1;
  background-color: #F5F5F5;
  border-right: 1px solid #E0E0E0;
  padding: 24px;
  overflow-y: auto;
}

.main-content {
  grid-column: 2;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 16px 32px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-section {
  padding: 48px 32px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
}

.hero-section h1 {
  font-size: 32px;
  font-weight: 700;
  color: #212121;
  margin-bottom: 8px;
}

.hero-section p {
  font-size: 16px;
  color: #757575;
}

.restaurants-grid {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .main-content {
    grid-column: 1;
  }
}
```

---

## 5. Paleta de Animações iFood

### Subtle Red Pulse (Para CTAs)

```css
@keyframes redPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(235, 0, 51, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(235, 0, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(235, 0, 51, 0);
  }
}

.button-primary {
  animation: redPulse 2s infinite;
}
```

### Slide From Left (Para menu items)

```css
@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item-card {
  animation: slideFromLeft 300ms ease-out forwards;
}
```

---

## 6. Checklist iFood Específico

- [ ] Vermelho iFood (#EB0033) em todos os CTAs
- [ ] Preços com formatação brasileira (R$ 29,90)
- [ ] Status badges coloridas
- [ ] Restaurant cards com imagens
- [ ] Menu item cards com preview
- [ ] Category selectors funcionando
- [ ] Price inputs validados
- [ ] Responsive em mobile
- [ ] Performance otimizado

---

Estes componentes são específicos para iFood e mantêm a identidade visual forte!
