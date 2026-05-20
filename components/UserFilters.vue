<template>
  <div class="flex flex-col sm:flex-row sm:items-end gap-3">
    <!-- Search (grow) -->
    <div class="flex-1 min-w-0 flex flex-col gap-1.5">
      <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55">
        Search
      </label>
      <div class="relative">
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
          class="w-full h-[38px] pl-9 pr-3 rounded-lg bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/35 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 focus:ring-[3px] focus:ring-brand-50 dark:focus:ring-brand-400/10 transition-colors"
        />
      </div>
    </div>

    <!-- Role -->
    <div class="flex flex-col gap-1.5 sm:w-[160px]">
      <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55">
        Role
      </label>
      <BaseSelect
        :model-value="role"
        @update:model-value="$emit('update:role', $event)"
        :options="['admin', 'manager', 'user']"
      />
    </div>

    <!-- Per page -->
    <div class="flex flex-col gap-1.5 sm:w-[100px]">
      <label class="text-[11px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55">
        Per page
      </label>
      <BaseSelect
        :model-value="perPage"
        @update:model-value="$emit('update:perPage', Number($event))"
        :options="[10, 15, 20]"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  role: String,
  perPage: Number,
})

defineEmits([
  'update:search',
  'update:role',
  'update:perPage',
])
</script>
