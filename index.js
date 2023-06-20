import express from 'express'
import {mainRouter} from './routes/main.router.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()


// protocolo http (protocolo para comunicarse en la red usa los verbos GET, POST, PUT y DELETE)
// GET toma informacion
// POST crea un registro en el servidor o envia informacion deicada
// PUT actualiza un registro
// DELETE elimina un registro
// segun el estandar API REST

app.use(express.json())
app.use(express.urlencoded())


app.use(express.static('public'))
app.use(mainRouter)

const port =2222
app.listen(port, () => {
    console.log('escuchando en el puerto 👍 http://localhost:2222')
})