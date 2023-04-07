import React from 'react'
import { useNavigate } from 'react-router-dom'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AddIcon from '@mui/icons-material/Add';

function MoviesMenuComp() {
    const navigate = useNavigate()

    return (
        <div className='top-div-page'>
            <div className='small-menu-div'>
                <span className='page-title-text'>Movies</span>
                <div className='movies-btns-div'>
                    <button className='btn' onClick={() => navigate('/movies')}>
                        <BorderAllIcon />All Movies
                    </button>
                    <button className='btn' onClick={() => navigate('/movies/add')}>
                        <AddIcon />Add Movie
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MoviesMenuComp