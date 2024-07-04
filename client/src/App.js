import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';
import Member from './pages/member/Member';
import Research from './pages/research/Research';
import Contact from './pages/contact/Contact';
import Board from './pages/board/Board';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/member' element={<Member/>} />
          <Route path='/research' element={<Research/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/board' element={<Board/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;