import * as connection from './../database/mongo.database.js'
import { CLIENT_COLLECTION } from '../constants/collections.js'
import { ObjectId } from 'mongodb'

const clientCollection = connection.db.collection(CLIENT_COLLECTION)

async function getAllClients() {
    await connection.connect()
    const clients = await clientCollection.find().toArray()
    return clients
}

async function getClientById(id) {
    const mongoId = new ObjectId(id)

    await connection.connect()
    const client = await clientCollection.findOne({_id: mongoId})
    return client
}

async function storeClient(client) {
    await connection.connect()
    const createdClient = await clientCollection.insertOne(client)
    return createdClient
}

export {
    getAllClients,
    getClientById,
    storeClient,
}