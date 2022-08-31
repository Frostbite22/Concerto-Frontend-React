import logo from './logo.svg';
import './App.css';
import axios from "axios";


function handleClick(title)
{
    axios({
      method: "GET",
      url : `/${title}`
    })
    .then(res => {
      const model = res.data[`${title}`]
      model.map((elm) => 
      {
        console.log(elm)
      })
    }
    )
    
}

function NavBar(props) 
{
  const titles = props.titles ;
  return(
    <div className="topnav">
      {
        titles.map((title) => {
        return <a href={title} key={title} onClick={() => handleClick(title)}>{title}</a>
        })
      }
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar titles={["artists","venues","shows","genres"]}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
