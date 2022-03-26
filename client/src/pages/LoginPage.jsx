import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    function handleOnSubmit(e) {
        console.log("HandleOnSubmit function is working")
        e.preventDefault()
        const url = "http://localhost:3001/login"
        const payload = { username, password }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            const token = data.token
            localStorage.setItem("todoapp", token)
            console.log(token)
        })
        navigate("/mypage")
    }


    return (
        <div>
           <h1>Log in</h1>

           <form onSubmit={handleOnSubmit}>
                Username: <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /> <br />
                Password: <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> <br />
                <button type="submit">Login</button>
           </form>
           <br />
            No account? Create one <a href="/signup">here</a>   

        </div>
    )
}
