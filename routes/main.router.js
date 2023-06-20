import express from 'express'
import { projectRouter } from './web/project.router.js'
import { clientRouter } from './web/client.router.js'
import * as viewUtils from '../pages/utils.js'
import { projectApiRouter } from './api/project.router.js'
import { clientApiRouter } from './api/client.router.js'


export const mainRouter = express.Router()

mainRouter.get('/', function(req, res) {
    res.send(viewUtils.createPage('principal'))
})

mainRouter.use('/project', projectRouter)
mainRouter.use('/client', clientRouter )

mainRouter.use('/api/project', projectApiRouter)
mainRouter.use('/api/client', clientApiRouter)
