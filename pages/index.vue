<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-white/95 font-sans antialiased"
  >
    <div class="mx-auto max-w-screen-xl px-4 sm:px-8 py-8 flex flex-col gap-5 min-h-screen">
      <header class="flex items-start justify-between gap-6">
        <div>
          <h1 class="text-[26px] font-semibold tracking-tight leading-tight">
            Users
          </h1>
          <p class="mt-1 text-[13px] text-slate-500 dark:text-white/55">
            Manage platform accounts, roles and access.
          </p>
        </div>
          <button
            @click="toggleTheme"
            class="grid place-items-center w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 bg-white
          dark:bg-surface-dark-2 text-slate-600 dark:text-white/75 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5
          0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0
          1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1
          0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0
          0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0
          0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0
          3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112
          6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
            </svg>
          </button>


      </header>

      <UserFilters
        :search="searchInput"
        :role="role"
        :perPage="perPage"
        @update:search="searchInput = $event"
        @update:role="role = $event"
        @update:perPage="perPage = $event"
      />

    <!-- Clear filters: shows only when something is active -->
      <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          type="button"
          class="self-end inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10
        bg-white dark:bg-surface-dark-2 text-[13px] font-medium text-slate-600 dark:text-white/75 hover:bg-slate-50
        dark:hover:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20 transition-colors"
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293
      4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
      clip-rule="evenodd" />
        </svg>
        Clear filters
      </button>
      <UserTable
        :users="paginatedUsers"
        :sort-by="sortBy"
        :sort-direction="sortDirection"
        :class="{ 'opacity-50 pointer-events-none': isLoading }"
        @sort="onSort"
      />
      <div  class="flex items-center justify-between gap-4">
        <div class="text-[13px] text-slate-500 dark:text-white/55">
           Showing <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">{{ page }}</strong> page
          of <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">{{ totalPages }} </strong>
        </div>

        <div v-if="totalPages > 1" class="inline-flex items-center gap-1.5">
          <button
            @click="page--"
            :disabled="page === 1"
            class="h-[34px] px-3 inline-flex items-center gap-1.5 bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-medium text-slate-700 dark:text-white/75 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clip-rule="evenodd" />
            </svg>
            Prev
          </button>

          <div class="h-[34px] px-3.5 inline-flex items-center gap-1 text-[13px] tabular-nums">
            <span class="text-slate-900 dark:text-white font-semibold">{{ page }}</span>
            <span class="text-slate-400">/</span>
            <span class="text-slate-500 dark:text-white/55">{{ totalPages }}</span>
          </div>

          <button
            @click="page++"
            :disabled="page === totalPages"
            class="h-[34px] px-3 inline-flex items-center gap-1.5 bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/10 rounded-lg text-[13px] font-medium text-slate-700 dark:text-white/75 hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-45 disabled:cursor-not-allowed transition-colors"
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
  hasActiveFilters,
  resetFilters,
} = useUsersTable(users)

// Theme state — synced with <html class="dark"> and localStorage
const isDark = ref(false);

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
