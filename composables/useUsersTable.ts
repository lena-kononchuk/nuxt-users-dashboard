export function useUsersTable(users) {

  const router = useRouter();
  const route = useRoute();

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
  const page = ref(Number(route.query.page) || 1)
  const perPage = ref(Number(route.query.perPage) || 10)

  const filteredUsers = computed(() => {

    const searchQuery = search.value.toLowerCase()

    return users.filter((user) => {
      const filterByName = user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery);
      const filterByRole = role.value === null || user.role === role.value
      return filterByName && filterByRole
    })
  })
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
  // - paginatedUsers
  const paginatedUsers = computed(() => {

    const pageStart = (page.value - 1) * perPage.value;
    const pageEnd = pageStart + perPage.value;

    return sortedUsers.value.slice(pageStart, pageEnd)
  })


  const totalPages = computed(() =>{

    const total = Math.ceil(filteredUsers.value.length / perPage.value)
    return total === 0 ? 1 : total;
  })


  watch([search, role, sortBy, perPage, sortDirection], () =>{
    page.value = 1
  })

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

  }
}
