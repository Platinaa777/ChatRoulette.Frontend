import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Sidebar from './Sidebar';
import { observer } from 'mobx-react-lite';
import { useUser } from '../pages/auth/context/UserContext';
import { BsPerson } from "react-icons/bs";
import { paths } from "../static/Paths";
import { useProfile } from '../pages/profile/context/ProfileContext';

const Navbar = () => {
    const { userSession } = useUser();
    const { userProfile } = useProfile();

    const [authMenu, setAuthMenu] = useState(false);
    const authMenuRef = useRef();

    useEffect(() => {
        function handler(event) {
            if (!authMenuRef.current?.contains(event.target)) {
                setAuthMenu(false);
            }
            if (!sidebarRef.current?.contains(event.target)) {
                setSidebar(false);
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, []);

    useEffect(() => {
        if (userSession.IsAuth) {
            let email = localStorage.getItem("email");
            let response = userProfile.getProfile(email);
        } else {
            console.log("user is not auth");
        }
    }, [userSession.IsAuth]);

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(true);
    const hideSidebar = () => setSidebar(false);
    const sidebarRef = useRef();

    return (<IconContext.Provider value={{ color: '#ffffff' }}>
        <div className='flex fixed bg-indigo-800 h-[3.75rem] w-[calc(100%-16px)] m-2 items-center justify-between z-1'>
            <div className='flex items-center'>
                <Link ref={sidebarRef} to='#' className='rounded-md text-2xl mx-4 p-2 bg-none hover:bg-indigo-600' onClick={showSidebar}>
                    <FaBars />
                </Link>
                {/** App Icon */}
                <p className='block w-[12rem] text-white text-xl'>LangSkillUp</p>
            </div>
            <button ref={authMenuRef} className="user-nick flex justify-start items-center min-w-40 px-4 text-xl text-white" onClick={() => setAuthMenu(!authMenu)}>
                <BsPerson />
                <p className='mx-4'>{userSession.IsAuth ? userProfile.user.userName : 'Guest'}</p>
            </button>
        </div>
        <Sidebar active={sidebar} hide={hideSidebar} />
        <div className={`absolute z-20 ${authMenu ? "flex" : "hidden"} flex-col right-2 top-[4.25rem] bg-indigo-50 text-indigo-950`}>
            {userSession.IsAuth &&
                <Link className='py-3 px-4 min-w-40 hover:bg-indigo-100' to={paths.mainPath} onClick={async () => await userSession.logout()}>Sign out</Link>}
            {!userSession.IsAuth &&
                <Link className='py-3 px-4 min-w-40 hover:bg-indigo-100' to={paths.signInPath}>Sign in</Link>}
            {!userSession.IsAuth &&
                <Link className='py-3 px-4 min-w-40 hover:bg-indigo-100' to={paths.signUpPath}>Sign up</Link>}
        </div>
    </IconContext.Provider >);
}

export default observer(Navbar);