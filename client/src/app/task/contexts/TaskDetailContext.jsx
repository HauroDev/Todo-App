import { createContext } from 'react'
import { useTaskSelector } from '../../../hooks/store'
import useTaskActions from '../../../hooks/useTaskActions'
import { useForm } from 'react-hook-form'
import { taskDetailSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

const initialTaskDetailContext = {
  register: () => {},
  control: {},
  handleBlur: () => {},
  handleSubmit: () => {},
  setValue: () => {},
  taskDetail: {}
}

export const TaskDetailContext = createContext(initialTaskDetailContext)

export const TaskDetailProvider = ({ children }) => {
  const { taskDetail } = useTaskSelector()
  const { updateTask, getTaskDetail, clearTasks, getTasks } = useTaskActions()

  const { register, getValues, control, setValue, reset } = useForm({
    defaultValues: { ...taskDetail },
    mode: 'onChange',
    resolver: zodResolver(taskDetailSchema)
  })

  const handleBlur = ({ target: { name, value } }) => {
    if (taskDetail[name] !== value) {
      handleSubmit()
    }
  }

  const updateTasks = (data) =>
    updateTask(data)
      .then(() => getTaskDetail(taskDetail.id_task))
      .then(() => {
        clearTasks()
        return getTasks(taskDetail.id_user)
      })
      .then(() => reset())
      .catch((error) => console.log(error))

  const handleSubmit = () => {
    const formData = getValues()

    if (!formData.title) {
      return reset()
    }

    updateTasks(formData)
  }

  return (
    <TaskDetailContext.Provider
      value={{
        register,
        control,
        handleBlur,
        handleSubmit,
        setValue,
        taskDetail
      }}>
      {children}
    </TaskDetailContext.Provider>
  )
}
