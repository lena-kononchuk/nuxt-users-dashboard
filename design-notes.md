# UpToWin Ops — Users Table

**Дизайн single-page інтерфейсу для тестового завдання (Vue 3 + Nuxt 4 + Tailwind).**
Файл-макет: [`Users Table.html`](./Users%20Table.html) — 5 станів на одному canvas.

---

## Концепція

Чистий SaaS-дашборд у стилі Linear / Vercel / Notion. Нейтральна slate-палітра + один акцентний колір з бренду UpToWin — **emerald-600** (`#059669` light, `#34D399` dark) — щоб був тонкий зв'язок з зеленим логотипом, але без казино-глянсу.

- **Шрифт:** Inter (UI), JetBrains Mono тільки для чисел/дат через `tabular-nums`.
- **Радіуси:** 6px (контроли), 8px (інпути/кнопки), 10px (картки).
- **Тіні:** м'які, дві-шарові: `0 1px 2px rgba(0,0,0,.04), 0 1px 3px rgba(0,0,0,.06)`.
- **Темна тема:** не "інверсія" — окрема палітра з кращою глибиною (`#0B0F19` фон, `#131826` поверхні).

---

## Стани в canvas

| № | Стан                         | Що ілюструє                                            |
|---|------------------------------|--------------------------------------------------------|
| 01 | Default (light)             | Базова сторінка, page 1, фільтри порожні               |
| 02 | Sorted by Age ↑             | Активне сортування — стрілка ↑ та зелений колір header |
| 03 | Search "anna" + Admin       | Пошук + role — два фільтри одночасно                   |
| 04 | Empty state                 | "Нічого не знайдено" з ілюстрацією та підказкою        |
| 05 | Default (dark)              | Та сама сторінка, темна тема                           |

---

## Tailwind class map

Я писав макет на чистому CSS (один файл, два теми через `.ut-light`/`.ut-dark` обгортку). Нижче — пряме відображення на Tailwind.

### Page chrome

```html
<!-- Зовнішній враппер -->
<div class="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white/95
            font-[Inter,system-ui,sans-serif] antialiased">

  <!-- Контейнер сторінки -->
  <div class="mx-auto max-w-screen-xl px-8 py-8 flex flex-col gap-5">
    ...
  </div>
</div>
```

### Header

```html
<header class="flex items-start justify-between gap-6">
  <div>
    <h1 class="text-[26px] font-semibold tracking-tight text-slate-900 dark:text-white/95 leading-tight">
      Users
    </h1>
    <p class="mt-1 text-[13px] text-slate-500 dark:text-white/55">
      Manage platform accounts, roles and access.
    </p>
  </div>
  <ThemeToggle />
</header>
```

### Filter bar

```html
<div class="flex items-end gap-3">
  <!-- Search (grow) -->
  <div class="flex-1 min-w-0 flex flex-col gap-1.5">
    <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55">
      Search
    </label>
    <div class="relative">
      <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search by name or email…"
        class="w-full h-[38px] pl-9 pr-3 rounded-lg
               bg-white dark:bg-[#131826]
               border border-slate-200 dark:border-white/10
               text-slate-900 dark:text-white placeholder:text-slate-400
               focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400
               focus:ring-[3px] focus:ring-emerald-50 dark:focus:ring-emerald-400/10
               transition-colors" />
    </div>
  </div>

  <!-- Role -->
  <div class="flex flex-col gap-1.5">
    <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55">
      Role
    </label>
    <div class="relative">
      <select
        class="appearance-none h-[38px] pl-3 pr-9 min-w-[160px] rounded-lg
               bg-white dark:bg-[#131826]
               border border-slate-200 dark:border-white/10
               text-slate-900 dark:text-white text-sm cursor-pointer
               hover:border-slate-300 dark:hover:border-white/20
               focus:outline-none focus:border-emerald-600 focus:ring-[3px] focus:ring-emerald-50">
        <option value="all">All roles</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
      <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
    </div>
  </div>

  <!-- Per page (narrower) -->
  <div class="flex flex-col gap-1.5">
    <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500">Per page</label>
    <div class="relative">
      <select class="... min-w-[88px] ..."> <!-- same as Role select but narrower -->
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <ChevronDown class="..." />
    </div>
  </div>
</div>
```

### Table card

```html
<!-- Card -->
<div class="flex-1 min-h-0 flex flex-col overflow-hidden
            bg-white dark:bg-[#131826]
            border border-slate-200 dark:border-white/[0.07]
            rounded-[10px]
            shadow-[0_1px_2px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.06)]
            dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)]">

  <!-- Scroll container — задає висоту і скрол -->
  <div class="overflow-auto max-h-[60vh]">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <!-- Звичайна колонка -->
          <th class="sticky top-0 z-[1] text-left px-4 py-3
                     bg-slate-50 dark:bg-[#0F1422]
                     border-b border-slate-200 dark:border-white/[0.07]
                     text-[11.5px] font-semibold tracking-wide uppercase
                     text-slate-500 dark:text-white/55 whitespace-nowrap">
            Name
          </th>

          <!-- Сортована колонка (звичайний стан) -->
          <th class="... cursor-pointer select-none transition-colors
                     hover:text-slate-700 dark:hover:text-white/75 group">
            <span class="inline-flex items-center gap-1.5">
              Age
              <ArrowsUpDown class="w-3 h-3 opacity-55" />
            </span>
          </th>

          <!-- Сортована колонка (активна, asc) -->
          <th class="... cursor-pointer select-none
                     text-emerald-600 dark:text-emerald-400">
            <span class="inline-flex items-center gap-1.5">
              Age
              <ArrowUp class="w-3 h-3" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
          <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05]
                     text-sm font-medium text-slate-900 dark:text-white">
            Anna Schultz
          </td>
          <td class="... text-slate-500 dark:text-white/55">anna.schultz@uptowin.io</td>
          <td class="... tabular-nums text-slate-900 dark:text-white">31</td>
          <td class="..."><RoleBadge role="admin" /></td>
          <td class="... tabular-nums text-slate-500">Apr 14, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Role badges

```html
<!-- Admin (emerald — тонко натяк на бренд) -->
<span class="inline-flex items-center h-[22px] px-2 rounded-full text-xs font-medium border
             text-emerald-800   bg-emerald-50   border-emerald-200
             dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/30">
  Admin
</span>

<!-- Manager (blue) -->
<span class="... text-blue-800 bg-blue-50 border-blue-200
              dark:text-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30">
  Manager
</span>

<!-- User (slate, neutral) -->
<span class="... text-slate-600 bg-slate-100 border-slate-200
              dark:text-slate-300 dark:bg-white/[0.05] dark:border-white/10">
  User
</span>
```

### Pagination

```html
<div class="flex items-center justify-between gap-4">
  <div class="text-[13px] text-slate-500 dark:text-white/55">
    Showing <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">1–10</strong>
    of <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">87</strong>
  </div>

  <div class="inline-flex items-center gap-1.5">
    <button class="h-[34px] px-3 inline-flex items-center gap-1.5
                   bg-white dark:bg-[#131826]
                   border border-slate-200 dark:border-white/10
                   rounded-lg text-[13px] font-medium
                   text-slate-700 dark:text-white/75
                   hover:bg-slate-50 dark:hover:bg-white/[0.03]
                   hover:border-slate-300 dark:hover:border-white/20
                   disabled:opacity-45 disabled:cursor-not-allowed transition-colors">
      <ChevronLeft class="w-3.5 h-3.5" /> Prev
    </button>

    <div class="h-[34px] px-3.5 inline-flex items-center gap-1 text-[13px] tabular-nums">
      <span class="text-slate-900 dark:text-white font-semibold">1</span>
      <span class="text-slate-400">/</span>
      <span class="text-slate-500">9</span>
    </div>

    <button class="...">Next <ChevronRight class="w-3.5 h-3.5" /></button>
  </div>
</div>
```

### Empty state

```html
<tr>
  <td colspan="5" class="p-0 bg-white dark:bg-[#131826]">
    <div class="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <EmptyIcon class="w-16 h-16 text-slate-400 dark:text-white/35" />
      <div class="font-semibold text-[15px] text-slate-900 dark:text-white">No users found</div>
      <p class="max-w-[36ch] text-[13px] text-slate-500 dark:text-white/55">
        Try adjusting your search or clearing the role filter.
      </p>
    </div>
  </td>
</tr>
```

### Theme toggle (pill)

```html
<button
  @click="theme = theme === 'dark' ? 'light' : 'dark'"
  class="relative inline-flex items-center w-16 h-8 px-1 rounded-full
         bg-white dark:bg-[#131826]
         border border-slate-200 dark:border-white/10 transition-colors">

  <span class="w-6 h-6 grid place-items-center text-amber-500 dark:text-white/35">
    <SunIcon class="w-[18px] h-[18px]" />
  </span>
  <span class="w-6 h-6 grid place-items-center text-slate-400 dark:text-emerald-400">
    <MoonIcon class="w-[18px] h-[18px]" />
  </span>

  <span
    :class="[
      'absolute top-0.5 left-0.5 w-[26px] h-[26px] rounded-full bg-white',
      'shadow ring-1 ring-slate-200 transition-transform duration-200',
      theme === 'dark' && 'translate-x-8'
    ]"
  />
</button>
```

---

## Tokens to pin in `tailwind.config.ts`

```ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand accent — UpToWin green, calmed for SaaS use
        brand: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',  // dark theme accent
          500: '#10B981',
          600: '#059669',  // light theme accent
          700: '#047857',
        },
        // Dark theme surfaces (used instead of default slate-900/950 for warmer depth)
        surface: {
          dark:    '#0B0F19',
          'dark-2':'#131826',
          'dark-3':'#0F1422',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
      },
    },
  },
};
```

---

## Behaviour cheatsheet (для імплементації)

| Фіча                  | Підказка                                                                      |
|-----------------------|-------------------------------------------------------------------------------|
| **URL state**         | Nuxt: `useRoute()` + `navigateTo({ query }, { replace: true })`. Читай query на mount → ініціалізуй refs. |
| **Debounce search**   | `import { debounce } from 'perfect-debounce'` або `watchDebounced` з VueUse, **300ms**. Спінер всередині інпута поки чекаємо. |
| **Sticky header**     | `sticky top-0 z-[1]` на `<th>`, скрол на батьківському `overflow-auto max-h-[60vh]` (НЕ на `<table>`). |
| **Sort toggle**       | Клік на сортовану колонку: якщо вже активна — перевертай напрямок. Інакше — встанови з дефолтним dir (`age: asc`, `createdAt: desc`). |
| **Per-page change**   | При зміні `perPage` — скидай `page = 1`, інакше можна опинитись на page 7 з порожнім результатом. |
| **Reset page**        | Те ж саме при зміні `search`, `role`. |
| **Theme persist**     | `localStorage.setItem('utw.theme', value)` + `document.documentElement.classList.toggle('dark', value === 'dark')`. У Nuxt — через `useColorMode()` з `@nuxtjs/color-mode`. |

---

## Адаптивність (375+)

На mobile (`< 640px`):
- `.ut-filters` → `flex-col` (`md:flex-row`)
- Stat row під заголовком ховається або переходить у горизонтальний скрол
- Можна сховати колонки `Email` і `Created` (`hidden md:table-cell`) і додати їх в розкривний row на mobile — це поза ТЗ, але типовий патерн.

---

## Файли

- `Users Table.html` — design canvas з 5-ма станами
- `users-table.jsx` — UserScreen компонент (props-driven)
- `design-canvas.jsx` — Figma-like canvas wrapper (драгається, фокус-мод по кліку на 🔍)
- `archive/Users Table v1 (warm-amber).html` — попередня "premium poker room" версія
