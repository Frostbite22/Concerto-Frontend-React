import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 



function NavBar(props) 
{
  
  const titles = props.titles ;
  let navigate = useNavigate();

  return(
    <div className="topnav">
      {
        titles.map((title) => {
        return <a key={title} onClick={() => {
          props.setTitle(title);
          navigate(title);
        }
        }>{title}</a>
        })
      }
    </div>
    
  );
}

export default NavBar ;