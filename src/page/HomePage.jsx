const HomePage = () => {
  return (
    <div className=" grid grid-cols-2 gap-2 sm:grid-row-2">
      <div className="flex flex-col gap-2">
       <h1 className="mb-2 text-center text-lg font-bold ">¿Que es Kat model?</h1>
      <p className="text-center">Kat model es una aplicación web la cual te ayudará con la edición de fotos de ropa para tu empremdimiento, queremos proveerte de la mejor  herramienta con inteligencia artificial de facil uso </p>
      <a href=""className=" text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >registrate ahora</a>
      </div>
    <div className="grid grid-cols-2 gap-2">
    <div>
        <img className="h-auto max-w-full aspect-[2/3] rounded-lg" src="/img/image-home-4.jpg" alt="" />
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg aspect-[2/3]" src="/img/image-home-2.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg aspect-[3/3]" src="/img/image-home-3.jpg" alt=""/>
    </div>
    <div>
        <img className="h-auto max-w-full rounded-lg aspect-[3/3]" src="/img/image-home-1.jpg" alt=""/>
    </div>
  </div>
    </div>
  );
};

export default HomePage;


/* https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg */