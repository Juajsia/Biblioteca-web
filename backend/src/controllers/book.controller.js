import { Author } from '../models/author.model.js'
import { Book } from '../models/book.model.js'

export class BookController {
  async create (req, res) {
    try {
      const { ISBN, title, editorial, genre, year, authorCedula } = req.body
      const book = await Book.create({ ISBN, title, editorial, genre, year, authorCedula })
      return res.status(201).json(book)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findAll (req, res) {
    try {
      const author = await Book.findAll({
        include: {
          model: Author,
          attributes: ['cedula', 'fullName', 'nationality']
        }
      })
      return res.status(200).json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findOne (req, res) {
    try {
      const { ISBN } = req.params
      const
        book = await Book.findOne({
          where: { ISBN },
          include: {
            model: Author,
            attributes: ['cedula', 'fullName', 'nationality']
          }
        })
      if (!book) {
        return res.status(404).json({ error: 'book not found' })
      }
      return res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update (req, res) {
    try {
      const { ISBN } = req.params
      const book = await Book.findOne({ where: { ISBN } })
      if (!book) {
        return res.status(404).json({ error: 'book not found' })
      }
      book.set(req.body)
      await book.save()
      return res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async remove (req, res) {
    try {
      const { ISBN } = req.params
      const book = await Book.findOne({ where: { ISBN } })
      if (!book) {
        return res.status(404).json({ error: 'book not found' })
      }
      await book.destroy()
      res.status(200).json({ message: 'book deleted' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
