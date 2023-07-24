import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

const commonStyles = {
  height: '200px',
  border: '0px solid transparent'
}

type Props =
  | { placeholder: string, loading?: undefined, type: SectionType.From, value: string, onChange: (value: string) => void }
  | { placeholder: string, loading?: boolean, type: SectionType.To, value: string, onChange: (value: string) => void }

export function TextArea ({ placeholder, loading, type, value, onChange }: Props) {
  const styles = type === SectionType.To
    ? { ...commonStyles, backgroundColor: '#f5f5f5' }
    : commonStyles

  return (
    <Form.Control
      disabled={type === SectionType.To}
      value={(type === SectionType.To && (loading ?? false)) ? 'Cargando...' : value}
      as="textarea"
      placeholder={placeholder}
      autoFocus={type === SectionType.From}
      style={styles}
      onChange={(e) => { onChange(e.target.value) }}
    />
  )
}
