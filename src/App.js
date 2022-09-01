import logo from './logo.svg';
import background from './music.jpg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from 'react';


function NavBar(props) 
{
  
  const titles = props.titles ;
  return(
    <div className="topnav">
      {
        titles.map((title) => {
        return <a key={title} onClick={() => props.handleGet(title,props.setData,props.setTitle,props.setFormButton,props.setFields)}>{title}</a>
        })
      }
    </div>
    
  );
}

function FormatGetData({data})
{
  return (
    <div>
    {
      data.map((element)=> {
        return (
          <>
            <div key={element.id} className="formatData">
              {
                Object.entries(element).map( ([key,value]) => 
                { 
                  return (
                    
                    <div>
                      <span className='textSizeFont'>{key}</span> : <span className='valueColor'>{typeof value !== 'object'? value : Object.entries(value).map(([key,value])=> {
                        return(
                          <div>
                            {typeof value !== 'object' ? value : Object.entries(value).map(([key,value])=> {
                              return (
                                <div>
                                  <span className='textSizeFont'>{key}</span> : <span className='valueColor'>{value }</span>
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}</span>
                    </div>
                  )
                }
                ) 
              }
            </div>
         </>
        )
      })
    }
  </div>

  )
}

function FormComponent(props)
{
  const fieldsClean = props.fields.filter(field => field !== 'id')

  return(
    <form hidden={props.formButton} className="formLayout" onSubmit={props.handleSubmit}>
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

function App() {
  
  const [changed,setChanged] = useState(false);
  const [fields,setFields] = useState([]);
  const [data,setData] = useState([]);
  const [title, setTitle] = useState("") ;
  const [formButton,setFormButton] = useState(true);
  function handleOnClick(formButton)
  {
      setFormButton(!formButton);
  }

  function handleGet(title,setData,setTitle,setFormButton,setFields)
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
      setTitle(title);
      setFormButton(true);
  }

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
      url: `/create/${title.slice(0, -1)}`,
      data: newData,
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        setChanged(!changed);
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  

  return (
    <div className="App">
      <NavBar titles={["artists","venues","shows","genres"]} setData={setData} setTitle={setTitle} setFormButton={setFormButton} setFields={setFields} handleGet={handleGet}/>
      <img className='background' alt="background" src={background} hidden={data==""? false : true}/>
      <div className="dataContainer" hidden={data==""? true : false}>
        <FormatGetData data={data}/>
      </div>
      <button className='btn' hidden={data==""? true : false} onClick={() => handleOnClick(formButton)}> {formButton===true ?`add ${title}`:"Hide" }</button>
      <FormComponent fields={fields} formButton={formButton} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
