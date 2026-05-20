<template>
  <div class="relative w-full">
    <select
      v-model="model"
      class="appearance-none w-full h-[38px] pl-3 pr-9 rounded-lg bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm cursor-pointer hover:border-slate-300 dark:hover:border-white/20 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 focus:ring-[3px] focus:ring-brand-50 dark:focus:ring-brand-400/10 transition-colors"
    >
      <option :value="null">All</option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 dark:text-white/55"
    >
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>
