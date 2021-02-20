import { useState } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [voting_choice , setVotingChoice] = useState(true);
  const [casted_at , setCastedAt] = useState("");
  const [polls , setPolls] = useState([]);

  const addVote = () => {
    Axios.post("http://localhost:4000/vote", {
      name: name,
      voting_choice: voting_choice,
      casted_at: casted_at
    }).then(() => {
      setPolls([
        ...polls,
        {
          name: name,
          voting_choice: voting_choice,
          casted_at: casted_at
        },
      ]);
    });
  };

  const getPOlls = () => {
    Axios.get("http://localhost:4000/data").then((response) => {
      setPolls(response.data);
    });
  };


  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Voting Choice</label>
        {/* <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        /> */}
        <select name="voting_choice" onChange={(event) => {
            setVotingChoice(event.target.value);
          }}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

        <label>Casted At:</label>
        <input
          type="date"
          onChange={(event) => {
            setCastedAt(event.target.value);
          }}
        />
        {/* <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        /> */}
        <button onClick={addVote}>Vote</button>
      </div>

      
      <div className="employees">
        <button onClick={getPOlls}>Show POlls</button>

        {polls.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>voting_choice: {val.voting_choice}</h3>
                <h3>casted_at: {val.casted_at}</h3>
              </div>
              <div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
