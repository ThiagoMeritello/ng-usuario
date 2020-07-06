import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ListarComponent } from './listar/listar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EditarComponent } from './editar/editar.component';
import { UsuarioResolve } from './services/usuario.resolve';

const usuarioRouterConfig: Routes = [
    { path: '', component: ListarComponent },
    { path: 'listar', component: ListarComponent },
    { path: 'adicionar', component: AdicionarComponent },
    { 
        path: 'editar/:id', component: EditarComponent,
        resolve: {
            usuario: UsuarioResolve
        } 
    },
    { 
        path: 'excluir/:id', component: ExcluirComponent,
        resolve: {
            usuario: UsuarioResolve
        } 
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(usuarioRouterConfig)
    ],
    exports:[RouterModule]
})

export class UsuarioRoutingModule { }