import TodoListSVG from '../components/svg/TodoListSVG'

const Landing = () => {
  return (
    <div className='text-gray-100 flex flex-col items-center text-center'>
      <h2 className='m-10 text-3xl sm:text-6xl font-bold max-w-[80%] xl:max-w-[50%]'>
        <span className='italic'>Organiza tus actividades</span>, se más
        productivo y completa tus metas
      </h2>
      <hr className='w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded' />
      <article className='flex flex-col xl:flex-row items-center mb-10'>
        <TodoListSVG className='w-[90%] md:w-96 fill-[#6C63FF]' />
        <p className='text-gray-300 max-w-[40ch]'>
          <strong className=''>ToDo App</strong> es una aplicación de gestión de
          tareas, diseñada para ayudarte a organizar y realizar un seguimiento
          de tus tareas diarias, proyectos y objetivos.
        </p>
      </article>
    </div>
  )
}

export default Landing
