import React, {useState} from 'react'


export default function SignupPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function handleOnSubmit(e){
        e.preventDefault()
        
        const payload = {
            username,
            password,
        }
        const url = "https://lab.willandskill.eu/api/v1/auth/users/"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }


   
  return (
    <div>
        
        <form onSubmit={handleOnSubmit}>
                Username: <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /> <br />
                Password: <input 
                    type="text" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> <br />
                <button type="submit">Login</button>
           </form>

    </div>
  )
}
