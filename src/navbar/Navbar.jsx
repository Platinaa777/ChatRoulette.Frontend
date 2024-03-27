import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import Sidebar from './sidebar/Sidebar';
import './Navbar.css'
import AuthMenu from "./authMenu/AuthMenu";

const Navbar = ({userSession, navigate}) => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(true)
    const hideSidebar = () => setSidebar(false)

    return (<IconContext.Provider value={{color: '#ffffff'}}>
        <div className='navbar'>
            <Link to='#' className='side-icon'>
                <FaBars onClick={showSidebar}/>
            </Link>
            <AuthMenu userSession={userSession} navigate={navigate}/>
        </div>
        <Sidebar active={sidebar} hide={hideSidebar}/>
    </IconContext.Provider>);
}

export default Navbar;