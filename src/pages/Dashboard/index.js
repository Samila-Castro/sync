import React,{useState,useEffect, useMemo} from 'react';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';
import { FiTrash2 } from 'react-icons/fi';

export default function Dashboard() {
    const [files, setFiles] =  useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [inputKey, setInputKey] = useState('qwe');

    const userName = localStorage.getItem('user');

    const socket = useMemo(() => socketio('http://localhost:3333',
     { transports : ['websocket'] }), 
    [userName]);

    useEffect(() => {
      socket.on('update-files', ({files}) => {
          setFiles(files);
      })
    }, [files, socket]);

    useEffect(()=>{
      async function loadFiles(){
          const response = await api.get('/files');
          setFiles(response.data) 
      }
      loadFiles();
    },[]);

   async function handleSubmit(event){
    event.preventDefault();
    event.target.value = null;

    if(thumbnail){
      const data = new FormData();
  
    data.append('thumbnail',thumbnail);

    const result = await api.post('/files', data);
    setFiles(result.data);
    setThumbnail(null);
    setInputKey(Math.random().toString(36));
    }
    
  } 

  async function handleDelete(file) {
    const result = await api.delete(`/files/${file.name}`);
    setFiles(result.data);
  }

  return (
    <>
    <h2>Hi, {userName}</h2>
    <ul className="file-list">
        {files.map(file =>(
            <li key={file.name}>
                <strong>
                  <a target="_blank" href={file.url } rel="noreferrer">{file.name}</a>
                  <button onClick={()=>handleDelete(file)} ><FiTrash2 /></button>
                </strong>
            </li>
        ))}
    </ul>
    
    <form onSubmit={handleSubmit}>
      <input 
        key={inputKey}
        type="file" 
        onChange={event => setThumbnail(event.target.files[0])} 
      />
        <button type="submit" className="btn" >Cadastrar</button>
    </form>
    </>
  )
}

 