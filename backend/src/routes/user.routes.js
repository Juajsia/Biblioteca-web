import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { validateToken, validateRolToken } from '../middlewares/validateToken.middleware.js'

const userController = new UserController()
export const userRouter = Router()

userRouter.get('/', validateToken, validateRolToken(['Administrador']), userController.findAll)
userRouter.get('/:userName', validateToken, validateRolToken(['Administrador']), userController.findOne)
userRouter.post('/', validateToken, validateRolToken(['Administrador']), userController.create)
userRouter.put('/:id', validateToken, validateRolToken(['Administrador']), userController.update)
userRouter.delete('/:id', validateToken, validateRolToken(['Administrador']), userController.remove)

userRouter.post('/login', userController.login)
