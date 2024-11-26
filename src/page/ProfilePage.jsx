const ProfilePage = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-1">
      <h1 className="text-center grow w-screen text-3xl  font-bold">Perfil</h1>
      <div className=" m-10 p-10 flex flex-col gap-2 justify-evenly border-2 border-brand-secondary rounded-md ">
        <h2 className="text-xl font-bold">Datos:</h2>
        <p>user: jeison vera</p>
        <p>email: jeison vera</p>
        <p>nickname: jeive </p>
        <button className=" text-white bg-brand-secondary hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Editar</button>
        <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium border-2 border-brand-secondary text-brand-secondary focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Eliminar cuenta</button>
      </div>
      <div>
         <img  className='w-full aspect-[3/4] object-contain 'src="./img/profile-image.png" alt="profile" />
      </div>

    </div>
  )
}

export default ProfilePage