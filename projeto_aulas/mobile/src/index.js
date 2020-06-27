import React, {useEffect, useState } from 'react'
import { SafeAreaView , FlatList, ScrollView, Text, Button, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'

import api from './services/api'

//Não possuem valor semantico
//View: div, footer, header, main, aside, section]
//Text: p, span, strong, h1, h2, h2

export default function App()
{

    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then( response => {
            setProjects(response.data)
        })
    }, [] )

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "EU"
            }
        )
        setProjects([...projects, response.data])
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
            <SafeAreaView style={styles.container}>

                <FlatList 
                    

                    //recebe o array com os dados da lista
                    data={projects}

                    //recebe um função que retorna o valor unico dentro do array, nesse caso o array
                    keyExtractor={project => project.id}

                    //render recebe uma serie de informações como parametro
                    renderItem={( {item : project} ) => (
                        <Text style={styles.project}>
                            {project.title}
                        </Text>
                    )}

                >
                </FlatList>
                <TouchableOpacity 
                    onPress={handleAddProject}
                    activeOpacity={0.5} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Adicionar Projeto
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
            
            {/* <View style={styles.container}>
                {projects.map(pro => (
                     <Text 
                        key={pro.id} 
                        style={styles.project}
                        >{pro.title}</Text>
                    )
                )}
              
                

            </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
  
    },
    font : {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold'
        
    },
    project : {
        padding: 5,
        margin: 5,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 5,
        borderRadius: 8,
        fontSize: 20,
        color: '#fff',
        justifyContent: 'center',
        alignContent: 'center'
    }, 
    button : {

        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',

    }, 
    buttonText : {
        fontWeight: 'bold',
        fontSize: 16,
        }
   
    

})