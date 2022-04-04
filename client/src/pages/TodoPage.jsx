import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'



export default function TodoPage() {

    const [todoData, setTodoData] = useState("")
    const [todo, setTodo] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    
    const navigate = useNavigate()

    let { id }  = useParams()

    useEffect(() => {
        fetchTodo()
    });



    // GET TODO INFORMATION FROM BACKEND 
    function fetchTodo() {
        const url = `http://localhost:3001/todo/${id}`
        const token = localStorage.getItem('todoapp')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setTodoData(data.entry));
         };




    function handleOnSubmit(e){
        e.preventDefault()
        const payload = {todo, description, file}
        const url = `http://localhost:3001/todo/${id}`
        const token = localStorage.getItem('todoapp')
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        navigate("/mypage")    
    }



    return (  
    <div>

        

        {todoData && (
            <>
        <h1>Bucket List item:</h1> 
        <h2>Title: {todoData.todo}</h2>

        <p><i>Description: {todoData.description}</i></p>
            </>
        )} 
        <br />
        

        <form onSubmit={handleOnSubmit}>
                Edit title <br /><input 
                    type="text"
                    placeholder={todoData.todo}
                    name={todoData.todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <br />
                <br />
                Edit description
                <br />
                <textarea
                    type="text"
                    placeholder={todoData.description}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                >
                Enter text here...
                </textarea> 
                <br />
                <br />
                Upload a file
                <br />
                <input 
                type="file" 
                name={file}
                onChange={e => setFile(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
           </form>
           <br />

    </div>
  )
}
