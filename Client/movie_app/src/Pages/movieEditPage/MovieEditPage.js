import React, { useState, useEffect } from 'react'
import TopBarComp from '../../components/topBar/TopBar'
import NavMenuComp from '../../components/navMenu/NavMenu'
import MoviesMenuComp from '../../components/moviesMenu/MoviesMenu'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DateRangeIcon from '@mui/icons-material/DateRange';


function MovieEditPageComp() {
    // - Get the movie id from the url
    const { id } = useParams();

    const navigate = useNavigate();


    const [editMovieInp, setEditMovieInp] = useState({
        name: '',
        genres: [],
        img: '',
        yearPremiered: 0
    })

    const [movieName, setMovieName] = useState('');

    // - Get the movie from the database
    const getMovie = async () => {
        const { data } = await axios.get(`http://localhost:8000/movies/${id}`)
        setEditMovieInp({ ...data })
        setMovieName(data.name)
    }

    // - UseEffect to get the movie from the database
    useEffect(() => {
        getMovie()
    }, [id])

    // - Update the movie in the database
    const handleSave = () => {
        axios.put(`http://localhost:8000/movies/${id}`, editMovieInp)
        navigate('/movies')
    }



    return (
        <div>
            <div>
                <div className='movies-add-page'>
                    <TopBarComp data={true} />
                    <NavMenuComp />
                    <MoviesMenuComp />
                    <br />

                    <div className='add-edit-form-div'>
                        <span className='add-edit-form-title'>Edit Movie: {movieName}</span>

                        <div className="add-edit-form">
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMovieInp.name} onChange={e => setEditMovieInp({ ...editMovieInp, name: e.target.value })} id="input-with-sx" label="Name" variant="standard" />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AutoAwesomeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMovieInp.genres.join(',')} onChange={e => setEditMovieInp({ ...editMovieInp, genres: [...e.target.value.split(',')] })} id="input-with-sx" label="Genres" variant="standard" />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <InsertPhotoIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMovieInp.img} onChange={e => setEditMovieInp({ ...editMovieInp, img: e.target.value })} id="input-with-sx" label="Image URL" variant="standard" />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <DateRangeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMovieInp.yearPremiered} onChange={e => setEditMovieInp({ ...editMovieInp, yearPremiered: +e.target.value })} id="input-with-sx" label="Premired" variant="standard" />
                                </Box>
                            </div>
                        </div>

                        <div className="add-edit-form-btn-div">
                            <button className='btn' onClick={handleSave}>Save</button>
                            <button className='btn' onClick={() => navigate('/movies')}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieEditPageComp