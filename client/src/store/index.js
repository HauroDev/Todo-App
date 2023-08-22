import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import tasksReducer from './slices/taskSlice'
import listsReducer from './slices/listSlice'
import groupsReducer from './slices/groupSlice'

const persistUserData = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__todoapp__state__', JSON.stringify(store.getState()))
}

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    lists: listsReducer,
    groups: groupsReducer
  },
  middleware: [persistUserData]
})
