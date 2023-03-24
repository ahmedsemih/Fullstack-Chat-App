import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute/>}>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile/>} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Index;