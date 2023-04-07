import './subscriptionsCard.css';
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';


function SubscriptionsCardComp(params) {
    const navigate = useNavigate()

    const [newSubOpen, setNewSubOpen] = useState(false)
    const [newMovieSubInp, setNewMovieSubInp] = useState({
        movieId: '',
        memberId: params.sub._id,
        date: '',
    })

    // - handle new subcription submit
    const handleNewSubSubmit = async () => {
        await axios.post(`http://localhost:8000/subscriptions`, newMovieSubInp)
        window.location.reload()
    }

    // - handle delete member
    const handleMemberDelete = async () => {
        await axios.delete(`http://localhost:8000/members/${params.sub._id}`)
        window.location.reload()
    }


    // - Get color for avatar by fullname
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    // - Make avatar from string
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }



    return (
        <div className='subscription-card-div'>

            <div className='subscription-card-top-div'>
                <Avatar {...stringAvatar(params.sub.fullname)} />
                <strong className='subscription-card-top-fullname'>{params.sub.fullname}</strong>
                <table>
                    <tbody>
                        <tr>
                            <td><strong className='table-header-member'><AlternateEmailIcon fontSize='10px' />Email:</strong></td>
                            <td>{params.sub.email}</td>
                        </tr>
                        <tr>
                            <td><strong className='table-header-member'><LocationCityIcon fontSize='10px' />City:</strong></td>
                            <td>{params.sub.city}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='subscription-card-top-btn-line'>
                    <button className='icon-btn btn-edit' onClick={() => navigate(`/member/edit/${params.sub._id}`)}>
                        <EditIcon fontSize='10px' />
                    </button>
                    <button className='icon-btn btn-delete' onClick={handleMemberDelete}>
                        <DeleteIcon fontSize='10px' />
                    </button>
                </div>
            </div>

            <hr />

            <div className='subscription-card-new-sub-div'>
                <button className='btn new-sub-btn' onClick={() => setNewSubOpen(!newSubOpen)}><AddBoxIcon />Subscribe to new movie</button>
            </div>

            <div style={{ display: newSubOpen ? 'flex' : 'none' }} className='add-new-movie-div'>
                <span>Add a New Movie</span>
                <div className='add-new-movie-inputs-div'>
                    <select onChange={e => setNewMovieSubInp({ ...newMovieSubInp, movieId: e.target.value })} >
                        <option value=''>Select Movie</option>
                        {
                            params.movies.map(movie => params.sub.movies.find(m => m.movie._id === movie._id) ? null : <option key={movie._id} value={movie._id}>{movie.name}</option>)
                        }
                    </select>
                    <input onChange={e => setNewMovieSubInp({ ...newMovieSubInp, date: e.target.value })} type="date" />
                </div>
                <div className='add-new-movie-btns-div'>
                    <button className='btn' onClick={handleNewSubSubmit}>Subscribe</button>
                    <button className='btn' onClick={() => setNewSubOpen(!newSubOpen)}>Cancel</button>
                </div>
            </div>

            <div className='subscription-card-movie-watched-div'>
                <details className='subscription-card-movie-watched-details'>
                    <summary className='subscription-card-movie-watched-summary'>
                        <span>Watched Movies ({params.sub.movies.length})</span>
                    </summary>
                    <div className='subscription-card-sub-details-div'>

                        <table className='subscription-card-sub-table'>
                            <thead>
                                <tr className='subscription-card-sub-tr' key="title">
                                    <th>Movie</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    params.sub.movies.map(movie => {
                                        return (
                                            <tr className='subscription-card-sub-tr' key={movie?.id}>
                                                <td><Link className='link' to={`/movies?q=${movie?.movie?.name}`}>{movie?.movie?.name}</Link></td>
                                                <td>{movie.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </details>
            </div>

        </div>
    )
}

export default SubscriptionsCardComp