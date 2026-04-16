import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSubject } from "../../../models/Subject";

export default function CreateForm() {
  //useState - vytvoreni promenne v reactu
  // nazev promenne, setter       useState(default_hodnota)
  const [formData, setFormData] = useState({main: false});
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const subjects = await createSubject(formData);
    if (subjects.status === 201) {
      redirectToSuccessPage(subjects.payload._id);
    } else {
      setInfo(subjects.msg);
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
    return navigate(`/createdsubject/${id}`);
  };

  return (
    <>
      <h1>Subject create form</h1>

      <form>
      <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="code"
          placeholder="Enter subjects code"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="grade"
          placeholder="Enter grade"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="requiredHours"
          placeholder="Enter required hours"
          onChange={(e) => handleChange(e)}
        />
     

        <button onClick={handlePost}>Create subject</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
