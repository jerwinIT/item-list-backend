import { Clock } from './functions.jsx';

function Navbar({ onAdd }) {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container d-flex">
                <a className="navbar-brand" href="#">Collab</a>
                <Clock className="fs-5" />
                <button className="btn btn-primary" onClick={onAdd}>Add Task</button>
            </div>
        </nav>
    );
}

function Card({ id, title, body, onDelete, onUpdate }) {
    return (
        <div className="card" style={{ width: "18rem", marginBottom: "1rem" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <div className="button-container d-flex">
                    <button className='btn btn-danger me-2' onClick={() => onDelete(id)}>Delete</button>
                    <button className='btn btn-success' onClick={() => onUpdate(id)}>Update</button>
                </div>
            </div>
        </div>
    );
}

export { Navbar, Card };
