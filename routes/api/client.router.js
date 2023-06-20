import { Router } from "express";
import * as ClientController from "../../controllers/api/client.controller.js";

const clientApiRouter = Router();

clientApiRouter.get("/", ClientController.getAllClients);
clientApiRouter.post("/", ClientController.storeClient);

export {clientApiRouter}