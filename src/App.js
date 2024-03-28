import './App.css';
import {Route, Routes} from 'react-router-dom'
import Main from './menu/Main.jsx'
import Hub from './chat/components/Hub.jsx'
import SignUp from './auth/components/SignUp.jsx'
import SignIn from './auth/components/SignIn.jsx'
import WaitingRoom from './menu/components/WaitingRoom.jsx';
import NotFound from './menu/components/NotFound.jsx';
import Navbar from "./navbar/Navbar";
import * as Paths from "./res/Paths";


export default function App() {
    return (<>
        <Navbar/>
        <Routes>
            <Route exec path={Paths.mainPath} element={<Main/>}/>
            <Route exec path={Paths.signUpPath} element={<SignUp/>}/>
            <Route exec path={Paths.signInPath} element={<SignIn/>}/>
            <Route exec path={Paths.hubPath} element={<Hub/>}/>
            <Route exec path={Paths.waitingRoomPath} element={<WaitingRoom/>}/>
            <Route path={Paths.notFoundPath} element={<NotFound/>}/>
        </Routes>
    </>);
}
