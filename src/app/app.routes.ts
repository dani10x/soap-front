import { Routes } from '@angular/router';
import { ListaParqueaderosComponent } from './features/pages/lista-parqueaderos/lista-parqueaderos.component';

export const routes: Routes = [
  {
    path: 'parqueaderos',
    component: ListaParqueaderosComponent
  },
  {
    path: '',
    redirectTo: '/parqueaderos',
    pathMatch: 'full'
  }
];
