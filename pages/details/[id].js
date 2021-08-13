import {useState,useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {useRouter} from "next/router"
import {listFavorite} from "../../components/listFavoriteLocal";
import {getByIdService} from "../../services/services";


function DetailMovie() {

    const [movie, setMovie] = useState([])
    const [movieLocal, setMovieLocal] = useState("")
    const [loading, setLoading] = useState(false);
    let router = useRouter();
    let id = router.query.id;

    const [movieSelect, setMovieSelect] = useState({
        name: '',
        description: '',
        year: '',
        stars: '',
        director: '',
        image: ''
    })



    useEffect(() => {
        setLoading(true)
        ListMovieDetails(id);
        setMovieLocal(id);
        const local = localStorage.getItem("movieFavorite")
        const movie = local ? JSON.parse(local) : [];
        setMovieLocal(movie);
    }, [id])

    const ListMovieDetailsm = (id) => {
        console.log(id)

        getByIdService(parseInt(id)).then((res) => {
            console.log(res)
            if (res.success) {
                setMovieSelect(res.item)
                setLoading(false);
            }
        })

    }
    const ListMovieDetails = (movieId) => {
        getByIdService(movieId).then((res) => {
            if (res.success) {
                setMovieSelect(res.item)
                setLoading(false);

            }
        })

    }

    function getStars(stars) {
        const s = [];
        for (let i = 0; i < stars; i++) {
            s.push(<FontAwesomeIcon color={"orange"} icon={faStar}/>);
        }
        return s;
    }

    useEffect(() => {

    }, [])

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-10">

                        <div >
                            <div className="text-center text-white">
                                <h1>{movieSelect.name}</h1>
                                <img src={movieSelect.image} alt="image movie detail"/>

                            </div>
                            <div>
                                <h3 className="text-center">{getStars(parseInt(movieSelect.stars) )}</h3>
                                <p className="text-white mt-2">{movieSelect.description}</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-2 mt-2">

                        {//listFavorite (movieLocal)
                        }


                    </div>
                </div>


            </div>
        </>
    )
}

export default DetailMovie;