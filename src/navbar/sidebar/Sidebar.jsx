import React from 'react';
import {Link} from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi";
import {SidebarData} from './SidebarData';
import './Sidebar.css'

const Sidebar = ({active, hide}) => {

    return (
            <nav className={active ? 'side-menu active' : 'side-menu'}>
                <ul className='side-menu-items'>
                    <li className='sidebar-toggle'>
                        <Link to='#' className='side-icon'>
                            <BiArrowBack onClick={() => hide()}/>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (<li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>)
                    })}
                </ul>
            </nav>);
}

export default Sidebar;