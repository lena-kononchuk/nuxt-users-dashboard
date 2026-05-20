<template>
  <div
    class="flex-1 min-h-0 flex flex-col overflow-hidden bg-white dark:bg-surface-dark-2 border border-slate-200 dark:border-white/[0.07] rounded-[10px] shadow-card dark:shadow-card-dark"
  >
    <div class="overflow-auto max-h-[60vh]">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55 whitespace-nowrap"
            >
              Name
            </th>
            <th
              class="sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55 whitespace-nowrap"
            >
              Email
            </th>

            <th
              @click="$emit('sort', 'age')"
              class="sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55 whitespace-nowrap cursor-pointer select-none transition-colors hover:text-slate-700 dark:hover:text-white/75"
            >
              <span class="inline-flex items-center gap-1.5">
                Age
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 opacity-55">
                  <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v9.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V6.56L6.03 9.78A.75.75 0 1 1 4.97 8.72l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L10.75 6.56v9.69A.75.75 0 0 1 10 17Z" clip-rule="evenodd" opacity="0" />
                </svg>
              </span>
            </th>

            <th
              class="sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55 whitespace-nowrap"
            >
              Role
            </th>

            <th
              @click="$emit('sort', 'createdAt')"
              class="sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase text-slate-500 dark:text-white/55 whitespace-nowrap cursor-pointer select-none transition-colors hover:text-slate-700 dark:hover:text-white/75"
            >
              <span class="inline-flex items-center gap-1.5">
                Created
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 opacity-55">
                  <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v9.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                </svg>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
       user {{ users }}
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
          >
            <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05] text-sm font-medium text-slate-900 dark:text-white">
              {{ user.name }}
            </td>
            <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05] text-sm text-slate-500 dark:text-white/55">
              {{ user.email }}
            </td>
            <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05] text-sm tabular-nums text-slate-900 dark:text-white">
              {{ user.age }}
            </td>
            <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05] text-sm">
              <span
                :class="[
                  'inline-flex items-center h-[22px] px-2 rounded-full text-xs font-medium border',
                  user.role === 'admin' && 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/30',
                  user.role === 'manager' && 'text-blue-800 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30',
                  user.role === 'user' && 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-white/[0.05] dark:border-white/10',
                ]"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-4 py-3.5 border-b border-slate-100 dark:border-white/[0.05] text-sm tabular-nums text-slate-500 dark:text-white/55">
              {{ new Date(user.createdAt).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})

defineEmits(['sort'])
</script>
