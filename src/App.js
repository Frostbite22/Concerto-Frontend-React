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
            <Outlet />
          </div>
        }>
          <Route index element={
            <img className='background' alt="background" src={background} />
          } />
          <Route path="genres" element={ <NavItem title="genres" /> }/>
          <Route path="genres/:genre_id" element={ <NavItem title="genre" /> }/>

          <Route path="venues" element={ <NavItem title="venues" /> }/>
          <Route path="venues/:venue_id" element={ <NavItem title="venue" /> }/>

          <Route path="artists" element={ <NavItem title="artists" /> }/>
          <Route path="artists/:artist_id" element={ <NavItem title="artist" /> }/>

          <Route path="shows" element={ <NavItem title="shows" /> }/>
          <Route path="shows/:show_id" element={ <NavItem title="show" /> }/>


        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
