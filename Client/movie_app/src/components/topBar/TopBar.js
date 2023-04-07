import './topBar.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlertDialog from '../alertDialog/AlertDialog';


function TopBarComp(params) {
	const navigate = useNavigate()
	const [fullname, setFullname] = useState('')
	const [showAlert, setShowAlert] = useState(false)

	// - Logout
	const logout = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	// - If the user is logged in, get user information
	const isLoggedIn = async () => {
		// - Get token from local storage
		const token = localStorage.getItem('token')
		if (token) {
			// - Check if the user is logged in by check the token
			try {
				const data = await axios.get('http://localhost:8000/login', {
					headers: { 'token': token }
				})
				
				// check status code
				if (data.status === 200) {
					localStorage.setItem('token', data.data.token)
					setFullname(data.data.userFullName)
                }
			}
			catch (error) {
				// - Show error message
				setShowAlert(true)
			}
		}
		else {
			// - If there is no token, redirect to login page
			navigate('/')
		}
	}


	useEffect(() => {
		isLoggedIn()
	}, [])


	return (
		<div className='top-bar-div'>
			<span>Movie App</span>
			{
				params.data ? (<div className="top-bar-r-div">
					<span className='top-bar-span'><AccountCircleIcon />{fullname}</span>
					<button onClick={logout} className='logout-btn'>Logout</button>
				</div>) : null
			}
			{showAlert ? <AlertDialog/> : null}
		</div>
	)
}

export default TopBarComp