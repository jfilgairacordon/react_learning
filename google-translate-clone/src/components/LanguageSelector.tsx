import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }

export function LanguageSelector ({ type, value, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select value={value} aria-label="Language selector" onChange={handleChange}>
      {
        type === SectionType.From &&
          <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      }
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))
      }
    </Form.Select>
  )
}
