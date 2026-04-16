import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentById, deleteStudent } from "../../../models/Student";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getStudentById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setStudent(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === student.name) {
      const result = await deleteStudent(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong student name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedstudent/${id}`);
  }


  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Student not found</p>
      </>
    )
  }

  if (!loaded) {
    return (
      <>
        <p>Loading student...</p>
      </>
    )
  }

  return (
    <>
      <h1>Student view</h1>
      <p>Student id: {id}</p>
      <p>Jméno: {student.name}</p>
      <p>Věk: {student.age}</p>
      <p>Průměr známek: {student.average} </p>
      <form>
        <p>Napište jméno studenta pro smazání studenta</p>
        <input type="text" placeholder={student.name} onChange={handleChange}/>
        <button onClick={handleDelete}>Delete student</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatestudent/${id}`}>
        <p>Update student</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
