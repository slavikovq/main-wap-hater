import { Link } from "react-router-dom"

export default function EntityLink(props) {

    return (
        <>
            <p>Name: {props.name}</p>
            <Link to={`/teacher/${props.id}`}>
                <p>View teacher</p>
            </Link>
        </>
    )
}