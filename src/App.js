import logo from './logo.svg';
import background from './music.jpg';
import './App.css';
import axios from "axios";
import {useEffect, useState, Component} from 'react';
import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 

import  FormatGetData from "./components/FormatGetData";






function FormComponent(props)
{

  function handleSubmit(event)
  {
    const newData = {} ; 
    for (let i = 0 ; i <event.target.elements.length; i++)
    {
      newData[event.target.elements[i].id] = event.target.elements[i].value ;
    }

    console.log(newData)
    axios({
      method: "post",
      url: `/create/${props.title.slice(0, -1)}`,
      data: newData,
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
      });
  }
  const fieldsClean = props.fields.filter(field => field !== 'id')

  return(
    <form hidden={props.formButton} className="formLayout" onSubmit={handleSubmit}>
      {
        fieldsClean.map((field) => {
          return(
            <label htmlFor={field} hidden={props.formButton}>{field} 
            <input type="text" id={field} hidden={props.formButton}/>
            </label>
          )
        })
      }
    <input type="submit" value="Submit" className='btn'/>

  </form>

  );
}
function NavItem(props)
{
  const [fields,setFields] = useState([]);
  const [data,setData] = useState([]);
  const [formButton,setFormButton] = useState(true);


  const title = props.title ; 


  function handleOnClick(formButton)
  {
      setFormButton(!formButton);
  }

  function handleGet(title)
  {
      axios({
        method: "GET",
        url : `/${title}`
      })
      .then(res => {
        const cleanFields = []
        const model = res.data[`${title}`];
        Object.entries(model[0]).map(([key,value])=> {
          cleanFields.push(key); 
        })
        setFields(cleanFields);
        setData(JSON.parse(JSON.stringify(model)));
      }) 
  }

  
  useEffect(()=> handleGet(title),[title])
  
  
  
  return(
    <>
    <div className="dataContainer" hidden={data==""? true : false}>
      <FormatGetData data={data}/>
    </div>
    <button className='btn' hidden={data==""? true : false} onClick={() => handleOnClick(formButton)}> {formButton===true ?`add ${title}`:"Hide" }</button>
    <FormComponent fields={fields} title={title} formButton={formButton} />
    </>

  );
}


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
