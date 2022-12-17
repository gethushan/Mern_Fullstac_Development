import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {
  const [listoftodo, setlistoftodo] = useState([]);
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    Axios.get('http://localhost:3000/getUsers').then((response) =>{
    setlistoftodo(response.data)
  })

  }, [])

  const createTodo = () => {
    Axios.post('http://localhost:3000/createList',{
      title,
      description,
     }).then((response) =>{
      setlistoftodo([...listoftodo, {_id: response.data._id, title,description,}])
    })
  }

  const deleteTodo = (id) =>{
    Axios.delete(`http://localhost:3000/delete/${id}`).then(() => {
      setlistoftodo(listoftodo.filter((todolists) => {
        return todolists._id !== id;
      }))
    })
  }

  return (
    <body class="full">
    <main class="main-bg">
        <section class="glass">
            <div class="put">
              <form onSubmit={createTodo} >
                <input type="text" placeholder="Title..." onChange={(event) => {settitle(event.target.value)}}/>
                <input type="text" placeholder="Description..." onChange={(event) => {setDescription(event.target.value)}}/>
                <button type="submit" disabled="" >Add</button>
              </form>
            </div>
            <div class="todos">
                {listoftodo.map((todolists) => {
                    return (
                      <h2>Title: {todolists.title} || Description: {todolists.description}<button className='del' type="button" onClick={() => deleteTodo(todolists._id)}>X</button></h2>
                    );
                  })}
            </div>
        </section>
    </main>
    </body>
  );
}

export default App;
