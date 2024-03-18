import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Main} from './menu/components/Main'
import {Hub} from './chat/components/Hub'
import { NotFound } from './menu/components/NotFound';
import {SignUp} from './auth/components/SignUp'


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exec path='/' element={<Main />} />
            <Route exec path='/SignUp' element={<SignUp />} />
            <Route exec path='/hub' element={<Hub />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
