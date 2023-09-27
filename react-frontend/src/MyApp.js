import React, {useState} from "react";
import Table from "./Table";
import Form from './Form';
  
  function MyApp() {
    const [characters, setCharacers] = useState([
      ]);
    function removeOneCharacter(index) {
        const updated = characters.filter((characters, i) => {
            return i !== index
        });
        setCharacers(updated);
    }
    return (
      <div className="container">
        <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
        <Form />
      </div>
    );
  }
export default MyApp;