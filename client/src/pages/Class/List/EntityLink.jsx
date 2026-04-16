import { Link } from "react-router-dom"

export default function EntityLink(props) {

    return (
        <>
            <p>Name: {props.grade}.{props.code}</p>
            <Link to={`/class/${props.id}`}>
                <p>View class</p>
            </Link>
        </>
    )
}