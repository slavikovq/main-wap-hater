import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createStudent } from "../../../models/Student";

export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState({main: false});
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const students = await createStudent(formData);
    if (students.status === 201) {
      redirectToSuccessPage(students.payload._id);
    } else {
      setInfo(students.msg);
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
    return navigate(`/createdstudent/${id}`);
  };

  console.log(formData)

  return (
    <>
      <h1>Student create form</h1>

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
          placeholder="Enter students age"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="average"
          placeholder="Enter students average"
          onChange={(e) => handleChange(e)}
        />
     

        <button onClick={handlePost}>Create student</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
