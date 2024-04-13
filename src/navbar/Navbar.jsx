import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Sidebar from './sidebar/Sidebar';
import './Navbar.css'
import AuthMenu from "./authmenu/AuthMenu";
import { observer } from 'mobx-react-lite';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(true)
    const hideSidebar = () => setSidebar(false)

    return (<IconContext.Provider value={{ color: '#ffffff' }}>
        <div className='navbar'>
            <div className='flex items-center'>
                <Link to='#' className='side-icon'>
                    <FaBars onClick={showSidebar} />
                </Link>
                {/** App Icon */}
                <p className='block w-[12rem] text-white text-xl'>LangSkillUp</p>
            </div>
            <AuthMenu />
        </div>
        <Sidebar active={sidebar} hide={hideSidebar} />
    </IconContext.Provider>);
}

export default observer(Navbar);