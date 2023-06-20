import { Router } from "express";
import * as clientController from '../../controllers/web/client.controller.js'


const clientRouter = Router()

clientRouter.get('/', clientController.getAllClients)

clientRouter.get('/create', clientController.createClient)
clientRouter.post('/store', clientController.storeClient)

export {clientRouter}