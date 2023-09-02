import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../../config/firebase-config";
import { auth } from "../../config/firebase-config";
import { useEffect, useState } from "react";
import { UserAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = UserAuth();
  const userCollection = collection(db, "users");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, [userCollection]);

  const handleDelete = async (id) => {
    try {
      const taskDocRef = doc(db, "users", id);
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <table class="table">
        <thead>
          <th>S.No</th>
          <th>Name</th>
          <th>Age</th>
          <th>Description</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map((data) => (
            <tr key={data.id}>
              <td data-label="S.No">{data.id}</td>
              <td data-label="Name">{data.name}</td>
              <td data-label="Age">{data.age}</td>
              <td data-label="Marks%">{data.description}</td>
              <td data-label="Marks%" class="d">
                <Link to={`/update/${data.id}`}>Update</Link>
                <button
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/add`} class="btn">
        Add
      </Link>
    </>
  );
}

export default Dashboard;
