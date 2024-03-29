import {AiFillHome, AiFillProfile} from "react-icons/ai";
import {friendsPath, mainPath, profilePath} from "./Paths";
import {GiHand} from "react-icons/gi";

export const SidebarPages = [
    {title: 'Home', path: mainPath, icon: <AiFillHome/>, cName: 'side-text'},
    {title: 'Profile', path: profilePath, icon: <AiFillProfile/>, cName: 'side-text'},
    {title: 'Friends', path: friendsPath, icon: <GiHand/>, cName: 'side-text'},
]