import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { loginGuard } from './guards/login.guard';
import { UserComponent } from './pages/user/user.component';

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
    path: 'usuario',
    component: UserComponent,
    title: 'Usuario',
    canActivate: [loginGuard]
}, {
    path: '**',
    redirectTo: 'catalogo',
    pathMatch: 'full'
}];
