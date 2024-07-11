import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

import Signup from './components/Signup';
import Signin from './components/Signin';
import ScrollToTop from './utils/ScrollToTop';

import Member from './pages/member/Member';
import Research from './pages/research/Research';
import Contact from './pages/contact/Contact';
import Board from './pages/board/BoardHome';

import Profile from './pages/mypage/Profile';
import PwdforUpdate from './pages/mypage/PwdforUpdate';
import ProfileUpdate from './pages/mypage/ProfileUpdate';

import { Provider } from 'react-redux';
import store from './redux/store';
import PostsSave from './pages/board/PostSave';
import PostPage from './pages/board/PostPage';
import PostUpdate from './pages/board/PostUpdate';

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home/>} />

          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>

          <Route path='/member' element={<Member/>} />
          <Route path='/research' element={<Research/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/board' element={<Board/>} />
          <Route path="/posts/:id" element={<PostPage/>} />
          <Route path='/post/save' element={<PostsSave/>}/>
          <Route path='/post/update' element={<PostUpdate/>}/>

          <Route path='/profile' element={<Profile/>} />
          <Route path='/pwdforupdate' element={<PwdforUpdate />} />
          <Route path='/profile' element={<ProfileUpdate/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
