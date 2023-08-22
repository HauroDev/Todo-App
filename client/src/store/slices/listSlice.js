import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  lists: [],
  listDetail: {}
}

const initialState = (() => {
  const previousState = localStorage.getItem('__todoapp__state__')

  if (!previousState) {
    return DEFAULT_STATE
  }

  return JSON.parse(previousState).lists
})()

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    getAllLists: (state, action) => {
      return { ...state, lists: [...action.payload] }
    },
    createList: (state, action) => {
      return { ...state, lists: [...state.tasks, action.payload] }
    },
    getListDetail: (state, action) => {
      return { ...state, listDetail: action.payload }
    },
    deleteList: (state, action) => {
      return {
        ...state,
        lists: state.tasks.filter((task) => task.id !== action.payload.id)
      }
    },
    restoreList: (state, action) => {
      return { ...state, lists: [...state.tasks, action.payload] }
    }
  }
})

export const {
  createList,
  deleteList,
  getListDetail,
  restoreList,
  getAllLists
} = listSlice.actions

export default listSlice.reducer
