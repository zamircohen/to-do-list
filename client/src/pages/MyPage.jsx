import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function MyPage() {

    const [myData, setMyData] = useState("")
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState("")

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
            .then((data) => {
                setMyData(data)
                console.log(data)
            });
    };


    useEffect(() => {
        fetchData()
        fetchList()
      }, []);
    


      // FUNCTION FOR CREATING A NEW POST
      function handleOnSubmit(e){
        e.preventDefault()
        const payload = {todo}
        const url = "http://localhost:3001/todo"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        navigate("/mypage")    
        fetchData()
        fetchList()
        // console.log(`This is from the client: ${todo}`)
    }



    function fetchList() {
        const url = "http://localhost:3001/mytodos"
        const token = localStorage.getItem("todoapp")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            headers: headers,
        })
        .then(res => res.json())
        .then(data => setTodoList(data))
    }

    




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
{/* 

                {todoList && todoList.map((items) => {
                    return (
                        <>
                        <ul>
                            <li>{items.todo}</li>
                            <li>{items.date}</li>
                        </ul>
                        </>
                    )
                })
                }


 */}
    </div>
  )
}
