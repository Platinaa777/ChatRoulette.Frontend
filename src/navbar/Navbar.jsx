import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Sidebar from './Sidebar';
import { observer } from 'mobx-react-lite';
import { useUser } from '../pages/auth/context/UserContext';
import { BsPerson } from "react-icons/bs";
import { mainPath, signInPath, signUpPath } from "../static/Paths";

const Navbar = () => {
    const { userSession } = useUser();

    const [clicked, setClicked] = useState();

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(true)
    const hideSidebar = () => setSidebar(false)

    return (<IconContext.Provider value={{ color: '#ffffff' }}>
        <div className='flex fixed bg-indigo-800 h-[3.75rem] w-[calc(100%-16px)] m-2 items-center justify-between z-1'>
            <div className='flex items-center'>
                <Link to='#' className='rounded-md text-2xl mx-4 p-2 bg-none hover:bg-indigo-600' onClick={showSidebar}>
                    <FaBars />
                </Link>
                {/** App Icon */}
                <p className='block w-[12rem] text-white text-xl'>LangSkillUp</p>
            </div>
            <button className="flex justify-evenly items-center min-w-40 text-2xl text-white" onClick={() => setClicked(!clicked)}>
                <BsPerson className="user-icon" />
                {userSession.IsAuth ? userSession.user.email : 'Guest'}
            </button>
        </div>
        <Sidebar active={sidebar} hide={hideSidebar} />
        {clicked && <div className="absolute z-10 flex flex-col right-2 top-[4.25rem] bg-indigo-50 text-indigo-950 min-w-40">
            {userSession.IsAuth && <li className='h-10'>
                <Link className='py-3 px-4 hover:bg-indigo-100' to={mainPath} onClick={async () => await userSession.logout()}>Sign out</Link>
            </li>}
            {!userSession.IsAuth && 
                <Link className='py-3 px-4 min-w-40 hover:bg-indigo-100' to={signInPath}>Sign in</Link>}
            {!userSession.IsAuth && 
                <Link className='py-3 px-4 min-w-40 hover:bg-indigo-100' to={signUpPath}>Sign up</Link>}
        </div>}
    </IconContext.Provider>);
}

export default observer(Navbar);