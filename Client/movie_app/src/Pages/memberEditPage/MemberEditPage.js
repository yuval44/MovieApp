import React, { useState, useEffect } from 'react'
import TopBarComp from '../../components/topBar/TopBar'
import NavMenuComp from '../../components/navMenu/NavMenu'
import SubscriptionsMenuComp from '../../components/subscriptionsMenu/SubscriptionsMenu'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function MemberEditPageComp() {
    // - Get the member id from the url
    const { id } = useParams();

    const navigate = useNavigate();

    const [editMemberInp, setEditMemberInp] = useState({
        fullname: '',
        email: '',
        city: '',
    })

    const [memberFullname, setMemberFullname] = useState('');

    // - Get the member from the database
    const getMember = async () => {
        const { data } = await axios.get(`http://localhost:8000/members/${id}`)
        setEditMemberInp({ ...data })
        setMemberFullname(data.fullname)
    }

    // - UseEffect to get the member from the database
    useEffect(() => {
        getMember()
    }, [id])

    // - Update the member in the database
    const handleSave = () => {
        axios.put(`http://localhost:8000/members/${id}`, editMemberInp)
        navigate('/subscriptions')
    }



    return (
        <div>
            <div>
                <div className='member-edit-page'>
                    <TopBarComp data={true} />
                    <NavMenuComp />
                    <SubscriptionsMenuComp />
                    <br />

                    <div className='add-edit-form-div'>
                        <span className='add-edit-form-title'>Edit Member: {editMemberInp.fullname}</span>

                        <div className="add-edit-form">
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMemberInp.fullname} onChange={e => setEditMemberInp({ ...editMemberInp, fullname: e.target.value })} id="input-with-sx" label="Fullname" variant="standard" />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMemberInp.email} onChange={e => setEditMemberInp({ ...editMemberInp, email: e.target.value })} id="input-with-sx" label="Email" variant="standard" />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField value={editMemberInp.city} onChange={e => setEditMemberInp({ ...editMemberInp, city: e.target.value })} id="input-with-sx" label="City" variant="standard" />
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
        </div>
    )
}

export default MemberEditPageComp