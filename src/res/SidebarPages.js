import {AiFillHome, AiFillProfile} from "react-icons/ai";
import {mainPath, profilePath} from "./Paths";

export const SidebarPages = [
    {title: 'Home', path: mainPath, icon: <AiFillHome/>, cName: 'side-text'},
    {title: 'Profile', path: profilePath, icon: <AiFillProfile/>, cName: 'side-text'}
]