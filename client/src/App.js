<<<<<<< HEAD
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
import Signup from './components/Signup';
import Signin from './components/Signin';
import { Provider } from 'react-redux';
import store from './redux/store';

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
        </Routes>
        <Footer />
      </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> 7985335e697b69230d6f4ea8acfb00a3ff5802f6
