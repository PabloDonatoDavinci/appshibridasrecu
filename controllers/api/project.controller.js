import * as projectService from '../../services/project.service.js'
import * as clientService from '../../services/client.service.js'

async function getAllProjects(req, res) {
    try{
        const projects = await projectService.getAllProjects()
        res.status(200).json({
            message:'ok',
            code: 200,
            data: projects,
        })
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

async function storeProject(req, res) {
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
        const result = await projectService.storeProject(project)
        res.status(201).json({
            message:'creado',
            code: 201,
            data: result,
        })    
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }

    
}

async function removeProject(req, res) {
    const id = req.params.id
    try{
        const project = await projectService.getProjectById(id)
        await projectService.deleteProject(id)
        res.status(200).json({
            message:'eliminado',
            code: 200,
            data: project,
        })
    }catch(error){
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
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
        
        await projectService.modifyProject(id, project)
        res.status(200).json({
            message:'modificado',
            code: 200,
            data: project,
        })
    }catch(error) {
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
    
}

async function detailProject(req, res){
    const id = req.params.id

    try{
        const project = await projectService.getProjectById(id)
        if(project === null){
            return res.status(404).json({
                message:'no encontrado',
                code: 404,
            })
        }
        res.status(200).json({
            message:'ok',
            code: 200,
            data: project,
        })
    }catch(error){
        res.status(400).json({
            message:'error' + error.message,
            code: 400
        })
    }
}

export {
    getAllProjects,
    storeProject,
    detailProject,
    modifyProject,
    removeProject,
}   