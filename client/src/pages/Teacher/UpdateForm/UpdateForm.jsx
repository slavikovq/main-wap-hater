import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTeacher, getTeacherById } from "../../../models/Teacher";

export default function UpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [teacher, setTeacher] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getTeacherById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeacher(data.payload);
      setFormData(data.payload.main);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const teacher = await updateTeacher(id, formData);
    if (teacher.status === 200) {
      redirectToSuccessPage(teacher.payload._id);
    } else {
      setInfo(teacher.msg);
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
    return navigate(`/teacher/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Teacher not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading teacher...</p>
      </>
    )
  }

  return (
    <>
      <h1>Teacher update form</h1>

      <form>
      <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          defaultValue={teacher.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="age"
          placeholder="Enter teachers age"
          defaultValue={teacher.age}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="contract"
          placeholder="Enter contract"
          defaultValue={teacher.contract}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update teacher</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
