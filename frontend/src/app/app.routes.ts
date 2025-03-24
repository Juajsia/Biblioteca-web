import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: 'Home'
},
{
    path: 'catalogo',
    component: CatalogoComponent,
    title: 'catalogo',
    canActivate: [loginGuard]
}, {
    path: '**',
    redirectTo: 'catalogo',
    pathMatch: 'full'
}];
