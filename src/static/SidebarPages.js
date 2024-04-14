import {AiFillHome, AiFillProfile} from "react-icons/ai";
import {friendsPath, mainPath, profilePath, reportPath, statsPath} from "./Paths";
import {GiHand} from "react-icons/gi";
import { MdReport } from "react-icons/md";
import { BiStats } from "react-icons/bi";

export const SidebarPages = [
    {title: 'Home', path: mainPath, icon: <AiFillHome className="rounded-md text-2xl bg-none mx-3"/>, admin: false},
    {title: 'Profile', path: profilePath, icon: <AiFillProfile className="rounded-md text-2xl bg-none mx-3"/>, admin: false},
    {title: 'Friends', path: friendsPath, icon: <GiHand className="rounded-md text-2xl bg-none mx-3"/>, admin: false},
    {title: 'Report Problem', path: reportPath, icon: <MdReport className="rounded-md text-2xl bg-none mx-3"/>, admin: false},
    {title: 'Site Stats', path: statsPath, icon: <BiStats className="rounded-md text-2xl bg-none mx-3"/>, admin: true}
]