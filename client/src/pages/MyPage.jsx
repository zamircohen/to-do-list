import React, {useState, useEffect} from 'react'


export default function MyPage() {

    const [myData, setMyData] = useState(null)

    useEffect(() => {
        const url = "http://localhost:3001/mypage"
        const token = localStorage.getItem("todo_app")
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setMyData(data))
    }, [])


  return (
    <div>
        My Page

        {
            myData && (
            <>
                <h2>Welcome {myData.username}</h2>
            </>
        )}

    </div>
  )
}
