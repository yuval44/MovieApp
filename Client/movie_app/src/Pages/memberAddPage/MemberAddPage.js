import React, { useState } from 'react'
import TopBarComp from '../../components/topBar/TopBar'
import NavMenuComp from '../../components/navMenu/NavMenu'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SubscriptionsMenuComp from '../../components/subscriptionsMenu/SubscriptionsMenu';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationCityIcon from '@mui/icons-material/LocationCity';


function MemberAddPageComp() {
    const navigate = useNavigate();

    const [newMemberInp, setNewMemberInp] = useState({
        fullname: '',
        email: '',
        city: '',
    })

    // - Handle click event on add member save button
    const handleSave = () => {
        axios.post('http://localhost:8000/members', newMemberInp)
        navigate('/subscriptions')
    }


    return (
        <div>
            <div className='member-add-page'>
                <TopBarComp data={true} />
                <NavMenuComp />
                <SubscriptionsMenuComp />
                <br />

                <div className='add-edit-form-div'>
                    <span className='add-edit-form-title'>Add New Member</span>

                    <div className="add-edit-form">
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField value={newMemberInp.fullname} onChange={e => setNewMemberInp({ ...newMemberInp, fullname: e.target.value })} id="input-with-sx" label="Fullname" variant="standard" />
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField value={newMemberInp.email} onChange={e => setNewMemberInp({ ...newMemberInp, email: e.target.value })} id="input-with-sx" label="Email" variant="standard" />
                            </Box>
                        </div>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField value={newMemberInp.city} onChange={e => setNewMemberInp({ ...newMemberInp, city: e.target.value })} id="input-with-sx" label="City" variant="standard" />
                            </Box>
                        </div>
                    </div>

                    <div className="add-edit-form-btn-div">
                        <button className='btn' onClick={handleSave}>Save</button>
                        <button className='btn' onClick={() => navigate('/subscriptions')}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MemberAddPageComp