import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import api from './services/api'

import './components/App.css'

function App(){

    const [projects, setProjects] = useState([]) 
    
    //usado para iniciar e monitorar uma função de acordo com o parametro desejado
    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    },[])

    async function handleAddProject(){
        //setProjects([...projects, `Novo Projeto ${Date.now()}`])

        const response = await api.post('/projects',{
            "title": `Novo Projeto ${Date.now()}`,
            "owner": "Paulo Belucci"
        })

        const project = response.data

        setProjects([...projects, project])
       
    }

    return (
        <>
            <Header title="Projects"/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Clique para adicionar</button>
        </> 


        
    )
}

export default App