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

  return JSON.parse(previousState).tasks
})()

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      return { ...state, tasks: [...action.payload] }
    },
    createTask: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    },
    getTaskDetail: (state, action) => {
      return { ...state, taskDetail: action.payload }
    },
    deleteTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id)
      }
    },
    restoreTask: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    }
  }
})

export const {
  createTask,
  deleteTask,
  getTaskDetail,
  restoreTask,
  getAllTasks
} = taskSlice.actions

export default taskSlice.reducer
