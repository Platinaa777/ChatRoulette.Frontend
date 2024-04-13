import React from 'react';
import {Link} from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi";
import {SidebarPages} from '../../static/SidebarPages';
import './Sidebar.css'

const Sidebar = ({active, hide}) => {

    return (<nav className={active ? 'side-menu active' : 'side-menu'}>
        <ul className='side-menu-items'>
            <li className='sidebar-toggle'>
                <Link to='#' className='side-icon px-2.5'>
                    <BiArrowBack onClick={() => hide()}/>
                </Link>
            </li>
            {SidebarPages.map((item, index) => {
                return (<li key={index} className={`side-text`}>
                    <Link to={item.path} onClick={hide}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </li>)
            })}
        </ul>
    </nav>);
}

export default Sidebar;