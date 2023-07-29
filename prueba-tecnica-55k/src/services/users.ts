export const fetchUsers = async () => {
  return await fetch('https://randomuser.me/api?results=100')
    .then(async response => {
      if (response.ok) return await response.json()
      throw new Error('Error fetching users')
    })
}
