import { useReducer } from 'react'
import { type FromLanguage, type Action, type State, type Language } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  text: '',
  result: '',
  loading: false
}

function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'SWITCH_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.text !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (action.payload === state.fromLanguage) return state
    return { ...state, fromLanguage: action.payload, loading: true, result: '' }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (action.payload === state.toLanguage) return state
    return { ...state, toLanguage: action.payload, loading: true, result: '' }
  }

  if (type === 'SET_TEXT') {
    return { ...state, loading: true, text: action.payload, result: '' }
  }

  if (type === 'SET_RESULT') {
    return { ...state, loading: false, result: action.payload }
  }

  return state
}

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    text,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: 'SET_FROM_LANGUAGE', payload }) }
  const setToLanguage = (payload: Language) => { dispatch({ type: 'SET_TO_LANGUAGE', payload }) }
  const switchLanguages = () => { dispatch({ type: 'SWITCH_LANGUAGES' }) }
  const setText = (payload: string) => { dispatch({ type: 'SET_TEXT', payload }) }
  const setResult = (payload: string) => { dispatch({ type: 'SET_RESULT', payload }) }

  return {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    switchLanguages,
    setText,
    setResult
  }
}
