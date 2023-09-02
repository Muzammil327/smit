import { updateDoc, doc } from "firebase/firestore";
import db from "../../config/firebase-config";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  // get data
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const itemData = { name, description, age };
  if(!itemData.name){
    alert("Name is Required.");
  }
  if(!itemData.description){
    alert("Description is Required.");
  }
  if(!itemData.age){
    alert("Age is Required.");
  }
  
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, itemData);
  setLoading(true);

  navigate("/");
} catch (error) {
  console.log(error)
}
  };
  return (
    <>
      <form>
        <h1>Edit Data</h1>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <label htmlFor="description">Bio:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={""}
            required
          />
        </fieldset>
        <button type="submit" class="btn" onClick={handleSubmit}>
          {loading ? "Loading" :  "Edit Data"}
        </button>
      </form>
    </>
  );
}

export default App;
