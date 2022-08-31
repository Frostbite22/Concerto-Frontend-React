import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from 'react';


function NavBar(props) 
{
  function handleClick(title,setData)
  {
      axios({
        method: "GET",
        url : `/${title}`
      })
      .then(res => {
        const model = res.data[`${title}`]
        setData(JSON.parse(JSON.stringify(model)));
      }) 
  }

  const titles = props.titles ;
  return(
    <div className="topnav">
      {
        titles.map((title) => {
        return <a key={title} onClick={() => handleClick(title,props.setData)}>{title}</a>
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
                      <span className='textSizeFont'>{key}</span> : <span className='valueColor'>{typeof value !== 'object'? value : null}</span>
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

  return (
    <div className="App">
      <NavBar titles={["artists","venues","shows","genres"]} setData={setData} />
      <div className="dataContainer">
        <FormatGetData data={data}/>
      </div>
    </div>
  );
}

export default App;
