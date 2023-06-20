import yup, {string} from 'yup'
import * as clientSchema from './Client.schema.js'
import * as sections from './../constants/sections.js'

const sectionList = Object.values(sections)

const Project = yup.object({
    name: yup.string().required("Nombre del proyecto es requerido"),
    description: yup.string(),
    technologies: yup.array(yup.string()).default([]),
    link: yup.string().required("El link del repositorio de es requierido"),
    img: yup.string(),
    section:yup.string().required("La categoria del proyecto es requerida   "),
    client: clientSchema.Client.nullable().optional()
})

export {
    Project
}
