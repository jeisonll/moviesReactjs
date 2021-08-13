export const listFavorite = (movieLocal) => (
    <div className="border-2 rounded-2 bg-dark m-0 justify-content-center d-flex">
        <ul className="list-group list-group-flush text-center " style={{width: "8rem"}}>
            <li className="list-group-item text-white bg-transparent"><h6>Lista de Favoritos</h6></li>
            {movieLocal.map((movie, i) => (
                <li key={i} className="list-group-item text-white bg-transparent">{movie.name}
                    <img className="card-img-top border-1 rounded position-relative" src={movie.image}
                         alt="Card image cap"/>
                </li>

            ))}
        </ul>
    </div>
)