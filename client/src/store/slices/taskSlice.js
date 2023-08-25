import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  tasks: [],
  taskDetail: {}
}

const initialState = (() => {
  const previousState = localStorage.getItem('__todoapp__state__')

  if (!previousState) {
    return DEFAULT_STATE
  }

  return JSON.parse(previousState).task
})()

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getAll: (state, action) => {
      return { ...state, tasks: [...action.payload] }
    },
    getDetail: (state, action) => {
      return { ...state, taskDetail: action.payload }
    },
    create: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    },
    clearDetail: (state) => {
      return { ...state, taskDetail: {} }
    },
    clearAll: (state) => {
      return { ...state, tasks: [] }
    },
    remove: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id_task !== action.payload)
      }
    },
    restore: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    },
    update: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    }
  }
})

export const {
  getAll,
  clearDetail,
  clearAll,
  restore,
  create,
  remove,
  update,
  getDetail
} = taskSlice.actions

export default taskSlice.reducer
