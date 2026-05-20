# Тестове UpToWin — план виконання

## 📌 Контекст

**Завдання:** таблиця користувачів із фільтрами, сортуванням, пагінацією та збереженням стану в URL. Дедлайн — 3 робочі дні.

**Що вже є у стартері:**
- `pages/index.vue` — сторінка зі склеєними компонентами
- `components/UserFilters.vue` — поле пошуку + 2 селекти (role, perPage)
- `components/UserTable.vue` — таблиця з sticky-хедером (заготовка)
- `components/BaseSelect.vue` — селект з `defineModel()`
- `composables/useUsersTable.ts` — **скелет з TODO** (тут основна робота)
- `data/users.ts` — 50 мок-юзерів

**Правила, які домовились:**
- ❌ **TypeScript НЕ використовуємо** — лишаємо `.ts` файли як у стартері, але без типів (як зараз у `useUsersTable.ts`). У `.vue` — без `lang="ts"`.
- ✅ Стилі — **Tailwind CSS** (у вакансії вказаний як плюс, нам так буде швидше і виразніше). Модуль `@nuxtjs/tailwindcss` **вже встановлений і прописаний у `nuxt.config.ts`** — можна одразу писати класи в `class="…"`.
- ✅ Без зайвих залежностей: ні Pinia, ні VueUse, ні SCSS — task мінімалістичний і перевіряє чисту роботу з composable + Nuxt API.
- ⚠️ У `package.json` стоїть **Nuxt 4**, хоч папка названа `nuxt-3`. API майже ідентичне, тож робимо як є. Запитання до рекрутера вже надіслане.

---

## 🚀 Етап 0 — Підготовка (5 хв)

### Крок 0.1. Запустити dev-сервер
```bash
cd /Users/lena/Developer/test-nuxt-3-uptowin
npm run dev
```
Відкрити `http://localhost:3000` (або `3001`, якщо 3000 зайнятий — Nuxt сам про це скаже у консолі). Має побачитись пустий каркас (без рядків таблиці — бо `paginatedUsers = null`).

### Крок 0.2. Tailwind — вже готовий ✅
Модуль `@nuxtjs/tailwindcss` встановлений, у `nuxt.config.ts` додано `modules: ['@nuxtjs/tailwindcss']`. Конфіг-файлу немає — модуль працює на дефолтах, цього достатньо. Базові утиліти (flex, gap, p-, text-, bg-, etc.) одразу доступні в `class="…"`.

Якщо захочеш кастомізувати (свої кольори, шрифти) — створиш `tailwind.config.js` пізніше. Для тестового — не треба.

### Крок 0.3. Git init (опційно, але краще зразу)
```bash
git init
git add -A
git commit -m "initial: starter from UpToWin"
```
Так далі буде видно прогрес коміт-за-комітом — рекрутерам це подобається.

---

## 🧠 Етап 1 — Логіка composable (ядро завдання)

Файл: `composables/useUsersTable.ts`

### Крок 1.1. `filteredUsers` — фільтрація
**Що зробити:** computed, який бере `users`, відфільтровує за `search` (по `name` АБО `email`, case-insensitive) і за `role` (якщо `role !== null`).

**Як перевірити:** ввести в інпут «user 1» — має лишитись Users 1, 10–19. Вибрати role=admin — лишаються тільки адміни.

🆘 *Тут, якщо застрягнеш — напиши, підкажу формулу `computed`.*

### Крок 1.2. `sortedUsers` — сортування
**Що зробити:** computed, який бере `filteredUsers.value`, і якщо `sortBy` задано — повертає відсортовану копію за `age` або `createdAt`, з урахуванням `sortDirection` (`asc` / `desc`). Якщо `sortBy === null` — повертає як є.

**Важливо:** копіювати масив через `[...filteredUsers.value]` перед `.sort()`, інакше зміниш оригінал.

**Як перевірити:** клік на «Age» — сортує за віком. Повторний клік — реверс. Клік на «Created» — за датою.

### Крок 1.3. `paginatedUsers` + `totalPages`
**Що зробити:**
- `totalPages` = `Math.ceil(sortedUsers.value.length / perPage.value)` (або `1`, якщо порожньо).
- `paginatedUsers` = `sortedUsers.value.slice((page-1)*perPage, page*perPage)`.

**Як перевірити:** перемикач `perPage` змінює розмір сторінки, Prev/Next працюють.

### Крок 1.4. Reset `page` при зміні фільтрів
**Проблема:** якщо ти на сторінці 5 і змінюєш фільтр — `page` залишиться 5, але результатів стане 1 сторінка. Треба `watch([search, role, perPage], () => page.value = 1)`.

**Як перевірити:** перейти на 3-тю сторінку, ввести пошук → автоматично на сторінку 1.

---

## 📌 Етап 2 — Sticky header

Файл: `components/UserTable.vue`

### Крок 2.1. Перевірити що sticky працює
У стартері вже є `position: sticky; top: 0`. Перевір при скролі — header має лишатись на місці.

### Крок 2.2. Косметика
- `background: #fff` замінити на змінну, щоб не пробивався при темній темі (поки що можна лишити, повернемося на Етапі 5).
- `cursor: pointer` поставити **тільки** на сортовані колонки (`Age`, `Created`), а не на всі `th`.

---

## 🔗 Етап 3 — Стан у query params + відновлення при reload

Файл: `composables/useUsersTable.ts`

### Крок 3.1. Ініціалізація з URL
На вході composable читаємо `useRoute().query` і ставимо як початкові значення:
```js
const route = useRoute()

const search = ref(route.query.search || '')
const role = ref(route.query.role || null)
const sortBy = ref(route.query.sortBy || null)
const sortDirection = ref(route.query.sortDirection || 'asc')
const page = ref(Number(route.query.page) || 1)
const perPage = ref(Number(route.query.perPage) || 10)
```

### Крок 3.2. Синхронізація refs → URL
Через `watch` на всі стани пишемо в URL через `router.replace`:
```js
const router = useRouter()

watch([search, role, sortBy, sortDirection, page, perPage], () => {
  router.replace({
    query: {
      search: search.value || undefined,
      role: role.value || undefined,
      sortBy: sortBy.value || undefined,
      sortDirection: sortBy.value ? sortDirection.value : undefined,
      page: page.value !== 1 ? page.value : undefined,
      perPage: perPage.value !== 10 ? perPage.value : undefined,
    }
  })
})
```
**Хитрість:** `|| undefined` робить так, що дефолтні значення **не пишуться** в URL — тримає його чистим.

**Як перевірити:** покрутити фільтри → побачити query-string в адресному рядку → **F5** → стан відновився.

🆘 *Тут найбільше підводних. Якщо щось крутиться нескінченно або URL зникає — пиши, разом подивимось.*

---

## 🎛 Етап 4 — Дрібниці UX (швидко)

### Крок 4.1. Pagination не зникає при 1 сторінці
Зараз кнопки disabled, але самі лишаються. Можна сховати весь блок, якщо `totalPages <= 1`:
```html
<div v-if="totalPages > 1" class="pagination">…</div>
```

### Крок 4.2. Лейбли над селектами
Зараз 2 однакові селекти без підписів — користувач не розуміє який це. Додати `<label>`:
```html
<label>Role <BaseSelect … /></label>
<label>Per page <BaseSelect … /></label>
```

### Крок 4.3. Індикатор сортування
У `UserTable.vue` показувати стрілочку у заголовку колонки, по якій сортуємо:
```html
<th @click="$emit('sort', 'age')">
  Age
  <span v-if="sortBy === 'age'">
    {{ sortDirection === 'asc' ? '↑' : '↓' }}
  </span>
</th>
```
Доведеться передати `sortBy` і `sortDirection` як пропси у `UserTable`.

---

## ⭐ Етап 5 — Бонуси (за бажанням, але обидва прості й вигідно виглядають)

### Крок 5.1. Debounce пошуку
Без VueUse, своїми руками:
```js
import { ref, computed, watch } from 'vue'

const searchInput = ref(route.query.search || '')  // те, що в інпуті
const search = ref(searchInput.value)               // те, що йде у фільтр

let timer = null
watch(searchInput, (val) => {
  clearTimeout(timer)
  timer = setTimeout(() => { search.value = val }, 300)
})
```
В компоненті `UserFilters` `v-model` йде на `searchInput`, а `search` використовується у `filteredUsers`.

### Крок 5.2. Тема світла/темна — через Tailwind `dark:`

**Як це працює:** Tailwind має варіант `dark:` — клас `dark:bg-gray-900` спрацює, тільки якщо у предка (зазвичай `<html>`) є клас `dark`. Перемикач теми тільки додає/прибирає цей клас.

**Створи файл `tailwind.config.js` у корені** (один раз, щоб увімкнути режим class-based):
```js
export default {
  darkMode: 'class'
}
```

**У `pages/index.vue` (або винеси в окремий компонент `ThemeToggle.vue`):**
```html
<button @click="toggleTheme" class="px-3 py-1 rounded border">
  {{ isDark ? '☀️' : '🌙' }}
</button>
```

```js
const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}
```

**Стилі компонентів** — додай `dark:` варіанти там, де треба:
```html
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  …
</div>
```

Для sticky-хедера таблиці (Етап 2.2) — `bg-white dark:bg-gray-900` замість фіксованого `#fff`.

---

## 🧹 Етап 6 — Фіналізація

### Крок 6.1. Перепройти весь сценарій
- ☐ Пошук працює (і з debounce, якщо робила)
- ☐ Фільтр по role
- ☐ Сорт по age і createdAt в обидва боки
- ☐ Пагінація + перемикач 10/15/20
- ☐ Sticky header
- ☐ Query params в URL оновлюються
- ☐ F5 — стан відновлюється
- ☐ Зміна фільтра скидає `page` на 1
- ☐ Тема перемикається (якщо робила)

### Крок 6.2. Оновити `README.md`
Замінити nuxt-стартерний README на короткий опис **твого** рішення:
- Що зроблено (фічі)
- Як запустити
- Які ріш ення прийняті (наприклад: «без TS у компонентах, бо так у стартері»; «query params очищаються від дефолтів»; «debounce 300ms»)
- Що **не** зробила і чому (якщо щось пропустила)

### Крок 6.3. Залити в гіт
```bash
git add -A
git commit -m "feat: filters, sorting, pagination, query state, debounce, theme"
```
Створити публічне репо на GitHub, запушити, **посилання надіслати рекрутеру**.

---

## ⏱ Орієнтовний таймінг

| Етап | Час |
|------|-----|
| 0. Підготовка | 10 хв |
| 1. Composable (фільтр + сорт + пагінація) | 1.5–2 год |
| 2. Sticky header | 10 хв |
| 3. Query params + reload | 1–1.5 год ← **найскладніше** |
| 4. UX-дрібниці | 30 хв |
| 5. Бонуси (debounce + тема) | 1–1.5 год |
| 6. README + git | 30 хв |
| **Разом** | **~5–6 годин** |

Тобто реально вкластися в **один робочий день**, навіть з перервами.

---

## 🆘 Коли просити допомоги

- Не йде `computed` — кажи, напишу разом.
- URL крутиться у нескінченному циклі — окремий випадок, що треба обробити.
- Сорт за датою рандомить — типова пастка, поясню.
- Tailwind-класи не діють — швидко перевіримо `nuxt.config.ts` і чи модуль завантажився.
- README — можу скласти повністю, ти лише підправиш під свій тон.
