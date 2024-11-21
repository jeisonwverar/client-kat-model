
const Footer = () => {
  return (
    <footer className="bg-brand rounded-lg shadow dark:bg-gray-900 p-4">
      <div className="w-full max-w-screen-xl mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/img/logo-transparente.png" className="h-12 block" alt="Kat Model" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="/" className="hover:underline">Kat Model™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;