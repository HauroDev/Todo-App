import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  groups: [],
  groupDetail: {}
}

const initialState = (() => {
  const previousState = localStorage.getItem('__todoapp__state__')

  if (!previousState) {
    return DEFAULT_STATE
  }

  return JSON.parse(previousState).groups
})()

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getAllGroups: (state, action) => {
      return { ...state, groups: [...action.payload] }
    },
    createGroup: (state, action) => {
      return { ...state, groups: [...state.tasks, action.payload] }
    },
    getGroupDetail: (state, action) => {
      return { ...state, groupDetail: action.payload }
    },
    deleteGroup: (state, action) => {
      return {
        ...state,
        groups: state.tasks.filter((task) => task.id !== action.payload.id)
      }
    },
    restoreGroup: (state, action) => {
      return { ...state, groups: [...state.tasks, action.payload] }
    }
  }
})

export const {
  createGroup,
  deleteGroup,
  getGroupDetail,
  restoreGroup,
  getAllGroups
} = groupSlice.actions

export default groupSlice.reducer
