<template>
  <div class="relative w-full">
    <select
      v-model="model"
      :class="[
        'appearance-none w-full h-[38px] pl-3 pr-9 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-[3px] transition-colors',
        // active filter state — emerald accent when a value is set
        highlightWhenSet && model !== null && model !== ''
          ? 'bg-brand-50 border border-brand-300 text-brand-700 font-medium hover:border-brand-400 focus:border-brand-600 focus:ring-brand-100 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-300 dark:hover:border-brand-500/50 dark:focus:border-brand-400 dark:focus:ring-brand-400/20'
          : 'bg-white border border-slate-200 text-slate-900 hover:border-slate-300 focus:border-brand-600 focus:ring-brand-50 dark:bg-surface-dark-3 dark:border-white/10 dark:text-white dark:hover:border-white/20 dark:focus:border-brand-400 dark:focus:ring-brand-400/10'
      ]"
    >
      <option v-if="allowAll" :value="null">{{ allLabel }}</option>
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
      :class="[
        'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5',
        highlightWhenSet && model !== null && model !== ''
          ? 'text-brand-600 dark:text-brand-400'
          : 'text-slate-500 dark:text-white/55'
      ]"
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
  allowAll: {
    type: Boolean,
    default: true,
  },
  allLabel: {
    type: String,
    default: 'All',
  },
  // When true, applies emerald accent when a non-null value is selected.
  // Useful for filter selects to visually signal "active filter".
  highlightWhenSet: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel()
</script>
