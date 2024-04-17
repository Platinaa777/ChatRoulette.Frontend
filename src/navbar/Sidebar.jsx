import React, { useRef, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi";
import {SidebarPages} from '../static/SidebarPages';
import { useUser } from '../http/context/UserContext';

const Sidebar = ({active, hide}) => {

    const {userSession} = useUser();

    const checkDisplay = (requireAuth, requireAdmin) => {

        if (requireAuth) {
            if (requireAdmin) {
                return userSession.getInfo() === 'Admin';
            }
            return userSession.IsAuth;
        }
        return true;
    }

    return (<nav className={"bg-gradient-to-b from-indigo-950 to-violet-800 w-60 h-[100vh] flex justify-center fixed top-0 z-20 duration-700" + (active ? " left-0" : " left-[-100%]")}>
        <ul className='p-0 w-full'>
            <li className='w-full h-20 flex justify-start items-center'>
                <Link to='#' className='rounded-md text-2xl mx-6 bg-none hover:bg-indigo-800 box-border p-2' onClick={() => hide()}>
                    <BiArrowBack/>
                </Link>
            </li>
            {SidebarPages.map((item, index) => {
                return (checkDisplay(item.requireAuth, item.requireAdmin) && <li key={index} className="flex justify-start items-center ml-3 box-border list-none h-10">
                    <NavLink to={item.path} onClick={hide} className='flex items-center rounded-md w-[95%] h-full text-[18px] text-white hover:bg-indigo-800'>
                        {item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                </li>)
            })}
        </ul>
    </nav>);
}

export default Sidebar;