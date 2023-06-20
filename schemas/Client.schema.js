import yup from 'yup'

const Client = yup.object({
    name: yup.string().required("nombre del cliente es requerido"),
    photo: yup.string().default(""),
    description: yup.string().default("")
}).strict()

export {
    Client
}