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
        <!-- TODO (Етап 5.2): сюди ThemeToggle -->
      </header>

      <UserFilters
        :search="search"
        :role="role"
        :perPage="perPage"
        @update:search="search = $event"
        @update:role="role = $event"
        @update:perPage="perPage = $event"
      />

      <UserTable
        :users="paginatedUsers"
        @sort="onSort"
      />

      <div class="flex items-center justify-between gap-4">
        <div class="text-[13px] text-slate-500 dark:text-white/55">
          <!-- TODO: показати "Showing 1–10 of N" — потребує computed -->
          Page <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">{{ page }}</strong>
          of <strong class="text-slate-900 dark:text-white font-semibold tabular-nums">{{ totalPages }}</strong>
        </div>

        <div class="inline-flex items-center gap-1.5">
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
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
} = useUsersTable(users)

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
