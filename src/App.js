import './App.css';
import {Route, Routes} from 'react-router-dom'
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


export default function App() {
    return (<>
        <Navbar/>
        <div className="container">
            <Routes>
                <Route exec path={paths.mainPath} element={<Main/>}/>
                <Route exec path={paths.signUpPath} element={<SignUp/>}/>
                <Route exec path={paths.signInPath} element={<SignIn/>}/>
                <Route exec path={paths.profilePath} element={<Profile/>}/>
                <Route exec path={paths.friendsPath} element={<Friends/>}/>
                <Route exec path={paths.reportPath} element={<ReportProblem/>}/>
                <Route exec path={paths.hubPath} element={<Hub/>}/>
                <Route exec path={paths.waitingRoomPath} element={<WaitingRoom/>}/>
                <Route path={paths.notFoundPath} element={<NotFound/>}/>
            </Routes>
        </div>
    </>);
}
