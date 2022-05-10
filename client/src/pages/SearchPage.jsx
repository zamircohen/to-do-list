import React, {useState, useEffect} from 'react'



export default function SearchPage() {


    const [todoList, setTodoList] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
  

    useEffect(() => {
        fetchList()
    }, []);


   
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


   
    return (
    <div>
        <br />
        <input type="text" placeholder="search..." onChange={e=>setSearchTerm(e.target.value)} />
        <br />

      
        <br />

      

        <h2>Search result</h2>
      

      <br />
      <br />

    </div>
  )
}
