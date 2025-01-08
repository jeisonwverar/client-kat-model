import { updateUserRequest, deleteUserRequest } from "../api/user";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from "react";
import ModalUser from "./ModalUser";
import DeleteModal from "./DeleteModal";
import Message from "./Message";
const TableUser = ({ users, setUsers }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  // Manejar la actualización del usuario
  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const updatedUser = await updateUserRequest(userId, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, ...updatedUser } : user
        )
      );
      setIsUpdateModalOpen(false); // Cierra el modal tras la actualización
      setIsSuccess(true);
      setMessage("usuario actualizado exitosamente");
    } catch (error) {
      setIsSuccess(false);
      setMessage("error actualizando al usuario");
      console.error("Error actualizando el usuario:", error);
    } finally {
      setShowMessage(true);
    }
  };

  // Manejar la eliminación del usuario
  const handleDeleteUser = async () => {
    try {
      await deleteUserRequest(selectedUser.user_id);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== selectedUser.user_id)
      );
      setIsDeleteModalOpen(false);
      setIsSuccess(true);
      setMessage("usuario eliminado exitosamente"); // Cierra el modal tras la eliminación
    } catch (error) {
      setIsSuccess(false);
      setMessage("error eliminado el usuario");
      console.error("Error al borrar el usuario:", error);
    } finally {
      setShowMessage(true);
    }
  };

  return (
    <tbody>
      {users.map((user) => (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          key={user.user_id}
        >
          <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {user.name}
          </th>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">{user.role}</td>
          <td className="px-6 py-4 flex justify-evenly">
            {/* Botón para abrir el modal de actualización */}
            <button
              className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:text-blue-700"
              onClick={() => {
                setSelectedUser(user); // Selecciona el usuario actual
                setIsUpdateModalOpen(true); // Abre el modal de actualización
              }}
            >
              <FaRegEdit className="w-6" />
            </button>
            <ModalUser
              status={isUpdateModalOpen}
              setStatus={setIsUpdateModalOpen}
              userData={selectedUser}
              updateUser={handleUpdateUser}
            />

            {/* Botón para abrir el modal de eliminación */}
            <button
              className="font-bold text-lg text-red-600 dark:text-blue-500 hover:text-red-700"
              onClick={() => {
                setSelectedUser(user); // Selecciona el usuario actual
                setIsDeleteModalOpen(true); // Abre el modal de eliminación
              }}
            >
              <RiDeleteBin2Line className="w-6" />
            </button>
            <DeleteModal
              onConfirm={handleDeleteUser}
              status={isDeleteModalOpen}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          </td>
        </tr>
      ))}
      {showMessage && (
        <Message
          success={isSuccess}
          message={message}
          onClose={() => setShowMessage(false)} // Cerrar el mensaje
        />
      )}
    </tbody>
  );
};

export default TableUser;
