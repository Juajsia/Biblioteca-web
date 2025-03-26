import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.model.js'

export class UserController {
  async create (req, res) {
    try {
      const { userName, password, type } = req.body
      const cryptedPassword = await bcrypt.hash(password, 12)
      const user = await User.create({ userName, password: cryptedPassword, type })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findAll (req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } })
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findOne (req, res) {
    try {
      const { userName } = req.params
      const user = await User.findOne({ where: { userName }, attributes: { exclude: ['password'] } })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const { userName, password, type } = req.body
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      const cryptedPassword = await bcrypt.hash(password, 12)
      user.password = cryptedPassword
      user.type = type
      user.userName = userName
      await user.save()
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async remove (req, res) {
    try {
      const { id } = req.params
      const user = await User.findOne({ where: { id } })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      await User.destroy({ where: { id: user.id } })
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  login = async (req, res) => {
    try {
      const { userName, password } = req.body
      const user = await User.findOne({ where: { userName } })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'incorrect Password' })
      }

      const token = jwt.sign({ userName: user.userName, type: user.type }, 'mi_llave_secreta_super_segura')

      return res.status(200).json({ token, message: 'Login Successfully' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
