import {Navigate} from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function CreatePost(){
    const data = new FormData();
    const [title,setTitel] = useState('');
    const [summary,setSummary] = useState('');
    const [ content,setContent] = useState('');
    const [ files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
// format and moduls
async function createNewPost(ev) {
    ev.preventDefault(); // Prevent the default form submission behavior

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials:'include',
        });
if (response.ok){
    setRedirect(true);
}
        if (response.ok) {
            // Handle success, maybe redirect to a success page or update state
            console.log('Post created successfully');
        } else {
            // Handle error, maybe display an error message
            console.error('Failed to create post');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
if (redirect){
    return <Navigate to={'/'}/>
}
    return (
        <form onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitel(ev.target.value)}/>
            <input type="summary" placeholder={'summary'} onChange={ev => setSummary(ev.target.value)}/>
            <input type="file"  
                onChange={ev=>setFiles(ev.target.files)} 
            />
            <ReactQuill value={content} onChange={newValue=>setContent(newValue)}/>
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    );
}