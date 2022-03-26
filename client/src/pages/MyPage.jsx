import React, {useState, useEffect} from 'react'


export default function MyPage() {

    const [myData, setMyData] = useState("")

    useEffect(() => {
        const url = "http://localhost:3001/logged"
        const token = localStorage.getItem("todoapp")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setMyData(data))
        console.log(`Your token: ${token}`)
        // console.log(`Your data: ${myData}`)
    }, [])


  return (
    <div>
        
        <h1>My Page</h1>
            {myData && (
                <>
                    <h2>Hello</h2>
                    <h2>{myData.username}</h2>
                </>
            )}

    </div>
  )
}
