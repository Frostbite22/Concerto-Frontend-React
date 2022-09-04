import axios from "axios";
import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate} from 'react-router-dom' ; 


function FormComponent(props)
{

  let navigate = useNavigate() ;

  //here to add update function 
  /////////////////////////////
  
  function handleCreate(event)
  {
    const newData = {} ; 
    for (let i = 0 ; i <event.target.elements.length; i++)
    {
      newData[event.target.elements[i].id] = event.target.elements[i].value ;
    }


    axios({
      method: "post",
      url: `/create/${props.title.slice(0, -1)}`,
      data: newData,
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        navigate(-1);
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
      });
  }
  const fieldsClean = props.fields.filter(field => field !== 'id')

  return(
    <form hidden={props.formButton } className="formLayout" onSubmit={handleCreate} >
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

export default FormComponent ;