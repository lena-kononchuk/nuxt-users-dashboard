export function useUsersTable(users) {

  // Nuxt composables for URL sync (read via route, write via router)
  const router = useRouter();
  const route = useRoute();

  // Two separate refs for search:
  // - searchInput: what user is typing right now (instant)
  // - search: what actually drives filtering (updated after debounce)
  const searchInput = ref(route.query.search || '')
  const isLoading = ref(false)
  let searchTimer = null;
  // filters
  const search = ref(route.query.search || '');
  const role = ref(route.query.role || null);

  // sorting
  const sortBy = ref(route.query.sortBy || null)
  const sortDirection = ref(route.query.sortDirection || 'asc')

  // pagination
  // Number() is required because route.query values are always strings
  const page = ref(Number(route.query.page) || 1)
  const perPage = ref(Number(route.query.perPage) || 10)

  // Step 1: filter by search (name/email) and role
  const filteredUsers = computed(() => {

    const searchQuery = search.value.toLowerCase()

    return users.filter((user) => {
      const filterByName = user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery);
      const filterByRole = role.value === null || user.role === role.value
      return filterByName && filterByRole
    })
  })

  // Step 2: sort filtered users
  // Spread first to avoid mutating filteredUsers (Array.sort mutates in place)
  const sortedUsers = computed(() => {

    if (sortBy.value === null) {
      return filteredUsers.value
    }
    return [...filteredUsers.value].sort((a, b) => {

      let valueA = a[sortBy.value];
      let valueB = b[sortBy.value];

      if (sortBy.value === 'createdAt') {
        valueA = new Date(valueA)
        valueB = new Date(valueB)

      }

      const result = valueA - valueB

      return sortDirection.value === 'asc' ? result : -result
    })

  })
  // Step 3: slice sorted users for current page only
  const paginatedUsers = computed(() => {

    const pageStart = (page.value - 1) * perPage.value;
    const pageEnd = pageStart + perPage.value;

    return sortedUsers.value.slice(pageStart, pageEnd)
  })

  // Minimum 1 page even on empty results — avoids "Page 1 of 0"
  const totalPages = computed(() =>{

    const total = Math.ceil(filteredUsers.value.length / perPage.value)
    return total === 0 ? 1 : total;
  })


  // True if user has any non-default filter active
  const hasActiveFilters = computed(() =>{
    return searchInput.value !== '' ||
    role.value !== null ||
    sortBy.value !== null
  })

  // Reset all filters and sorting to defaults.
  // Clearing search directly (not via debounce) for instant feedback.
  function resetFilters() {
    searchInput.value = ''
    search.value = ''
    clearTimeout(searchTimer)
    isLoading.value = false
    role.value = null
    sortBy.value = null
    sortDirection.value = 'asc'

  }



  // Reset to page 1 whenever filter/sort changes, otherwise user can get
  // stuck on a page that no longer has results after narrowing the filter
  watch([search, role, sortBy, perPage, sortDirection], () =>{
    page.value = 1
  })

  // Sync state to URL on every change.
  // Uses router.replace (not push) — typing doesn't pollute browser history.
  // `|| undefined` trick: default values are omitted from URL to keep it clean.
  watch([search, role, sortBy, perPage, sortDirection, page], () =>{
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


  // Debounce search: apply the input only after 800ms of no typing.
  // Prevents re-filtering on every keystroke on large datasets.
  watch(searchInput, (newValue) =>{
    isLoading.value = true
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() =>{
      search.value = newValue
      isLoading.value = false
    }, 800)
  })


  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,
    searchInput,
    isLoading,
    hasActiveFilters,
    resetFilters

  }
}
