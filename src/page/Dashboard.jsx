import { useEffect, useState } from "react";
import { getAllUserRequest } from "../api/user";
import TableUser from "../components/TableUser";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      let response = await getAllUserRequest();
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <TableUser users={users} setUsers={setUsers} refreshUsers={getUsers} />
        </table>
      </div>
    </>
  );
};

export default Dashboard;
