import { type User } from '../types'

type Props = | {
  users: User[]
  colorize: boolean
  onDelete: (uuid: string) => void
}

export function UserList ({ users, colorize, onDelete }: Props) {
  return (
    <>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              const {
                login: { uuid },
                name: { first, last },
                picture: { thumbnail },
                location: { country }
              } = user

              const style = {
                backgroundColor: (colorize && (index % 2 === 0)) ? 'gray' : 'darkgray'
              }

              return (
                <tr key={uuid} style={colorize ? style : {}}>
                  <td>
                    <img src={thumbnail} alt={first} />
                  </td>
                  <td><span>{first}</span></td>
                  <td>{last}</td>
                  <td>{country}</td>
                  <td><button onClick={() => { onDelete(uuid) }}>Borrar</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}
