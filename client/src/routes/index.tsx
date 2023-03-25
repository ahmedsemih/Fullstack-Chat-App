import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute/>}>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/profile/edit' element={<ProfileEdit/>} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Index;