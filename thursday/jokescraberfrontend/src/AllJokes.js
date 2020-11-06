import React, {useState, useEffect} from 'react';
import "./style2.css"

const AllJokes = () =>{
  
    const [joke, setJoke] = useState("");
    

    const fetchAllJokes = () => {
        fetch('http://localhost:8080/jokeFetcher/api/jokes').
        then(res=> res.json()).
        then(data => {
            setJoke(data);
        })
    }

    //loads joke first time
    useEffect(() => { 
      fetchAllJokes();
      
    },[]);
  
    return (
      <div>
          <h3>Chuck Norris Joke:</h3>
        <p>{joke.joke1}</p>
        <p>{joke.joke1Reference}</p>
        <br /><br />
        <h3>Dad Joke:</h3>
        <p>{joke.joke2}</p>
        <p>{joke.joke2Reference}</p>

      <br/>
        <button onClick={() => fetchAllJokes()}>Get new jokes</button>
        </div>
    
    );
  }

  export default AllJokes;