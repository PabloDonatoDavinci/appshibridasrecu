import {MongoClient} from 'mongodb'

const mongoUrl = 'mongodb+srv://pablodonato:pablodonato@cluster0.omtjbnh.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongoUrl)

export const db = client.db('AH2023ICPI')

export async function connect() {
    await client.connect()
}

export async function closeConnection() {
    await client.close()
}
