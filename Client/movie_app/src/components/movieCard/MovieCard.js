import './movieCard.css';
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';

function MovieCardComp(params) {
	const navigate = useNavigate();

	// - Delete Movie
	const deleteMovie = async () => {
		const { data } = await axios.delete(`http://localhost:8000/movies/${params.movie._id}`)
		window.location.reload()
	}


	return (
		<div className='movie-card-div'>
			<div className='movie-card' style={{ backgroundImage: 'url(' + params.movie.img + ')' }}>
				<div className='movie-card-content'>
					<span className='movie-card-name'>{params.movie.name}</span>
				</div>
			</div>
			<div className='movie-card-bottom'>
				<div className='movie-card-data'>
					<span className='movie-card-yearPremiered'>{params.movie.yearPremiered}</span>
					<span>|</span>

					<div className='movie-card-genres'>
						{
							params.movie.genres.map((genre) => {
								return <span className='genre-span' key={genre}>{genre}</span>
							})
						}
					</div>
				</div>

				<div className='movie-card-btns'>
					<button className="icon-btn btn-edit" onClick={() => navigate(`/movies/edit/${params.movie._id}`)}>
						<EditIcon fontSize='10px' />
					</button>
					<button className="icon-btn btn-delete" onClick={deleteMovie}>
						<DeleteIcon fontSize='10px' />
					</button>
				</div>

				<div className='movie-card-subscriptions'>
					<details open={false}>
						<summary className='movie-card-subscriptions-summary'>
							Subscriptions ({params.movie.subscriptions.length})
						</summary>
						<div style={{display: params.movie.subscriptions.length ? 'flex' : 'none'}} className='movie-card-sub-details-div'>

							<table className='movie-card-sub-table'>
								<thead>
									<tr className='movie-card-sub-tr' key="title">
										<th>Member</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{
										params.movie.subscriptions.map(sub => {
											return (
												<tr className='movie-card-sub-tr' key={sub._id}>
													<td><Link className='link' to={`/member/edit/${sub.member._id}`}>{sub.member.fullname}</Link></td>
													<td>{sub.date}</td>
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
		</div>
	)
}

export default MovieCardComp