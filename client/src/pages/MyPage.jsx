import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function MyPage() {

    const [myData, setMyData] = useState("")
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState([])

    const navigate = useNavigate()

    // GET INFORMATION ABOUT THE USER WHO IS LOGGED IN
    // useEffect(() => {
    //     const url = "/users"
    //     const token = localStorage.getItem("todoapp")
    //     const headers = {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //             }
    //     fetch(url, {
    //         method: "GET",
    //         headers : headers
    //     })
    //     .then(res => res.json())
    //     .then(data => setMyData(data))
    // }, [])


    
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
        const payload = ""
    //     // const url = 'http://localhost:3001/users'
    //     // const token = localStorage.getItem('todoapp')
    //     // const headers = {
    //     //     "Content-Type": "application/json",
    //     //     Authorization: `Bearer ${token}`,
    //     // };
    //     // fetch(url, {
    //     //     headers: headers,
    //     // })
        apifetch("GET", "/users", payload)
            .then((res) => res.json())
            .then((data) => {
                setMyData(data)
                console.log(data)
            });
    };


    useEffect(() => {
        fetchData()
        // fetchList()
      }, []);
    



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
        .then(data => console.log(data))
        navigate("/mypage")    
        // fetchData()
        fetchList()
        // console.log(`This is from the client: ${todo}`)
    }



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
            .then((data) => {
                setTodoList(data.entries)
            });
    };
    

    // LOG OUT FUNCTION
    function handleOnClick() {
        localStorage.removeItem("todoapp")
        navigate("/")
    };


    
  return (
    <div>
        <h1>My Page</h1>
            {myData && (
                <>
                    <h2>Hello {myData.user.username}! This is your to do list.</h2>
                </>
            )}

                {todoList && todoList.map((items) => {
                    return (
                        <>
                        <ul>
                            <li>{items.todo}</li>
                            {/* <li>{items.date}</li> */}
                        </ul>
                        </>
                    )
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


              


    </div>
  )
}
