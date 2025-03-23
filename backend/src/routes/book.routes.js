import { Router } from 'express'
import { BookController } from '../controllers/book.controller.js'
import { validateToken, validateRolToken } from '../middlewares/validateToken.middleware.js'

const bookController = new BookController()
export const bookRouter = Router()

bookRouter.get('/', validateToken, validateRolToken(['Administrador', 'Empleado']), bookController.findAll)
bookRouter.get('/:ISBN', validateToken, validateRolToken(['Administrador', 'Empleado']), bookController.findOne)
bookRouter.post('/', validateToken, validateRolToken(['Administrador']), bookController.create)
bookRouter.put('/:ISBN', validateToken, validateRolToken(['Administrador']), bookController.update)
bookRouter.delete('/:ISBN', validateToken, validateRolToken(['Administrador']), bookController.remove)
