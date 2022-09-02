import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 

import FormatGetData from "./FormatGetData";
import FormComponent from "./FormComponent";
import axios from "axios";


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
    <FormComponent fields={fields} title={title} setTitle={props.setTitle} formButton={formButton} />
    </>

  );
}
export default NavItem ; 