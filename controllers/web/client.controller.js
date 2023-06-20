import * as clientSchema from '../../schemas/Client.schema.js'
import * as view from '../../views/client.view.js'
import * as clientService from '../../services/client.service.js'


async function getAllClients (req, res){
    const clients = await clientService.getAllClients()
    res.send(view.createClientListPage(clients))
}

function createClient(req, res) {
    res.send(view.createClientFormPage())
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
        res.redirect('/client/')

    }catch(error) {
        res.send(view.createPage("Error al crear cliente", error.errors[0] ))
    }
}


export {
    getAllClients,
    createClient,
    storeClient,
}