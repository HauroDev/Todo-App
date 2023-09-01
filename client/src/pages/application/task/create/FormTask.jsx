import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { taskSchema } from '../schemas'
import { useUserSelector } from '../../../../hooks/store'
import useTaskActions from '../../../../hooks/useTaskActions'

import PlusMark from '../icons/PlusMark'
import CrossMark from '../icons/CrossMark'

const FormTask = ({ callback }) => {
  const {
    dataUser: { id_user: idUser }
  } = useUserSelector()

  const { createTask } = useTaskActions()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, submitCount },
    control,
    reset
  } = useForm({
    defaultValues: {
      status: 'pending',
      title: '',
      description: '',
      steps: [],
      id_user: idUser
    },
    mode: 'onChange',
    resolver: zodResolver(taskSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const handleStepAdd = () => append({ label: '' })
  const onSubmit = (data) =>
    createTask(data)
      .then(() => {
        reset()
        callback()
      })
      .catch((error) => {
        console.log(error)
      })

  return (
    <form
      className='p-1 rounded-lg bg-gray-800'
      onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Datos de la tarea</legend>
        <label htmlFor='title'>Título</label>
        <input
          className='w-full p-1 text-black'
          placeholder='actividad, obligación o meta...'
          {...register('title')}
        />
        <p className='text-red-600 mt-2'>{errors.title?.message}</p>
        <label htmlFor='description'>Descripción (opcional)</label>
        <textarea
          autoComplete='off'
          className='w-full p-1 text-black'
          placeholder='descripción de la tarea...'
          {...register('description')}
        />
      </fieldset>

      <fieldset className='flex flex-col gap-2'>
        <legend>Definir pasos (opcional)</legend>

        {fields.map((step, index) => (
          <div
            key={step.id}
            className='flex gap-2'>
            <Controller
              name={`steps.${index}.label`}
              control={control}
              render={({ field: { onChange, value, name, ref, onBlur } }) => (
                <input
                  autoComplete='off'
                  className='p-1 text-black'
                  onBlur={(event) => {
                    if (!event.target.value) {
                      remove(index)
                    }
                    onBlur(event)
                  }}
                  onKeyDown={(event) => {
                    if (event.key.toLocaleLowerCase() === 'enter') {
                      handleStepAdd()
                    }
                  }}
                  {...{ name, value, onChange, ref }}
                />
              )}
            />

            <button
              type='button'
              className='block w-fit bg-gray-700 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'
              onClick={() => remove(index)}>
              <CrossMark />
            </button>
          </div>
        ))}

        <button
          type='button'
          className='block w-fit bg-gray-700 rounded p-2 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200'
          onClick={handleStepAdd}>
          <PlusMark />
        </button>
      </fieldset>

      <button
        type='submit'
        disabled={submitCount === 0 ? false : !isDirty || !isValid}
        className='mt-2 block w-full bg-gray-800 rounded p-1 border-b-gray-950 hover:border-b-gray-200 active:border-b-gray-50 border-b-2 active:text-gray-500 active:border-gray-500 hover:bg-gray-500 duration-200 disabled:bg-gray-400 disabled:hover:border-b-gray-950 disabled:text-red-400 disabled:active:duration-0'>
        Crear Tarea
      </button>
    </form>
  )
}

export default FormTask
