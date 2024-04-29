import { AiFillHome, AiFillProfile } from "react-icons/ai";
import { paths } from "./Paths";
import { GiHand } from "react-icons/gi";
import { MdReport } from "react-icons/md";
import { BiShield } from "react-icons/bi";

export const SidebarPages = [
    {
        title: 'Home',
        path: paths.mainPath,
        icon: <AiFillHome className="rounded-md text-2xl bg-none mx-3" />,
        requireAuth: false,
        requireAdmin: false,
    },
    { 
        title: 'Profile', 
        path: paths.profilePath, 
        icon: <AiFillProfile className="rounded-md text-2xl bg-none mx-3" />, 
        requireAuth: true,
        requireAdmin: false
    },
    { 
        title: 'Friends', 
        path: paths.friendsPath, 
        icon: <GiHand className="rounded-md text-2xl bg-none mx-3" />, 
        requireAuth: true,
        requireAdmin: false
    },
    { 
        title: 'Report Problem', 
        path: paths.reportPath, 
        icon: <MdReport className="rounded-md text-2xl bg-none mx-3" />, 
        requireAuth: true,
        requireAdmin: false
    },
    { 
        title: 'Moderation', 
        path: paths.moderationPath, 
        icon: <BiShield className="rounded-md text-2xl bg-none mx-3" />, 
        requireAuth: true,
        requireAdmin: true
    }
]