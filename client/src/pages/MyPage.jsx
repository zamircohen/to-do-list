import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"


export default function MyPage() {

    const [myData, setMyData] = useState("")
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState([])

    const navigate = useNavigate()

    
    useEffect(() => {
        fetchData()
        fetchList()
    }, []);

   

    function apifetch(method, path, body) {
        const url = `http://localhost:3001${path}`
        const token = localStorage.getItem('todoapp')
        if (body) {
            body = JSON.stringify(body)
        }
        return fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body
        })
      }



    // GET USER INFORMATION FROM BACKEND 
    function fetchData() {
        const url = 'http://localhost:3001/users'
        const token = localStorage.getItem('todoapp')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setMyData(data));
         };



         function fetchList() {
            const url = 'http://localhost:3001/mytodos'
            const token = localStorage.getItem('todoapp')
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            fetch(url, {
                headers: headers,
            })
                .then((res) => res.json())
                .then((data) => setTodoList(data.entries)
                );
        };
 
    



      // FUNCTION FOR CREATING A NEW POST
      function handleOnSubmit(e){
        e.preventDefault()
        const payload = {todo}
        // const url = "http://localhost:3001/todo"
        // const token = localStorage.getItem('todoapp')
        // fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`
        //     },
        //     body: JSON.stringify(payload)
        // })
        apifetch("POST", "/todo", payload)
        .then(res => res.json())
        .then(data => fetchList(data)) //console.log(data))
        // fetchList()
        setTodo("")
        navigate("/mypage")    
    }



    function handleOnDoneClick(todo_id) {
        const payload = {todo_id}
        apifetch("POST", "/checkbox", payload)
        .then(res => res.json())
        .then(data => fetchList(data)) // console.log(data))
        // fetchList()
    }



  
    // LOG OUT FUNCTION
    function handleOnClick() {
        localStorage.removeItem("todoapp")
        setMyData("")
        // sessionStorage.removeItem("todoapp")
        navigate("/")
    };



 
    
  return (
    <div>
            {myData && (
                <>
                    <h2>{myData.user.username}´s Bucket list!</h2>
                </>
            )}

            <Link to={`/search`}> {"Search & sort"} </Link>

            <h1>To do...</h1>

                {todoList && todoList.map((items) => {
                    if (items.isDone === false) {
                    return (
                        <>
                        <ul>
                            <li> <Link to={`/todo/${items._id}`}> {items.todo} - ({items.date}) </Link> </li>
                            <button onClick={(e) => handleOnDoneClick(items._id)}>Done</button>
                        </ul>
                        </>
                    )} else {
                        return null
                    }
                }) 
                }
            

        <form onSubmit={handleOnSubmit}>
                To do: <input 
                    type="text"
                    placeholder=""
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                /> 
                <button type="submit">To do</button>
           </form>
           <br />
           <button onClick={handleOnClick}>Log out</button>


           <h1>Done...</h1>
              
           {todoList && todoList.map((items) => {
               if (items.isDone === true) {
                    return (
                        <>
                        <ul>
                            <li><Link to={`/todo/${items._id}`}> {items.todo} - ({items.date}) </Link></li>
                            <button onClick={(e) => handleOnDoneClick(items._id)}>Undone</button>
                        </ul>
                        </>
                    )} else {
                        return null
                    }
                })
                }
    </div>
  )
}
