import { Author } from '../models/author.model.js'
import { Book } from '../models/book.model.js'

export class AuthorController {
  async create (req, res) {
    try {
      const { cedula, fullName, nationality } = req.body
      const author = await Author.create({ cedula, fullName, nationality })
      return res.status(201).json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findAll (req, res) {
    try {
      const author = await Author.findAll({ include: { model: Book, attributes: ['ISBN', 'title', 'editorial', 'genre', 'year'] } })
      return res.status(200).json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findOne (req, res) {
    try {
      const { cedula } = req.params
      const author = await Author.findOne({
        where: { cedula },
        include: { model: Book, attributes: ['ISBN', 'title', 'editorial', 'genre', 'year'] }
      })
      if (!author) {
        return res.status(404).json({ error: 'Author not found' })
      }
      return res.status(200).json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update (req, res) {
    try {
      const { cedula } = req.params
      const author = await Author.findOne({ where: { cedula } })
      if (!author) {
        return res.status(404).json({ error: 'Author not found' })
      }
      author.set(req.body)
      await author.save()
      return res.status(200).json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async remove (req, res) {
    try {
      const { cedula } = req.params
      const author = await Author.findOne({ where: { cedula } })
      if (!author) {
        return res.status(404).json({ error: 'Author not found' })
      }
      await author.destroy()
      res.status(200).json({ message: 'Author deleted' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
