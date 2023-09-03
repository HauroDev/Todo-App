import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  isSignedIn: false,
  dataUser: {},
  token: ''
}

const initialState = (() => {
  const previousState = JSON.parse(
    localStorage.getItem('__todoapp__state__')
  )?.user

  if (!previousState) {
    return DEFAULT_STATE
  }

  return previousState
})()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      return { ...state, ...action.payload, isSignedIn: true }
    },
    signOut: () => {
      return DEFAULT_STATE
    },
    signUp: (state, action) => {
      return { ...state, ...action.payload, isSignedIn: true }
    },
    update: (state, action) => {
      return { ...state, dataUser: action.payload }
    }
  }
})

export const { signUp, signIn, signOut, update } = userSlice.actions

export default userSlice.reducer
