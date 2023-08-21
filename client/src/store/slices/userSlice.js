import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  isSignedIn: false,
  token: '',
  dataUser: {}
}

const initialState = (() => {
  const previousState = localStorage.getItem('__todoapp__state__')

  if (!previousState) {
    return DEFAULT_STATE
  }

  return JSON.parse(previousState).user
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
    }
  }
})

export const { signUp, signIn, signOut } = userSlice.actions

export default userSlice.reducer
