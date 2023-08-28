import StepCard from './StepCard'

const Steps = ({ steps, idTask }) => {
  return (
    <div className='p-1 mb-2 border-2 border-gray-200 rounded-lg'>
      <h4 className='text-2xl'>
        <span>{steps.length}</span> {steps.length >= 1 ? 'Pasos' : 'Paso'}
      </h4>

      {steps.map((step, index) => (
        <StepCard
          key={index}
          index={index}
          {...step}
          idTask={idTask}
        />
      ))}
    </div>
  )
}
export default Steps
