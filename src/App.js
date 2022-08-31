import logo from './logo.svg';
import './App.css';

function NavBar(props) 
{
  const titles = props.titles ;

  return(
    <div class="topnav">
      {
        titles.map((title) => {
        return <a href={title}>{title}</a>
        })
      }
    </div>

  );
}

function App() {
  return (
    <div className="App">
      <NavBar titles={["artists","venues","show","genres"]}/>
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
