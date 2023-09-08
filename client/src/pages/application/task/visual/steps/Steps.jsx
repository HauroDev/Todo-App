import { useFieldArray } from 'react-hook-form'
import PlusButton from '../../../../../components/buttons/PlusButton'
import StepCard from './card/StepCard'
import useTaskDetail from '../../hooks/useTaskDetail'

const Steps = () => {
  const { control } = useTaskDetail()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  })

  const handleStepAdd = () => append({ label: '', status: 'pending' })
  const handleStepRemove = (index) => remove(index)

  return (
    <section className='w-full'>
      <div className='flex flex-col gap-2 overflow-y-scroll max-h-56'>
        {fields.map((step, index) => (
          <StepCard
            key={step.id}
            {...{
              handleStepRemove,
              index
            }}
          />
        ))}
      </div>
      <div className='mt-2'>
        <PlusButton onClick={handleStepAdd} />
      </div>
    </section>
  )
}

export default Steps
