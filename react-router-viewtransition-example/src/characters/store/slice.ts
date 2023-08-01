import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Character } from '../types'

const DEFAULT_STATE: Character[] = []

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: DEFAULT_STATE,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      return [...state, ...action.payload]
    }
  }
})

export default charactersSlice.reducer
export const { setCharacters } = charactersSlice.actions
