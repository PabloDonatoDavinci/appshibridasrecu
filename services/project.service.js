import {db, connect} from '../database/mongo.database.js'
import {PROJECT_COLLECTION} from '../constants/collections.js'
import {ObjectId} from 'mongodb'

const projectCollection = db.collection(PROJECT_COLLECTION)


async function getProjectById(id){
    console.log('id' + id);
    await connect()
    const mongoId = new ObjectId(id)
    const project = await projectCollection.findOne({_id: mongoId})
    console.log('encontrado ' + project);
    return project
}

async function getAllProjects(key='', value='') {
    await connect() 
    let projects = []
    if(key=== ''){
        projects = await projectCollection.find().toArray()
    }else{
        switch (key){
            case 'section':
                projects = await projectCollection.find({section:value}).toArray()
                break
            case 'technologies':
                // filtro por tecnologias
                projects =[]
                break
        }
    }
    return projects
}

async function storeProject(project) {
    await connect()
    await projectCollection.insertOne(project)
}

async function deleteProject(id) {
        await connect()
        const mongoId = new ObjectId(id)
        projectCollection.deleteOne({_id:mongoId})
}

async function modifyProject(id, project) {
    const mongoId = new ObjectId(id)

    await projectCollection.updateOne(
        {_id:mongoId}, // filtro de busqueda
        {$set:project} // datos a actualizar        
    )
}

export {
    getAllProjects,
    storeProject,
    getProjectById,
    deleteProject,
    modifyProject,
}
