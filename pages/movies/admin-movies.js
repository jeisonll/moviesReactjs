import {useEffect, useState} from "react";
import {deleteMovieService, getMoviesService, postMovieService, putMoviesService} from "../../services/services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import UpdateOrInsertMovieModal from "../../modals/UpdateOrInsertModal";
import DeleteMovieModal from "../../modals/deleteModals";
//import DeleteMovieModal from "../Modals/DeleteMovieModal";

function AdminMovies() {
    const [movies, setMovies] = useState([])
    // const [movie, setMovie] = useState<any>(initialMovie)
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    // const [modalInsert, setModalInsert] = useState(false);
    const [movieSelect, setMovieSelect] = useState({})

    const toggle = () => {
        setModal(!modal);
    }
    const toggleDelete = () => {
        setModalDelete(!modalDelete);
    }
    const getMovies = () => {
        getMoviesService()
            .then((res) => {
                if(res.success){
                    setMovies(res.items)
                    setLoading(false);
                }
            })
    }
    const onDelete = (movie) => {
        deleteMovieService(movie).then((res)=>{
            if(res.success){
                toggleDelete();
                getMovies();
            }
        })
    }
    const movieSelection = (movie) => {
        setMovieSelect(movie)
        toggle()
    }
    const movieSelectionDelete =(movie)=>{
        setMovieSelect(movie)
        toggleDelete()
    }
    useEffect(() => {
        getMovies()
    }, [])

    function onSave(movie, type) {
        console.log(movie)
        switch (type) {
            case "UPDATE":
                putMoviesService(movie)
                    .then((res) => {
                        if (res.success) {
                            toggle();
                            getMovies();
                        }
                    })
                break;
            case "INSERT":
                postMovieService(movie)
                    .then((res) => {
                        if (res.success) {
                            toggle();
                            getMovies();
                        }
                    })
                break;
        }
    }
    return (
        <div >
            <div className=" container text-center ">
                <h1 className="text-white">Admin Movies</h1>
                <table className="table text-white mt-2">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stars</th>
                        <th scope="col">Descriptions</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie,i) => (
                        // <tr>
                        //     <th>
                        //
                        //     <td>{movie.name}</td>
                        //     <td>{movie.director}</td>
                        //     <td>{movie.year}</td>
                        //     <td>{movie.stars}</td>
                        //     <td>{movie.description}</td>
                        //     <td>{movie.image}</td>
                        //     </th>
                        // </tr>
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{movie.name}</td>
                            <td>{movie.stars}</td>
                            <td>{movie.description.slice(0, 20)}...</td>
                            <td>
                                <button
                                    className="btn btn-link sm position-absolute text-white"
                                    onClick={() => movieSelection(movie)}>
                                    <FontAwesomeIcon className="text-white " icon={faEdit}/>
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-link sm position-absolute text-white"
                                        onClick={() => movieSelectionDelete(movie)}><FontAwesomeIcon
                                    className="text-white " icon={faTrash}
                                /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    className="btn btn-primary position-absolute text-dark text-center"
                    onClick={() => {
                        // Cuando quiera insertar reestablezco movieSelect para que no cargue informacion previamente guardada
                        toggle();
                        setMovieSelect({});
                    }}>
                    Insert
                </button>
                <UpdateOrInsertMovieModal
                    //con la id sabremos si es actualizar o eliminar
                    title={movieSelect.id ? "Update movie" : "Insert Movie"}
                    toggle={toggle}
                    movie={movieSelect}
                    modal={modal}
                    onSuccess={onSave}
                />
                <DeleteMovieModal
                    modal={modalDelete}
                    movie={movieSelect}
                    toggle={toggleDelete}
                    onSuccess={onDelete}
                />
            </div>
        </div>
    )
}

export default AdminMovies;
