export function useUsersTable(users) {

  // filters
  const search = ref('')
  const role = ref(null)

  // sorting
  const sortBy = ref(null) // 'age' | 'createdAt'
  const sortDirection = ref('asc')

  // pagination
  const page = ref(1)
  const perPage = ref(10)

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


  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,

  }
}
