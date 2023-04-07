import './MoviesPage.css';
import TopBarComp from '../../components/topBar/TopBar';
import React, {useState, useEffect} from 'react'
import MovieCardComp from '../../components/movieCard/MovieCard';
import axios from 'axios'; 
import MoviesMenuComp from '../../components/moviesMenu/MoviesMenu';
import NavMenuComp from '../../components/navMenu/NavMenu';
import SearchIcon from '@mui/icons-material/Search';


function MoviesPageComp() {
    const [movies, setMovies] = useState([]);
    const [findText, setFindText] = useState('');

    
    const getMovies = async () => {
        const {data} = await axios.get('http://localhost:8000/movies')
        setMovies(data)
    }

    const getParamsFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q')
        if (q) {
            setFindText(q)
        }
    }

    useEffect(() => {
        getMovies()
        getParamsFromURL()
    },[])

    return (
        <div className='movies-page'>
            <TopBarComp data={true} />
            <NavMenuComp/>
            <MoviesMenuComp/>

            <div className='top-div-page'>
                <div className='find-movie-div'>
                    <input className='find-movie-input' value={findText} placeholder='Find Movies...' onChange={e => setFindText(e.target.value)} type="text" />
                    <button className='btn find-btn'><SearchIcon/>Find</button>
                </div>
            </div>

            <div className='movies-section-cards'>
                {
                    movies.filter(movie => movie.name.toLowerCase().includes(findText.toLowerCase())).map(movie => {
                        return <MovieCardComp key={movie._id} movie={movie} />
                    })
                }
            </div>
        </div>
    )
}

export default MoviesPageComp