import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

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

  logOut() {
    localStorage.clear()
  }
}
