import React, {useState, useEffect, FormEvent} from 'react';
import { Link } from 'react-router-dom'
import {Title, Form, Repositories, Error} from './styles';
import {FiChevronRight} from 'react-icons/fi';
import logo from '../../assets/logo.svg'

import api from '../../services/api';
import repository from '../Repository';

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
    html_url: string;
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');
        
        if(storageRepositories){
            return JSON.parse(storageRepositories);
        } else {
            return [];
        }

    });
    const [inputError, setInputError] = useState('');


    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));

    },[repositories]);

    async function  handleAddRepository(
        e : FormEvent<HTMLFormElement>,
        ) : Promise<void>{

        e.preventDefault();

        if(!newRepo){
            setInputError("Digite autor/nome do repositório!");
            return;
        }

        try {
            //Adição novo repositorio
            const response = await api.get(`/repos/${newRepo}`);
            const repository = response.data;
            console.log(repository)
            setRepositories([...repositories, repository]);

            setNewRepo('');
            setInputError('');
        } catch {
            setInputError("Erro na busca pelo repositório.");
        }

    }
    
    
    return (
        <>
        <img src={logo} alt="Github Explorer"></img>
        <Title>Explore Repositórios no Github</Title>

        <Form  hasError={ !! inputError} onSubmit={handleAddRepository}>
            <input 
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                type="text"
                placeholder="Digite o nome do Repo: "
            />
            <button type="submit">Pesquisar</button>
        </Form>

        { inputError && <Error>{inputError}</Error> }

        <Repositories>

            {repositories.map(repo => (
                <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
                <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                <div>
                    <strong>{repo.full_name}</strong>
                    <p>{repo.description}</p>
                </div>
                <FiChevronRight size={20}></FiChevronRight>
                </Link>
            ))};
            

        </Repositories>

    </>
    )
}

export default Dashboard;