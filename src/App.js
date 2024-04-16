import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import Main from './pages/menu/Main.jsx'
import Hub from './pages/chat/Hub.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import SignIn from './pages/auth/SignIn.jsx'
import WaitingRoom from './pages/menu/components/WaitingRoom.jsx';
import NotFound from './pages/menu/components/NotFound.jsx';
import Navbar from "./navbar/Navbar";
import { paths } from "./static/Paths";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/friends/Friends";
import ReportProblem from './pages/report/ReportProblem.jsx';
import Moderation from './pages/admin_pages/Moderation.jsx';
import SiteStats from './pages/admin_pages/SiteStats.jsx';
import { useUser } from './http/context/UserContext.js';


export default function App() {
    const {userSession} = useUser();

    return (<>
        <Navbar/>
        <div className="container">
            <Routes>
                <Route exec path={paths.mainPath} element={<Main/>}/>
                <Route exec path={paths.signUpPath} element={<SignUp/>}/>
                <Route exec path={paths.signInPath} element={<SignIn/>}/>
                <Route exec path={paths.profilePath} element={userSession.IsAuth ? <Profile/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.friendsPath} element={userSession.IsAuth ? <Friends/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.reportPath} element={userSession.IsAuth ? <ReportProblem/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.moderationPath} element={userSession.IsAuth /* && userSession.IsAdmin */ ? <Moderation/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.statsPath} element={userSession.IsAuth /* && userSession.IsAdmin */ ? <SiteStats/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.hubPath} element={userSession.IsAuth ? <Hub/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route exec path={paths.waitingRoomPath} element={userSession.IsAuth ? <WaitingRoom/> : <Navigate replace to={paths.mainPath}/>}/>
                <Route path={paths.notFoundPath} element={<NotFound/>}/>
            </Routes>
        </div>
    </>);
}
