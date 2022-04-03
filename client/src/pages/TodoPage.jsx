import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'



export default function TodoPage() {

    const [todoData, setTodoData] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        fetchTodo()
    }, []);



    // GET TODO INFORMATION FROM BACKEND 
    function fetchTodo() {
        const url = 'http://localhost:3001/todo/:todoId'
        const token = localStorage.getItem('todoapp')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setTodoData(data));
         };




    function handleOnSubmit(e){
        e.preventDefault()
        const payload = {todoData}
        const url = "http://localhost:3001/todo"
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
        <h1>Hello {todoData.todo} </h1>
            </>
        )} 

        <form onSubmit={handleOnSubmit}>
                To do <br /><input 
                    type="text"
                    placeholder={todoData.todo}
                    value={todoData}
                    onChange={e => setTodoData(e.target.value)}
                />
                <br />
                <br />
                Description
                <br />
                <textarea>
                Enter text here...
                </textarea> 
                <br />
                <br />
                Upload a file
                <br />
                <input 
                type="file"
                id="myFile" 
                name="myFile"/>
                <br />
                <br />
                <button type="submit">Submit</button>
           </form>
           <br />

    </div>
  )
}
