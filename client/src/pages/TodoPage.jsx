import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"
// import { Preview } from '../components/Preview'



export default function TodoPage() {

    const [todoData, setTodoData] = useState("")
    const [todo, setTodo] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState([])
    const [label, setLabel] = useState("")
    const [fileData, setFileData] = useState("")
    
    const navigate = useNavigate()

    let { id }  = useParams()

    useEffect(() => {
        fetchTodo()
        // fetchFileList()
    }, []);



    // GET TODO INFORMATION FROM BACKEND 
    function fetchTodo() {
        const url = `http://localhost:3001/todo/${id}`
        const token = localStorage.getItem('todoapp')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setTodoData(data.entry));
         };





     // GET FILE LISTFROM BACKEND 
     function fetchFileList() {
        const url = `http://localhost:3001/uploads`
        const token = localStorage.getItem('todoapp')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setFileData(data.filename));
         };





    // FORM SUBMIT
    function handleOnSubmit(e){
        e.preventDefault()
        const payload = {todo, description}
        const url = `http://localhost:3001/todo/${id}`
        const token = localStorage.getItem('todoapp')
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        navigate("/mypage")    
    }


  

    function handleLabelSubmit(e){
        e.preventDefault()
        const payload = {label}
        const url = "http://localhost:3001/label"
        const token = localStorage.getItem('todoapp')
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        // .then(data => fetchList(data)) //console.log(data))
        // fetchList()
        setLabel("")
        navigate("/mypage")    
    }




    
    function onInputChange(e){
        console.log(e.target.files)
        setFiles(e.target.files)
    }
    
    function onFileSubmit(e){
        e.preventDefault()

        const data = new FormData()

        for(let i = 0; i < files.length; i++){
            data.append("file", files[i])
        }

        // data.append("file", files) 

        axios.post("http://localhost:3001/upload", data)
            .then((e) => {
                console.log("Success")
                toast.success("Upload Success")
            })
            .catch((e) => {
                console.error("Error", e)
                toast.error("Upload Error")
            })
            fetchFileList()
    }






    return (  
    <div>

        

        {todoData && (
            <>
        <h1>Bucket List item:</h1> 
        <h2>Title: {todoData.todo}</h2>

        <p><i>Description: {todoData.description}</i></p>
            </>
        )} 
        <br />


        {fileData && (
            <>
        <h2>Attachments: {fileData}</h2>
            </>
        )} 


        

        <form onSubmit={handleOnSubmit}>
                Edit title <br /><input 
                    type="text"
                    placeholder={todoData.todo}
                    name={todoData.todo}
                    onChange={e => setTodo(e.target.value)}
                />
                <br />
                <br />
                Edit description
                <br />
                <textarea
                    type="text"
                    placeholder={todoData.description}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                >
                Enter text here...
                </textarea> 
                <br />
                <br />
                <button type="submit">Submit</button>
           </form>
            <br />
            <a href="/mypage">Back</a>
            <br />
            <br />
            
            
      
           <br />


           <form onSubmit={handleLabelSubmit}>
            Create Label
                <br />
                Label: <input 
                type="text" 
                name={label}
                onChange={e => setLabel(e.target.value)}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>

            <br />
            <br />


            <form method="post" action="/" id="" onSubmit={onFileSubmit}>
                <label>Upload your file</label>
                <input 
                    type="file"
                    onChange={onInputChange} 
                    multiple 
                />
                <button type="submit">Submit</button>
            </form> 

            

    </div>
  )
}
