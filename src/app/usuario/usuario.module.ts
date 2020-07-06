import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioRoutingModule } from './usuario.route';

import { AdicionarComponent } from './adicionar/adicionar.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListarComponent } from './listar/listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { UsuarioResolve } from './services/usuario.resolve';


@NgModule({
  declarations: [
    AdicionarComponent, 
    EditarComponent, 
    ExcluirComponent, 
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    UsuarioService,
    UsuarioResolve
  ]
})
export class UsuarioModule { }
