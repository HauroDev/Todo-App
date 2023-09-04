import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  tasks: [],
  tasksDeleted: [],
  taskDetail: {}
}

const initialState = (() => {
  const previousState = JSON.parse(
    localStorage.getItem('__todoapp__state__')
  )?.task

  if (!previousState) {
    return DEFAULT_STATE
  }

  return previousState
})()

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return { ...state, tasks: [...action.payload] }
    },
    setTasksDeleted: (state, action) => {
      return { ...state, tasksDeleted: [...action.payload] }
    },
    setDetail: (state, action) => {
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
    destroy: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id_task !== action.payload)
      }
    },
    restore: (state, action) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    },
    update: (state, action) => {
      const indexTaskUpdate = state.tasks.findIndex(
        (t) => t.id_task === action.payload.id_task
      )
      const tasks = [...state.tasks]
      tasks[indexTaskUpdate] = action.payload

      return { ...state, tasks }
    }
  }
})

export const {
  setTasks,
  setTasksDeleted,
  setDetail,
  clearDetail,
  clearAll,
  restore,
  create,
  remove,
  destroy,
  update
} = taskSlice.actions

export default taskSlice.reducer
