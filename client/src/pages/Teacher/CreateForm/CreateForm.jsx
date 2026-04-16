import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTeacher } from "../../../models/Teacher";

export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState({main: false});
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const teachers = await createTeacher(formData);
    if (teachers.status === 201) {
      redirectToSuccessPage(teachers.payload._id);
    } else {
      setInfo(teachers.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdteacher/${id}`);
  };

  return (
    <>
      <h1>Teacher create form</h1>

      <form>
      <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="age"
          placeholder="Enter teachers age"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="contract"
          placeholder="Enter contract"
          onChange={(e) => handleChange(e)}
        />
     

        <button onClick={handlePost}>Create teacher</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
