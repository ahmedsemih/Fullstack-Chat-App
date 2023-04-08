import { Routes, Route } from 'react-router-dom';
import AddFriend from '../pages/AddFriend';
import Channel from '../pages/Channel';
import Chat from '../pages/Chat';
import Create from '../pages/Create';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Register from '../pages/Register';
import Edit from '../pages/Edit';
import ProtectedRoute from './ProtectedRoute';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<ProtectedRoute/>}>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/profile/edit' element={<ProfileEdit/>} />
                <Route path='/create' element={<Create />} />
                <Route path='/addfriend' element={<AddFriend />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/channel' element={<Channel />} />
                <Route path='/edit' element={<Edit />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Index;