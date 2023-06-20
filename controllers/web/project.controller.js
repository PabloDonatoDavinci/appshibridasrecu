import * as service from '../../services/project.service.js'
import * as view from '../../views/project.view.js'
import * as sectionsList from '../../constants/sections.js'
import * as projectShema from '../../schemas/Project.schema.js'
import * as clientService from '../../services/client.service.js'

async function getAllProjects(req, res) {
    const section = req.params.section
    try{

        const projects = await service.getAllProjects('section', section)
        res.send(view.createProjectListPage(section, projects))
    }catch(error) {
        res.send(error)
    }
}

async function createProject(req, res){

    try{
        const sections = Object.values(sectionsList)
        const clients = await clientService.getAllClients() 
        
        res.send(view.createProjectFormPage(sections, clients))
    }catch(error) {
        res.send(view.createPage('error', 'error cargando clientes'))
    }
}

async function updateProject(req, res){

    const id = req.params.id
    try{

        const project = await service.getProjectById(id)
        const sections = Object.values(sectionsList)
        const clients = await clientService.getAllClients() 
        
        res.send(view.createEditProjectFormPage(project, sections, clients))
    }catch(error) {
        console.log(error)
        res.send(view.createPage('error', 'error cargando clientes'))
    }
}

async function modifyProject(req, res){
    const id = req.params.id
    const technologies = req.body.technologies.split(',')
    
    const clientId = req.body.client


    let client = undefined
    if(clientId !== ''){
        client = await clientService.getClientById(clientId)       
    }
    
    const project = {
        name: req.body.name,
        description:req.body.description,      
        link: req.body.link,
        img: req.body.img,
        technologies,
        section: req.body.section,
        client
    }

    try{
        await projectShema.Project.validate(project)

        await service.modifyProject(id, project)
        res.redirect('/project/' + project.section)
    }catch(error) {
        console.log(error);
        res.send(view.createPage('error', error.errors[0]))
    }
    
}

async function detailProject(req, res){
    const id = req.params.id

    try{
        const project = await service.getProjectById(id)
        res.send(view.createDetailProjectPage(project))
    }catch(error){
        res.send(view.createPage('error', error.message))
    }
}

async function storeProject(req, res) {
    console.log('store', req.body)
    const technologies = req.body.technologies.split(',')
    
    const clientId = req.body.client


    let client = undefined
    if(clientId !== ''){
        client = await clientService.getClientById(clientId)       
    }
    
    const project = {
        name: req.body.name,
        description:req.body.description,      
        link: req.body.link,
        img: req.body.img,
        technologies,
        section: req.body.section,
        client
    }

    try {
        await projectShema.Project.validate(project)
        await service.storeProject(project)
        res.redirect('/project/' + project.section)    
    }catch(error) {
        res.send(view.createPage("Error al crear proyecto", error.erros[0]))
    }
}

async function deleteProject(req, res){
    const id = req.params.id
    const project = await service.getProjectById(id)
    console.log(project)
    res.send(view.createDeleteProjectFormPage(project))
}

async function removeProject(req, res) {
    const id = req.params.id
    try{
        await service.deleteProject(id)
        res.redirect('/project/mobile')
    }catch(error){
        res.send('error')
    }
}

export {createProject, getAllProjects, storeProject, deleteProject, removeProject, updateProject, modifyProject, detailProject}