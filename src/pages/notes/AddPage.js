import { collection, addDoc } from "firebase/firestore";
import db from "../../config/firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddData() {
  const navigate = useNavigate();
  const userCollection = collection(db, "users");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!name) {
        alert("Name is Required.");
      }
      if (!description) {
        alert("Description is Required.");
      }
      if (!age) {
        alert("Age is Required.");
      }
      await addDoc(userCollection, {
        name: name,
        description: description,
        age: age,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <>
      <form>
        <h1>Add Data</h1>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="description">Bio:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
          />
        </fieldset>
        <button type="submit" class="btn" onClick={handleSubmit}>
          Add Data
        </button>
      </form>
    </>
  );
}

export default AddData;
