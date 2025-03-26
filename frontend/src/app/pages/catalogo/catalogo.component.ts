import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  selectedOption: string = 'libro';
  showBookForm = false
  showAuthorForm = false
  userType = localStorage.getItem('type')

  books: any = []
  authors: any = []

  constructor(private _bookService: BookService, private _authorService: AuthorService) {
    this.getbooks()
    this.getauthors()
  }

  search() {
  }
  getbooks() {
    this._bookService.findAll().subscribe(data => { this.books = data })
  }

  getauthors() {
    this._authorService.findAll().subscribe(data => { this.authors = data })
  }
  logOut() {
    localStorage.clear()
  }
}
