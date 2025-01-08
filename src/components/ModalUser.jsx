import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ModalUser = ({ status, setStatus, userData, updateUser }) => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const [isChecked, setIsChecked] = useState(false);

  // Actualiza el estado del checkbox
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Establece valores iniciales al cargar los datos del usuario
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("role", userData.role || ""); // Selecciona el rol del usuario
    }
  }, [userData, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      // Crea el objeto a enviar
      const data = {
        name: values.name,
        email: values.email,
        role: values.role,
      };

      // Si el usuario desea cambiar la contraseña, incluirla
      if (isChecked && values.password) {
        data.password = values.password;
      }

      // Llamada a la API
      await updateUser(userData.user_id, data);

      
      setStatus(false);
      reset(); // Limpia el formulario
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  });

  return (
    <>
      {/* Modal */}
      <div
        className={`${
          !status ? "hidden" : "flex"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modificar el usuario
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setStatus(false)}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
            {/* Body */}
            <form className="p-4 md:p-5" onSubmit={onSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("name", {
                      required: "El nombre es obligatorio",
                      maxLength: 20,
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("email")}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="changePassword">
                    ¿Desea cambiar la contraseña?
                  </label>
                  <input
                    type="checkbox"
                    id="changePassword"
                    onChange={handleCheckbox}
                    checked={isChecked}
                  />
                </div>
                {isChecked && (
                  <div className="col-span-2">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      {...register("password", {
                        minLength: 5,
                      })}
                    />
                  </div>
                )}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    {...register("role")}
                  >
                    <option value="">Select role</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
              >
                Modificar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUser;
