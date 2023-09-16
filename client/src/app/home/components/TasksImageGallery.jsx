import { useState } from 'react'
import ButtonStyled from '../../../components/buttons/ButtonStyled'

function TasksImageCarousel() {
  const imageNames = Array.from({ length: 20 }, (_, index) =>
    String.fromCharCode(97 + index)
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageNames.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageNames.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className='flex select-none justify-center items-center max-w-[20rem] sm:max-w-[40rem] p-3 border-gray-200'>
      <div className='relative'>
        <ButtonStyled
          className='absolute max-w-fit h-10 top-1/2 left-4 rounded-full bg-gray-700'
          onClick={handlePrev}>
          &lt;
        </ButtonStyled>
        <span className='absolute top-2 left-2 bg-gray-700/[0.8] border-green-500 border-2 w-7 h-7 text-green-500 font-bold'>
          {currentIndex + 1}
        </span>
        <img
          className='mx-auto'
          src={`/assets/${imageNames[currentIndex]}.png`}
          alt={`Image ${imageNames[currentIndex]}`}
        />
        <ButtonStyled
          className='absolute max-w-fit h-10 top-1/2 right-4 rounded-full bg-gray-700'
          onClick={handleNext}>
          &gt;
        </ButtonStyled>
      </div>
    </div>
  )
}

export default TasksImageCarousel
