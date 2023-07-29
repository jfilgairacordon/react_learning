import { useMemo } from 'react'
import './App.css'
import { UserList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'

function App () {
  const {
    users,
    sortByCountry,
    colorizeRows,
    filterByCountry,
    handleColorizeRows,
    handleSortByCountry,
    handleResetFilters,
    handleDeleteUser,
    handleFilterByCountry,
    fetchAllUsers
  } = useUsers()

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (filterByCountry === '') return true
      return user.location.country.toLowerCase().includes(filterByCountry.toLowerCase())
    })
  }, [filterByCountry, users])

  const sortUsers = () => {
    console.log('sortUsers')
    const sortedUsers = sortByCountry
      ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
      : filteredUsers

    return sortedUsers
  }

  const sortedUsers = useMemo(() => sortUsers(), [sortByCountry, filteredUsers])

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={handleColorizeRows}>Colorear celdas</button>
        <button onClick={handleSortByCountry}>Sort country</button>
        <button onClick={handleResetFilters}>Restore state</button>
        <input type="text" value={filterByCountry} onChange={handleFilterByCountry} />
      </header>
      {
        users.length === 0
          ? <button onClick={fetchAllUsers}>Reintentar carga de usuarios</button>
          : <UserList users={sortedUsers} colorize={colorizeRows} onDelete={handleDeleteUser} />
      }
    </>
  )
}

export default App
