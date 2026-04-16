import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateClass, getClassById } from "../../../models/Class";

export default function UpdateForm() {
  const { id } = useParams();  
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [classes, setClasses] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClasses(data.payload);
      setFormData(data.payload.main);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const classes = await updateClass(id, formData);
    if (classes.status === 200) {
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
    return navigate(`/class/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Class not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading class...</p>
      </>
    )
  }

  return (
    <>
      <h1>Class update form</h1>

      <form>
      <input
          type="code"
          required
          name="grade"
          placeholder="Enter grade"
          defaultValue={classes.grade}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="code"
          defaultValue={classes.code}
          placeholder="Enter class code"
          onChange={(e) => handleChange(e)}
        />

        <input type="checkbox"
          required
          name="main"
          defaultChecked={classes.main}
          onChange={(e) => handleCheckbox(e)}
        />
        {formData.main ? <input type="text" name="mainCode" defaultValue={classes.mainCode} placeholder="Enter class code" onChange={(e) => handleChange(e)}/> : ""}   
        <button onClick={handlePost}>Update class</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
