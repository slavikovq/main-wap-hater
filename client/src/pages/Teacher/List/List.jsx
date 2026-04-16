import { Link } from "react-router-dom";
import TeacherLink from "./EntityLink";
import { useState, useEffect } from "react";
import { getAllTeachers } from "../../../models/Teacher";

export default function List() {
  const [teachers, setTeachers] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllTeachers();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTeachers(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Teachers not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Teachers are loading</p>
      </>
    );
  }

  return (
    <>
      <h1>Teacher list</h1>
      {
        teachers.map((teacher, index) => (
            <TeacherLink key={index} grade={teacher.name} id={teacher._id} />
        ))
      }
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
