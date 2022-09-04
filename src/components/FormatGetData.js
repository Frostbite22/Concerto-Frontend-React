import {BrowserRouter, Routes, Route, Link ,  useLocation,Outlet, useNavigate, useParams} from 'react-router-dom' ; 
import axios from "axios";


function FormatGetData({data,title})
{
  let navigate = useNavigate()
  let location = useLocation() 
  function handleOnClick(id)
  {
    if(location.pathname === `/${title}`)
    navigate(`${id}`);
  }


  function handleOnClickButton(id)
  {
      axios({
        method: "POST",
        url : `/${title}/${id}/delete`
      })
      .then(res => {
        console.log(res)
        navigate(-1);
      }) 
  }

  return (
    <div>
    {
      data.map((element)=> {
        return (
          <>
            <div key={element.id} className="formatData" onClick={() => handleOnClick(element.id)}>
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
              { location.pathname === `/${title}s/${element.id}` ?
              <div>
                <button className='btn-delete' onClick={() => {handleOnClickButton(element.id)}}>delete</button>
              </div>
              :null
              }
            </div>
         </>
        )
      })
    }
  </div>

  )
}

export default FormatGetData