import './movieAddPage.css';
import React, { useState } from 'react'
import TopBarComp from '../../components/topBar/TopBar'
import NavMenuComp from '../../components/navMenu/NavMenu'
import MoviesMenuComp from '../../components/moviesMenu/MoviesMenu'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DateRangeIcon from '@mui/icons-material/DateRange';


function MovieAddPageComp() {
    const navigate = useNavigate();

    const [newMovieInp, setNewMovieInp] = useState({
        name: '',
        genres: [],
        img: '',
        yearPremiered: 0
    })


    const handleSave = () => {
        console.log(newMovieInp)
        axios.post('http://localhost:8000/movies', newMovieInp)
        navigate('/movies')
    }



    return (
        <div>
            <div className='movies-add-page'>
                <TopBarComp data={true} />
                <NavMenuComp />
                <MoviesMenuComp />
                <br />

                <div className='add-edit-form-div'>
                    <span className='add-edit-form-title'>Add New Movie</span>

                    <div className="add-edit-form">
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField onChange={e => setNewMovieInp({ ...newMovieInp, name: e.target.value })} id="input-with-sx" label="Name" variant="standard" />
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AutoAwesomeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField onChange={e => setNewMovieInp({ ...newMovieInp, genres: [...e.target.value.split(',')] })} id="input-with-sx" label="Genres" variant="standard" />
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <InsertPhotoIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField onChange={e => setNewMovieInp({ ...newMovieInp, img: e.target.value })} id="input-with-sx" label="Image URL" variant="standard" />
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <DateRangeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField onChange={e => setNewMovieInp({ ...newMovieInp, yearPremiered: +e.target.value })} id="input-with-sx" label="Premired" variant="standard" />
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
    )
}

export default MovieAddPageComp