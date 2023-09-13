import { useContext } from 'react'
import { TaskDetailContext } from '../contexts/TaskDetailContext'

const useTaskDetail = () => useContext(TaskDetailContext)
export default useTaskDetail
