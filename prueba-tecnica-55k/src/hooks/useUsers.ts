import { useEffect, useRef, useState } from 'react'
import { type User } from '../types'
import { fetchUsers } from '../services/users'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [colorizeRows, setColorizeRows] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const [filterByCountry, setFilterByCountry] = useState<string>('')
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const handleColorizeRows = () => {
    setColorizeRows(!colorizeRows)
  }

  const handleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDeleteUser = (uuid: string) => {
    const newUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(newUsers)
  }

  const handleResetFilters = () => {
    setUsers(originalUsers.current)
  }

  const handleFilterByCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByCountry(event.target.value)
  }

  const fetchAllUsers = () => {
    fetchUsers()
      .then(response => {
        setUsers(response.results)
        originalUsers.current = response.results
      })
      .catch(error => {
        console.log(error)
        alert('There was an error while fetching users')
      })
  }

  return {
    users,
    colorizeRows,
    sortByCountry,
    filterByCountry,
    handleColorizeRows,
    handleSortByCountry,
    handleDeleteUser,
    handleResetFilters,
    handleFilterByCountry,
    fetchAllUsers
  }
}
