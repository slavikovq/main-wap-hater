import { Link, useParams, useNavigate } from "react-router-dom";
import { getSubjectById, deleteSubject } from "../../../models/Subject";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [subject, setSubject] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getSubjectById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubject(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === subject.name) {
      const result = await deleteSubject(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong subject name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedsubject/${id}`);
  }


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
      <h1>Subject view</h1>
      <p>Subject id: {id}</p>
      <p>Kód: {subject.code}</p>
      <p>Třída: {subject.grade}</p>
      <p>Požadované hodiny týdne: {subject.requiredHours} </p>
      <form>
        <p>Napište jméno subjecta pro smazání subjecta</p>
        <input type="text" placeholder={subject.name} onChange={handleChange}/>
        <button onClick={handleDelete}>Delete subject</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatesubject/${id}`}>
        <p>Update subject</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
