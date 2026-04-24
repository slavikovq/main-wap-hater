import { Link } from "react-router-dom";
import SubjectLink from "./EntityLink";
import { useState, useEffect } from "react";
import { getAllSubjects } from "../../../models/Subject";

export default function List() {
  const [subjects, setSubjects] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllSubjects();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setSubjects(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Subjects not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Subjects are loading</p>
      </>
    );
  }

  return (
    <>
      <h1>Subject list</h1>
      {
        subjects.map((subject, index) => (
            <SubjectLink key={index} grade={subject.name} id={subject._id} />
        ))
      }
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
