import './LoginPage.css';
import React, { useState, useEffect } from 'react'
import TopBarComp from '../../components/topBar/TopBar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';


function LoginPageComp() {
	const navigate = useNavigate()
	const [userInp, setUserInp] = useState({ username: '', password: '' })
	const [errorLogin, setErrorLogin] = useState({ status: false, message: '' })

	// - Handle Login
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			// - Send Request with User credentials
			const res = await axios.post('http://localhost:8000/login', userInp)

			// - Check if the login was successful
			if (res.status === 200) {
				localStorage.setItem('token', res.data.token)
				navigate('/movies')
			}

		}
		catch (error) {
			setErrorLogin({ status: true, message: error.response.data.message })
		}
	}

	// - If the user is logged in, redirect to the movies page
	const isLoggedIn = async () => {
		// - Get the token from local storage
		const token = localStorage.getItem('token')

		// - Check if the token exists
		if (token) {
			// - Check if the user is logged in by check the token
			try {
				const { status } = await axios.get('http://localhost:8000/login', { headers: { 'token': token } })

				// check status code
				if (status === 200) { navigate('/movies') }
			}
			catch (error) { localStorage.clear() }
		}

		// - If the token is not found, clear the local storage
		localStorage.clear()
	}

	// - If the user is logged in, redirect to the movies page
	useEffect(() => {
		isLoggedIn()
	}, [])



	return (
		<div className='login-div'>

			<div className='left-img-login'>
				<div className='left-img-login-color'></div>
			</div>

			<div className='login-form'>
				<form className='login-form' onSubmit={(e) => handleLogin(e)}>
					<span className='login-title-text'>Login</span>
					<div className='input-style'>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							<TextField onChange={e => setUserInp({ ...userInp, 'username': e.target.value })} id="input-with-sx" label="Username" variant="standard" />
						</Box>
					</div>
					<div className='input-style'>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							<TextField onChange={e => setUserInp({ ...userInp, 'password': e.target.value })} id="input-with-sx-password" label="Password" type='password' variant="standard" />
						</Box>
					</div>
					{errorLogin.status ? <Alert severity="error">Username Or Password Incorect<br />{errorLogin.message}</Alert> : null}
					<button className='btn'>Login</button>
				</form>
			</div>

		</div>
	)
}

export default LoginPageComp