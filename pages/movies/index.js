import 'bootstrap/dist/css/bootstrap.min.css'
import {useEffect, useState} from "react";
import {faHeart, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import { getMoviesService} from "../../services/services";
import {listFavorite} from "../../components/listFavoriteLocal";



export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [movieLocal, setMovieLocal] = useState([])
    const [loading, setLoading] = useState(false)
    let router = useRouter();
    let id= router.query.id ;
    const [movieSelect, setMovieSelect] = useState({
        name: '',
        description: '',
        year: '',
        stars: '',
        director: '',
        image: ''
    })


    useEffect(() => {
        setLoading(true);
        const local = localStorage.getItem("movieFavorite")
        const movie = local ? JSON.parse(local) : [];
        setMovieLocal(movie);
        getMovie();
    }, []);


    const getMovie = () => {
        getMoviesService()
            .then((res) => {
                if(res.success){
                    setMovies(res.items)
                    setLoading(false);
                }
            })
    }

    const addMovieLocal = (movieData) => {
        const movieFavoriteExist = movieLocal.find((movie) => movie.id === movieData.id);
        if (movieFavoriteExist) {
            const newMovie = Object.assign([], movieLocal);
            setMovieLocal(newMovie.filter((movie) => movieData.id !== movie.id))
        } else {
            const newMovie = Object.assign([], movieLocal);
            newMovie.push(movieData);
            setMovieLocal(newMovie);
        }
        localStorage.setItem("movieFavorite", JSON.stringify(movieLocal));
    }

    let history = useRouter();


    function handleClick(id) {
        history.push("/details/" + id);
    }


 return(
     <>
         {loading ?
             <div className="text-center"><FontAwesomeIcon spin className="text-white" size="4x" icon={faSpinner}/></div> :
             <div className="container">

                 <div className="row">
                     <div className="col-10">

                         <div className="row">
                             {movies.map((movie, i) => (
                                 <div key={i} className="card bg-transparent border-0 mt-4" style={{width: "18rem"}}>
                                     <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                                          onClick={() => handleClick(movie.id)}/>
                                     <h5 className="rounded-circle border-4 bg-primary text-white position-absolute p-2"
                                         style={{bottom: "100px", right: "20px"}}>{movie.year}</h5>


                                     <div className="card-body">
                                         <p className="card-text text-white text-center">{movie.name}
                                             <button className="btn btn-link btn-sm position-absolute" style={{right: "20px"}}
                                                     onClick={() => {
                                                         addMovieLocal(movie)
                                                     }}>
                                                 {!movieLocal.find((m) => m.id === movie.id) ?
                                                     <FontAwesomeIcon className="text-white " icon={faHeart}
                                                     /> : <FontAwesomeIcon className="text-danger  " icon={faHeart}
                                                     />}
                                             </button>
                                         </p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                     <div className="col-2">
                         {listFavorite(movieLocal)
                              }
                     </div>
                 </div>

             </div>
         }
     </>
 )
}