import {useEffect, useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


function DeleteMovieModal({modal, movie, toggle,onSuccess}){
    const [values,setValues]=useState({});


    useEffect(()=>{
        if (modal) {
            setValues(movie);
            console.log(movie.id)
        }
    },[movie,modal])





    const onSubmit = (movie) => {
        onSuccess(movie);
    }
    return(
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                are you sure want to delete {values.name}?
            </ModalHeader>
            <ModalBody>


            </ModalBody>
            <ModalFooter>
                <button
                    onClick={()=>onSubmit(values.id)}
                    className="btn btn-primary">
                    Delete
                </button>
                {' '}
                <button color="secondary" onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    )

}
export default DeleteMovieModal;