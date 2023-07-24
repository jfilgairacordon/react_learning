import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    setFromLanguage,
    switchLanguages,
    setToLanguage,
    setText,
    setResult
  } = useStore()

  const debouncedText = useDebounce(text, 500)

  useEffect(() => {
    if (debouncedText === '') return
    translate({ text: debouncedText, from: fromLanguage, to: toLanguage })
      .then((res) => {
        if (res == null) throw new Error('Empty response')
        setResult(res)
      })
      .catch((err) => {
        console.log(err)
        setResult('Error')
      })
  }, [debouncedText, toLanguage, fromLanguage])

  const handleCopyToClipboard = () => {
    if (result === '') return
    navigator.clipboard.writeText(result)
      .then(() => {
        console.log('copied')
        alert('Copied to clipboard')
      })
      .catch((err) => {
        console.log(err)
        alert('Error copying to clipboard')
      })
  }

  const handleTextToSpeech = () => {
    if (result === '') return
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Jfilgaira Translate</h1>
      <Row>
        <Col xs='auto'>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              placeholder='Introducir texto'
              type={SectionType.From}
              value={text}
              onChange={setText}
            />
          </Stack>
        </Col>
        <Col>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => { switchLanguages() }}>
            <ArrowsIcon></ArrowsIcon>
          </Button>
        </Col>
        <Col xs='auto'>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              placeholder='Traducción'
              type={SectionType.To}
              value={result}
              loading={loading}
              onChange={() => { }}
            />
            <div>
              <Button variant='link' onClick={handleCopyToClipboard}><ClipboardIcon /></Button>
              <Button variant='link' onClick={handleTextToSpeech}><SpeakerIcon /></Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
