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
                  :class="[
                    'sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200 dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase whitespace-nowrap cursor-pointer select-none transition-colors',
                    sortBy === 'age'
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-500 dark:text-white/55 hover:text-slate-700 dark:hover:text-white/75'
                  ]"
                >
              <span class="inline-flex items-center gap-1.5">
                Age
                <svg
                    v-if="sortBy === 'age' && sortDirection === 'asc'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3"
                  >
                    <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0
              1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04L10.75 5.612V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                  </svg>

                  <svg
                    v-else-if="sortBy === 'age' && sortDirection === 'desc'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3"
                  >
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0
              1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3 opacity-40"
                  >
                    <path fill-rule="evenodd" d="M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1v8.59a.75.75 0 0 0 1.5 0V4.66l1.95 2.1a.75.75 0
              1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L2.2 5.74a.75.75 0 0 0 .04 1.06Zm8 6.4a.75.75 0 0 0-.04 1.06l3.25 3.5a.75.75 0 0
              0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75a.75.75 0 0 0-1.5 0v8.59l-1.95-2.1a.75.75 0 0 0-1.06-.04Z"
              clip-rule="evenodd" />
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
                  :class="[
                    'sticky top-0 z-[1] text-left px-4 py-3 bg-slate-50 dark:bg-surface-dark-3 border-b border-slate-200  dark:border-white/[0.07] text-[11.5px] font-semibold tracking-wide uppercase whitespace-nowrap cursor-pointer select-none  transition-colors',
                    sortBy === 'createdAt'
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-500 dark:text-white/55 hover:text-slate-700 dark:hover:text-white/75'
                  ]"
                >
              <span class="inline-flex items-center gap-1.5">
                Created
                <svg
                    v-if="sortBy === 'createdAt' && sortDirection === 'asc'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3"
                  >
                    <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0
              1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04L10.75 5.612V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                  </svg>

                  <svg
                    v-else-if="sortBy === 'createdAt' && sortDirection === 'desc'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3"
                  >
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0
              1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-3 h-3 opacity-40"
                  >
                    <path fill-rule="evenodd" d="M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1v8.59a.75.75 0 0 0 1.5 0V4.66l1.95 2.1a.75.75 0
              1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L2.2 5.74a.75.75 0 0 0 .04 1.06Zm8 6.4a.75.75 0 0 0-.04 1.06l3.25 3.5a.75.75 0 0
              0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75a.75.75 0 0 0-1.5 0v8.59l-1.95-2.1a.75.75 0 0 0-1.06-.04Z"
              clip-rule="evenodd" />
                  </svg>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>

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
          <tr v-if="users.length === 0">
            <td colspan="5" class="p-0 bg-white dark:bg-surface-dark-2">
              <div class="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-12 h-12 text-slate-400 dark:text-white/35"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <div class="font-semibold text-[15px] text-slate-900 dark:text-white">
                  No users found
                </div>
                <p class="max-w-[36ch] text-[13px] text-slate-500 dark:text-white/55">
                  Try adjusting your search or clearing the role filter.
                </p>
              </div>
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
  sortBy: {
    type:String,
    default: null
  },
   sortDirection: {
    type:String,
    default: 'asc'
  }
})

defineEmits(['sort'])
</script>
