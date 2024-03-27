import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './menu/Main.jsx'
import Hub from './chat/components/Hub.jsx'
import NotFound from './menu/components/NotFound.jsx';
import SignUp from './auth/components/SignUp.jsx'
import Login from './auth/components/Login.jsx'
import WaitingRoom from './menu/components/WaitingRoom.jsx';


export default function App() {
    return (<BrowserRouter>
            <Routes>
                <Route exec path='/' element={<Main/>}/>
                <Route exec path='/SignUp' element={<SignUp/>}/>
                <Route exec path='/Login' element={<Login/>}/>
                <Route exec path='/hub' element={<Hub/>}/>
                <Route exec path='/waiting-room' element={<WaitingRoom/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>);
}
