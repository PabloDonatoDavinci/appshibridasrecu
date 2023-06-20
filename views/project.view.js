import { createPage } from '../pages/utils.js'

function createProjectListPage(section="", projects=[]) {
    let html = `<h2>Lista de Proyectos de ${section}</h2>`

    if(projects.length === 0){
        html += "<p>No hay proyectos creados todavia</p>"
    }else {
    html += '<ul class="lista-proyectos">'

    for (let i = 0; i < projects.length; i++) {
        html += `
            <li>${projects[i].name} 
                <a href="/project/detail/${projects[i]._id}">Ver</a> 
                <a href="/project/edit/${projects[i]._id}">Modificar</a> 
                <a href="/project/delete/${projects[i]._id}">Eliminar</a>
            </li>`
    }

        html += '</ul>'
    }
    return createPage('Proyectos', html)
}

function createProjectPage(project, reviews) {
    let html = `<h1>${project.name}</h1>`
    html += `<p>Precio: $${project.price}</p>`
    html += `<p>${project.description}</p>`

    html += `<h2>Comentarios</h2>`
    html += `<ul>`

    for (let i = 0; i < reviews.length; i++) {
        html += `<li>
            Autor: ${reviews[i].author} <br />
            Valoracion: ${reviews[i].score} <br />
            Comentario: ${reviews[i].comment}
        </li>`
    }

    html += `</ul>`


    return createPage(project.name, html)
}

function createProjectFormPage(sections =[], clients=[]) {
    
    let inputSection = `
        <select name='section'>
            <option value=''>Categoria</option>    
    `
    for( let section in sections){
        inputSection += `<option value=${sections[section]}>${sections[section]}</option>`
    }
    inputSection += "</select>"

    let inputSectionClients = `
    <select name='client'>
        <option value=''>Cliente</option>    
` 
    for(let index=0; index < clients.length; index++){
        const client = clients[index]
        inputSectionClients += `<option value=${client._id}>${client.name}</option>`
    }
    inputSectionClients += "</select>"

    
    const html = `
    <h2>Crear Projecto</h2>
    <form action="/project/store" method="POST">
    <input type="text" name="name" placeholder="Nombre del proyecto">
    <input type="text" name="technologies" placeholder="node,javascript,html">
    <input type="text" name="link" placeholder="https:github.com/mi_fantastico_proyecto">
    <input type="text" name="img" placeholder="image.com">
    ${inputSection}
    ${inputSectionClients}
    <textarea name="description" rows="5" cols="50" placeholder="descripcion del proyecto"></textarea>

    <button type="submit">Crear</button>
    </form>
    `

    return createPage('Crear Projecto', html)
}


function createEditProjectFormPage(project, sections=[], clients=[]) {
    let inputSection = `
        <select name='section'>
            <option value=''>Categoria</option>    
    `
    for( let section in sections){
        const selectedSection = sections[section]
        inputSection += `<option value=${selectedSection} ${project.section === selectedSection? 'selected': ''}>${selectedSection}</option>`
    }
    inputSection += "</select>"

    let inputSectionClients = `
    <select name='client'>
        <option value=''>Cliente</option>    
` 
    for(let index=0; index < clients.length; index++){
        const client = clients[index]
        console.log('client', client);
        console.log('dataclient',project.client);

        inputSectionClients += `<option value=${client._id} ${project.client !== null && project.client._id === client._id? "selected": ''}>${client.name}</option>`
    }
    inputSectionClients += "</select>"

    
    const html = `
    <h2>Crear Producto</h2>
    <form action="/project/modify/${project._id}" method="POST">
    <input type="text" name="name" value="${project.name}" placeholder="Nombre del proyecto">
    <input type="text" name="technologies" value="${project.technologies}" placeholder="node,javascript,html">
    <input type="text" name="link" value="${project.link}" placeholder="https:github.com/mi_fantastico_proyecto">
    <input type="text" name="img" value="${project.img}" placeholder="image.com">
    ${inputSection}
    ${inputSectionClients}
    <textarea name="description" rows="5" cols="50" placeholder="descripcion del proyecto">${project.description}</textarea>

    <button type="submit">Crear</button>
    </form>
    `    

    return createPage('Modificar Projecto', html)
}

function createDeleteProjectFormPage(project) {
    let html = `
    <h2>${project.name}</h2>
    <form action="/project/delete/${project._id}" method="POST">
    <p>Esta segudo de que quiere eliminarlo?</p>
        <button type="submit">Elimnar</button>
    </form>`

    return createPage(project.name, html)
}

function createDetailProjectPage(project) {
    let html = `
        <h2>Detalle de proyecto ${project.name} </h2>

        <blockquote>
            <p>Tecnologias: ${project.technologies}</p>
            <p>Descripcion: ${project.description}</p>
            <img src='${project.img}' alt="${project.name}" >
            <a href="${project.link}" >repositorio </a>
            <p>Categoria: ${project.section}</p>
            <p>Cliente: ${project.client !== null? project.client.name: 'sin patrocinador'} </p>
        
        </blockquote>
    `
    return createPage("detalle del proyecto", html)
}


export {
    createProjectListPage,
    createProjectPage,
    createPage,
    createProjectFormPage,
    createEditProjectFormPage,
    createDeleteProjectFormPage,
    createDetailProjectPage,
}

