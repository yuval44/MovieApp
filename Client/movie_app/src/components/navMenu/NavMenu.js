import './navMenu.css';
import React from 'react'
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";


function NavMenuComp() {
    const navigate = useNavigate();


    return (
        <div className='nav-menu-div'>
            <span onClick={() => navigate('/movies')}><LiveTvIcon />Movies</span>
            <span onClick={() => navigate('/subscriptions')}><SubscriptionsIcon />Subscriptions</span>
            {/* <span><ManageAccountsIcon />User Management</span> */}
        </div>
    )
}

export default NavMenuComp