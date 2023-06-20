import * as objectSectionListLinks from "../constants/sections.js";

function createPage(title, content = "") {
  const sectionListLinks = [
    "mobile",
    "landing-page",
    "web-app",
    "E-comerce",
    "games",
  ];
  let navigationLinks = "";

  for (let index = 0; index < sectionListLinks.length; index++) {
    const linkName = sectionListLinks[index];
    navigationLinks += `<a href="/project/${linkName}">${linkName}</a> |`;
  }
  console.log(navigationLinks);

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/style.css">
        <title>${title}</title>
    </head>
    <body>
        <header>
        <h1>Sitio web sobre proyectos</h1>
        <h3>Categorias</h3>
        <nav>
           ${navigationLinks} 
           <br/>
           <br/>
           <a href="/project/create">Nuevo Proyecto</a>
          <a href="/client">Clientes</a>
          <a href="/client/create">agregar Cliente</a>
        </nav>
          
          
        ${content}
    </body> 
    </html>
    `;

  return html;
}

function createProjectList(products) {
  let content = "<ul>";
  for (let i = 0; i < products.length; i++) {
    content += "<li>" + products[i].name + "</li>";
  }
  content += "</ul>";
  return content;
}

export { createPage, createProjectList };
