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
    const classes = await createClass(formData);
    if (classes.status === 201) {
      redirectToSuccessPage(classes.payload._id);
    } else {
      setInfo(classes.msg);
    }
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdclass/${id}`);
  };

  console.log(formData)

  return (
    <>
      <h1>Class create form</h1>

      <form>
      <input
          type="code"
          required
          name="grade"
          placeholder="Enter grade"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="code"
          placeholder="Enter class code"
          onChange={(e) => handleChange(e)}
        />

        <input type="checkbox"
          required
          name="main"
          onChange={(e) => handleCheckbox(e)}
        />
        {formData.main ? <input type="text" name="mainCode" placeholder="Enter class code" onChange={(e) => handleChange(e)}/> : ""}        

        <button onClick={handlePost}>Create class</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
