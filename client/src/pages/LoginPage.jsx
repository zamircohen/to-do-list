import React, {useState} from 'react'

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function handleOnSubmit(e) {
        
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
