import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProcedComponent } from './proced/proced.component';
import { VerificaComponent } from './verifica/verifica.component';
import { VerificaService } from './verifica/verifica.service';
import { ProcedService } from './proced/proced.service';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VerificaComponent,
    ProcedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [ProcedService, VerificaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
