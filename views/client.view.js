import {createPage} from '../pages/utils.js'

function createClientListPage(clients= []){
    let html = `<h2>Lista de Clientes</h2>`

    if(clients.length === 0){
        html += "<p>No hay clientes creados todavia</p>"
    }else {
    html += '<ul>'

    for (let i = 0; i < clients.length; i++) {
        html += `<li>${clients[i].name}</li>`
    }

        html += '</ul>'
    }
    return createPage('Clientes', html)
}

function createClientFormPage() {
    let html = `
    <form action="/client/store" method="POST">
        <input type="text" name="name" placeholder="Nombre del Cliente">
        <input type="text" name="photo" placeholder="url de la imagen">
        <textarea name="description" rows="10" cols="50" placeholder="descripcion del cliente"></textarea>
        <button type="submit">Crear</button>    
    </form>
    `
    return createPage("Crear Cliente", html)
}


export {
    createClientFormPage,
    createClientListPage,
    createPage,
}