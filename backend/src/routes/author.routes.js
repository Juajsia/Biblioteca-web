import { Router } from 'express'
import { AuthorController } from '../controllers/author.controller.js'
import { validateToken, validateRolToken } from '../middlewares/validateToken.middleware.js'

const authorController = new AuthorController()
export const authorRouter = Router()

authorRouter.get('/', validateToken, validateRolToken(['Administrador', 'Empleado']), authorController.findAll)
authorRouter.get('/:cedula', validateToken, validateRolToken(['Administrador', 'Empleado']), authorController.findOne)
authorRouter.post('/', validateToken, validateRolToken(['Administrador']), authorController.create)
authorRouter.put('/:cedula', validateToken, validateRolToken(['Administrador']), authorController.update)
authorRouter.delete('/:cedula', validateToken, validateRolToken(['Administrador']), authorController.remove)
