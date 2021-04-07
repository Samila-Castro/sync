import React,{useState} from 'react';


export default function Login({history}){
    const [nome, setNome] = useState('');
    

    
    async function handleSubmit(event){
        
        event.preventDefault();
        localStorage.setItem('user', nome);
        history.push('/dashboard')
    }
    return (
        <>
            
            <form onSubmit ={handleSubmit} >
                <label htmlFor="nome">Nome </label>
                <input 
                type="text" 
                id="nome"  
                placeholder="Digite seu nome" 
                value ={nome}
                onChange ={event => setNome(event.target.value)}/>
                <button className="submit btn">Entrar</button>
            </form>
       </>  
    )
}