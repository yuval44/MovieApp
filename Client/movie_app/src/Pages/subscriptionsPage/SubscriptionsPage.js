import React, { useState, useEffect } from 'react'
import NavMenuComp from '../../components/navMenu/NavMenu'
import TopBarComp from '../../components/topBar/TopBar'
import SubscriptionsMenuComp from '../../components/subscriptionsMenu/SubscriptionsMenu'
import axios from 'axios'
import SubscriptionsCardComp from '../../components/subscriptionCard/SubscriptionsCard'


function SubscriptionsPageComp() {
    const [subscriptions, setSubscriptions] = useState([])
    const [movies, setMovies] = useState([])

    // - Get Subscriptions
    const getSubscriptions = async () => {
        try {
            const {data} = await axios.get('http://localhost:8000/subscriptions')
            setSubscriptions(data)
        } catch (error) {
            console.log(error)
        }
    }

    // - Get All movies
    const getAllMovies = async () => {
        try {
            const {data} = await axios.get('http://localhost:8000/movies')
            setMovies(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getSubscriptions()
        getAllMovies()
    }, [])




    return (
        <div className='movies-page'>
            <TopBarComp data={true} />
            <NavMenuComp />
            <SubscriptionsMenuComp />

            <div className='movies-section-cards'>
                {
                    subscriptions.map(sub => {
                        return <SubscriptionsCardComp key={sub._id} movies={movies} sub={sub} />
                    })
                }
            </div>

        </div>
    )
}

export default SubscriptionsPageComp