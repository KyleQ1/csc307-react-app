import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from './Form';
  
  function MyApp() {
    const [characters, setCharacters] = useState([
      ]);
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }  
    useEffect(() => {
      fetchUsers()
        .then((res) => res.status === 200 ? res.json() : Promise.reject(res))
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    function removeOneCharacter(index) {
        const updated = characters.filter((characters, i) => {
            return i !== index
        });
        setCharacters(updated);
    }
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }
    function updateList(person) {
      postUser(person)
      .then((res) => res.status === 200 ? res.json() : Promise.reject(res))
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
    }
    return (
      <div className="container">
        <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList}/>
      </div>
    );
  }
export default MyApp;