import React, { useState } from 'react'
import { PiUserCircleDuotone } from 'react-icons/pi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { BiSolidUserCircle } from 'react-icons/bi';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";

const AdminProfileDropDown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    let navigate = useNavigate();

    const profileDropdown = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const profileDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        profileDropdownClose();
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div>
            <PiUserCircleDuotone
                onClick={profileDropdown}
                size={40}
                className="transition ease-in-out hover:text-[#2E3A8C] hover:duration-300" />

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={profileDropdownClose}
            >
                <MenuItem onClick={profileDropdownClose}>
                    <BiSolidUserCircle size={22} className='mr-2' />
                    Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <RiLogoutCircleRLine size={20} color='red' className='mr-2' />
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default AdminProfileDropDown
