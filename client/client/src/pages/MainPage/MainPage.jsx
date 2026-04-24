import "./MainPage.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="container">
      <Link className="menu-link" to={"/createclass"}>
        <p className="menu-item">Class create form</p>
      </Link>
      <Link className="menu-link" to={"/classes"}>
        <p className="menu-item">Class list</p>
      </Link>

      <Link className="menu-link" to={"/createstudent"}>
        <p className="menu-item">Student create form</p>
      </Link>
      <Link className="menu-link" to={"/students"}>
        <p className="menu-item">Student list</p>
      </Link>

      <Link className="menu-link" to={"/createsubject"}>
        <p className="menu-item">Subject create form</p>
      </Link>
      <Link className="menu-link" to={"/subjects"}>
        <p className="menu-item">Subject list</p>
      </Link>

      <Link className="menu-link" to={"/createteacher"}>
        <p className="menu-item">Teacher create form</p>
      </Link>
      <Link className="menu-link" to={"/teachers"}>
        <p className="menu-item">Teacher list</p>
      </Link>
    </div>
  );
}