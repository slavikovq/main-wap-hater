import { Link, useParams, useNavigate } from "react-router-dom";
import { getClassById, deleteClass } from "../../../models/Class";
import { useEffect, useState } from "react";

export default function View() {
  const { id } = useParams();
  const [classes, setClasses] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getClassById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setClasses(data.payload);
      setLoaded(true);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (formData === classes.name) {
      const result = await deleteClass(id);
      if (result.status === 200) {
        redirect(id);
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong class name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedclass/${id}`);
  }


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
      <h1>Class view</h1>
      <p>Class id: {id}</p>
      <p>Třída: {classes.grade}</p>
      <p>Kód třídy: {classes.code}</p>
      <p>Kmenová třída: {classes.main ? "true" : "false"} </p>
      {classes.main ? <p>Kód kmenové třídy: {classes.mainCode}</p> : ""}
      <form>
        <p>Napište jméno třídy pro smazání třídy</p>
        <input type="text" placeholder={classes.grade} onChange={handleChange}/>
        <button onClick={handleDelete}>Delete class</button>
        <p>{info}</p>
      </form>
      <Link to={`/updateclass/${id}`}>
        <p>Update class</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
