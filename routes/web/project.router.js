import  express from 'express'
import * as projectController from '../../controllers/web/project.controller.js'

export const projectRouter = express.Router()

projectRouter.get('/create', projectController.createProject)
projectRouter.post('/store', projectController.storeProject)
projectRouter.get('/delete/:id', projectController.deleteProject)
projectRouter.post('/delete/:id', projectController.removeProject)
projectRouter.get('/edit/:id', projectController.updateProject)
projectRouter.post('/modify/:id', projectController.modifyProject)
projectRouter.get('/detail/:id', projectController.detailProject)
projectRouter.get('/:section', projectController.getAllProjects)


