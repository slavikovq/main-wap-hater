import { Link } from "react-router-dom"

export default function EntityLink(props) {

    return (
        <>
            <p>Name: {props.name}</p>
            <Link to={`/subject/${props.id}`}>
                <p>View subject</p>
            </Link>
        </>
    )
}