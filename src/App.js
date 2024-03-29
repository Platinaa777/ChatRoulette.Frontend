import './App.css';
import {Route, Routes} from 'react-router-dom'
import Main from './pages/menu/Main.jsx'
import Hub from './pages/chat/components/Hub.jsx'
import SignUp from './pages/auth/components/SignUp.jsx'
import SignIn from './pages/auth/components/SignIn.jsx'
import WaitingRoom from './pages/menu/components/WaitingRoom.jsx';
import NotFound from './pages/menu/components/NotFound.jsx';
import Navbar from "./navbar/Navbar";
import * as Paths from "./res/Paths";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/friends/Friends";


export default function App() {
    return (<>
        <Navbar/>
        <div className="container">
            <Routes>
                <Route exec path={Paths.mainPath} element={<Main/>}/>
                <Route exec path={Paths.signUpPath} element={<SignUp/>}/>
                <Route exec path={Paths.signInPath} element={<SignIn/>}/>
                <Route exec path={Paths.profilePath} element={<Profile/>}/>
                <Route exec path={Paths.friendsPath} element={<Friends/>}/>
                <Route exec path={Paths.hubPath} element={<Hub/>}/>
                <Route exec path={Paths.waitingRoomPath} element={<WaitingRoom/>}/>
                <Route path={Paths.notFoundPath} element={<NotFound/>}/>
            </Routes>
        </div>
    </>);
}
