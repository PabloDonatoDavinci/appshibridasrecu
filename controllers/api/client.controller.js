import * as clientSchema from '../../schemas/Client.schema.js'
import * as view from '../../views/client.view.js'
import * as clientService from '../../services/client.service.js'


async function getAllClients (req, res){
    try{
        const clients = await clientService.getAllClients()
        res.status(200).json({
            message: 'ok',
            code: 200,
            data: clients,
        })
    }catch(error){
        res.status(400).json({
            message: 'error' + error.message,
            code: 400
        })
    }
        
}

async function storeClient(req, res) {
    const name = req.body.name
    const photo = req.body.photo
    const description = req.body.description

    const client = {
        name, photo, description
    }

    try {
        await clientSchema.Client.validate(client)
        await clientService.storeClient(client)
        res.status(201).json({
            message: 'creado',
            code: 201,
            data: client,
        })
    }catch(error) {
        res.status(400).json({
            message: 'error' + error.message,
            code: 400
        })
    }
}


export {
    getAllClients,
    storeClient,
}