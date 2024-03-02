import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Main} from './components/Main'
import {Hub} from './components/Hub'
import { NotFound } from './components/NotFound';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exec path='/' element={<Main />} />
            <Route exec path='/hub' element={<Hub />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
