<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white/95 font-sans antialiased"
  >
    <div class="mx-auto max-w-screen-xl px-4 sm:px-8 py-8 flex flex-col gap-6 min-h-screen">
      <header class="flex items-start justify-between gap-6">
        <div>
          <h1 class="text-[26px] font-bold tracking-tight leading-tight">
            Users
          </h1>
          <p class="mt-1 text-[13px] text-slate-500 dark:text-white/55">
            Manage platform accounts, roles and access.
          </p>
        </div>

        <!-- Pill-style theme toggle -->
        <button
          @click="toggleTheme"
          type="button"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          class="relative inline-flex items-center justify-between w-16 h-8 px-1 rounded-full bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/10 transition-colors"
        >
          <span class="w-6 h-6 grid place-items-center text-amber-500 dark:text-white/35 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[14px] h-[14px]">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          </span>
          <span class="w-6 h-6 grid place-items-center text-slate-400 dark:text-emerald-400 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[14px] h-[14px]">
              <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
            </svg>
          </span>
          <span
            :class="[
              'absolute top-0.5 left-0.5 w-[26px] h-[26px] rounded-full bg-white dark:bg-surface-dark shadow ring-1 ring-slate-200 dark:ring-white/10 transition-transform duration-200',
              isDark ? 'translate-x-[32px]' : 'translate-x-0'
            ]"
          />
        </button>
      </header>

      <!-- Single card containing filter row, table and footer -->
      <div
        class="bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/[0.07] rounded-xl shadow-card dark:shadow-card-dark overflow-hidden flex flex-col"
      >
        <!-- Filter section (search + role row, Clear filters below) -->
        <div class="p-5 flex flex-col gap-3 border-b border-slate-200 dark:border-white/[0.07]">
          <!-- Top row: search + role fill the entire width -->
          <UserFilters
            :search="searchInput"
            :role="role"
            @update:search="searchInput = $event"
            @update:role="role = $event"
          />

          <!-- Clear filters: separate row, right-aligned, conditional -->
          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            type="button"
            class="self-end inline-flex items-center gap-1.5 h-8 px-3 text-[13px] font-medium text-slate-500 hover:text-slate-700 dark:text-white/55 dark:hover:text-white/85 border border-transparent hover:border-slate-200 dark:hover:border-white/10 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clip-rule="evenodd" />
            </svg>
            Clear filters
          </button>
        </div>

        <!-- Table (its own scroll container) -->
        <UserTable
          :users="paginatedUsers"
          :sort-by="sortBy"
          :sort-direction="sortDirection"
          :class="{ 'opacity-50 pointer-events-none': isLoading }"
          @sort="onSort"
        />

        <!-- Footer: Showing X–Y of N · segmented per-page · Prev/Next -->
        <div
          v-if="totalCount > 0"
          class="px-5 py-3 border-t border-slate-200 dark:border-white/[0.07] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <!-- Left: item range -->
          <div class="text-[13px] text-slate-500 dark:text-white/55">
            Showing
            <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">
              {{ (page - 1) * perPage + 1 }}–{{ Math.min(page * perPage, totalCount) }}
            </strong>
            of
            <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">
              {{ totalCount }}
            </strong>
          </div>

          <!-- Center: per-page segmented control -->
          <div class="inline-flex items-center bg-slate-100 dark:bg-white/[0.04] rounded-md p-0.5 gap-0.5">
            <button
              v-for="n in [10, 15, 20]"
              :key="n"
              type="button"
              @click="perPage = n"
              :class="[
                'px-3 h-7 text-xs font-medium rounded transition-all duration-150 tabular-nums',
                perPage === n
                  ? 'bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 dark:bg-white/[0.10] dark:text-white dark:ring-white/10'
                  : 'text-slate-500 hover:text-slate-900 dark:text-white/45 dark:hover:text-white/80'
              ]"
            >
              {{ n }}
            </button>
          </div>

          <!-- Right: page navigation -->
          <div v-if="totalPages > 1" class="inline-flex items-center gap-1.5">
            <button
              @click="page--"
              :disabled="page === 1"
              class="h-9 px-3 inline-flex items-center gap-1.5 bg-white dark:bg-surface-dark-3 border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-medium text-slate-700 dark:text-white/75 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clip-rule="evenodd" />
              </svg>
              Prev
            </button>

            <div class="h-8 px-2 inline-flex items-center gap-1 text-[13px] tabular-nums">
              <span class="text-slate-900 dark:text-white font-semibold">{{ page }}</span>
              <span class="text-slate-400 dark:text-white/35">/</span>
              <span class="text-slate-500 dark:text-white/55">{{ totalPages }}</span>
            </div>

            <button
              @click="page++"
              :disabled="page === totalPages"
              class="h-9 px-3 inline-flex items-center gap-1.5 bg-white dark:bg-surface-dark-3 border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-medium text-slate-700 dark:text-white/75 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'

const {
  search,
  searchInput,
  isLoading,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
  totalCount,
  hasActiveFilters,
  resetFilters,
} = useUsersTable(users)

// Theme state — synced with <html class="dark"> and localStorage
const isDark = ref(false)

onMounted(() => {
  // Use saved theme if any, otherwise fall back to OS preference
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

// Sync `dark` class with isDark — Tailwind reads this class for dark: variants
function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

function toggleTheme() {
  // Temporarily disable CSS transitions to avoid color-flicker on switch.
  // Two requestAnimationFrame's are needed for browser to actually paint
  // before transitions are re-enabled.
  document.documentElement.classList.add('theme-switching')

  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-switching')
    })
  })
}

function onSort(field) {
  if (sortBy.value === field) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDirection.value = 'asc'
  }
}
</script>

<style>
/* Disable transitions while theme is switching to prevent visible color lag */
.theme-switching, .theme-switching * {
  transition: none !important;
}
</style>
