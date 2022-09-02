import logo from './logo.svg';
import background from './music.jpg';
import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 


import NavBar from './components/NavBar';
import NavItem from './components/NavItem' ;


function App() {
  
  const [title, setTitle] = useState("") ;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={
          <div className='App'>
            <NavBar titles={["artists","venues","shows","genres"]} setTitle={setTitle}/>
            <img className='background' alt="background" src={background} hidden={title===""?false:true}/>
            {title!==""?<Outlet />:null}
          </div>
        }>
          <Route path={title}  element={ <NavItem title={title}/> }/>
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
