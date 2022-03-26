import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function MyPage() {

    const [myData, setMyData] = useState("")
    const [data, setData] = useState(null)
    const [todo, setTodo] = useState("")

    const navigate = useNavigate()

    // GET INFORMATION ABOUT THE USER WHO IS LOGGED IN
    useEffect(() => {
        const url = "/users"
        const token = localStorage.getItem("todoapp")
        const headers = {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
        fetch(url, {
            headers : headers
        })
        .then(res => res.json())
        .then(data => setMyData(data))
        console.log(`Your token: ${token}`)
        // console.log(`Your data: ${myData}`)
    }, [])



    // TEST FETCH FROM AN API 
    useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);
    


      // FUNCTION FOR CREATING A NEW POST
      function handleOnSubmit(e){
        e.preventDefault()
        
        const payload = {
            todo,
        }
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
        navigate("/")    
    }



  return (
    <div>
        
        <h1>My Page</h1>
        <p>{data}</p>
        <h2>User: {myData.username}</h2>
        
            {myData && (
                <>
                    <p>{data}</p>
                    <h2>Hello</h2>
                    <h2>User: {myData.username}</h2>
                </>
            )}

        
        <h1>To do</h1>
        <form onSubmit={handleOnSubmit}>
                To do: <input 
                    type="text"
                    placeholder=""
                    value={todo}
                    onChange={e => setTodo(e.target.value)}
                /> <br />
                <button type="submit">To do</button>
           </form>
           <br />
           <a href="/">Logout</a>




    </div>
  )
}
