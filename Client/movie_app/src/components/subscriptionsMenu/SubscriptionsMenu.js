import React from 'react'
import { useNavigate } from 'react-router-dom'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import AddIcon from '@mui/icons-material/Add';

function SubscriptionsMenuComp() {
    const navigate = useNavigate()


    return (
        <div className='top-div-page'>
            <div className='small-menu-div'>
                <span className='page-title-text'>Subsciptions</span>
                <div className='movies-btns-div'>
                    <button className='btn' onClick={() => navigate('/subscriptions')}>
                        <BorderAllIcon />All Members
                    </button>
                    <button className='btn' onClick={() => navigate('/member/add')}>
                        <AddIcon />Add Members
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionsMenuComp