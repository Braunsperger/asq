import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedComponent } from './proced/proced.component';
import { VerificaComponent } from './verifica/verifica.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/verifica', pathMatch: 'full' },
  { path: 'proced', component: ProcedComponent },
  { path: 'verifica', component: VerificaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
