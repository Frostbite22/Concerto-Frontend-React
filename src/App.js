import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from 'react';


function NavBar(props) 
{
  function handleClick(title,setData,setTitle,setFormButton)
  {
      axios({
        method: "GET",
        url : `/${title}`
      })
      .then(res => {
        const model = res.data[`${title}`]
        setData(JSON.parse(JSON.stringify(model)));
      }) 
      setTitle(title);
      setFormButton(true);
  }

  const titles = props.titles ;
  return(
    <div className="topnav">
      {
        titles.map((title) => {
        return <a key={title} onClick={() => handleClick(title,props.setData,props.setTitle,props.setFormButton)}>{title}</a>
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
          
            <div key={element.id} className='formatData'>
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

function App() {
  
  const [data,setData] = useState([]);
  const [title, setTitle] = useState("") ;
  const [formButton,setFormButton] = useState(true);
  function handleOnClick(formButton)
  {
      setFormButton(!formButton);
  }
  return (
    <div className="App">
      <NavBar titles={["artists","venues","shows","genres"]} setData={setData} setTitle={setTitle} setFormButton={setFormButton}/>
      <div className="dataContainer" hidden={data==""? true : false}>
        <FormatGetData data={data}/>
      </div>
      <button className='btn' onClick={() => handleOnClick(formButton)}> {formButton===true ?`add ${title}`:"Hide" }</button>
      <form hidden={formButton}>
        <input type="text"  hidden={formButton}/>
      </form>
    </div>
  );
}

export default App;
