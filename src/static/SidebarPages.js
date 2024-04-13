import {AiFillHome, AiFillProfile} from "react-icons/ai";
import {friendsPath, mainPath, profilePath, reportPath, statsPath} from "./Paths";
import {GiHand} from "react-icons/gi";
import { MdReport } from "react-icons/md";
import { BiStats } from "react-icons/bi";

export const SidebarPages = [
    {title: 'Home', path: mainPath, icon: <AiFillHome/>, admin: false},
    {title: 'Profile', path: profilePath, icon: <AiFillProfile/>, admin: false},
    {title: 'Friends', path: friendsPath, icon: <GiHand/>, admin: false},
    {title: 'Report Problem', path: reportPath, icon: <MdReport/>, admin: false},
    {title: 'Site Stats', path: statsPath, icon: <BiStats/>, admin: true}
]