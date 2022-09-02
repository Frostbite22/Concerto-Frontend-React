
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

export default FormatGetData