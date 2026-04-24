import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateSubject, getSubjectById } from "../../../models/Subject";

export default function UpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [subject, setSubject] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubject(data.payload);
      setFormData(data.payload.main);
      setLoaded(true);
    }
  }

  const postForm = async () => {
    const subject = await updateSubject(id, formData);
    if (subject.status === 200) {
      redirectToSuccessPage(subject.payload._id);
    } else {
      setInfo(subject.msg);
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
    return navigate(`/subject/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Subject not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading subject...</p>
      </>
    )
  }

  return (
    <>
      <h1>Subject update form</h1>

      <form>
      <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          defaultValue={subject.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="code"
          placeholder="Enter subjects code"
          defaultValue={subject.code}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="grade"
          placeholder="Enter grade"
          defaultValue={subject.grade}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="requiredHours"
          placeholder="Enter required hours"
          defaultValue={subject.requiredHours}
          onChange={(e) => handleChange(e)}
        />


        <button onClick={handlePost}>Update subject</button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
