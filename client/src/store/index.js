import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import tasksReducer from './slices/taskSlice'

const persistUserData = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__todoapp__state__', JSON.stringify(store.getState()))
}

export default configureStore({
  reducer: {
    user: userReducer,
    task: tasksReducer
  },
  middleware: [persistUserData]
})
