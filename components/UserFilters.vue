<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
    <!-- Search (fills remaining width, with inline clear ✕) -->
    <div class="relative flex-1 min-w-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/35 pointer-events-none"
      >
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
      </svg>
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Search by name or email…"
        type="text"
        class="w-full h-9 pl-9 pr-9 rounded-lg bg-white dark:bg-surface-dark-3 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/35 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 focus:ring-[3px] focus:ring-brand-50 dark:focus:ring-brand-400/10 transition-colors"
      />
      <button
        v-if="search"
        @click="$emit('update:search', '')"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 grid place-items-center text-slate-400 hover:text-slate-600 dark:text-white/35 dark:hover:text-white/55 transition-colors"
        aria-label="Clear search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Role select (narrow, no label — "All Roles" speaks for itself) -->
    <div class="sm:w-[140px] flex-shrink-0">
      <BaseSelect
        :model-value="role"
        @update:model-value="$emit('update:role', $event)"
        :options="['admin', 'manager', 'user']"
        all-label="All Roles"
        :highlight-when-set="true"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  role: String,
})

defineEmits([
  'update:search',
  'update:role',
])
</script>
