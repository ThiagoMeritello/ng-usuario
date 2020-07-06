import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioResolve implements Resolve<Usuario> {
    
    constructor(private usuarioService: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.usuarioService.obterPorId(route.params['id']);
    }
}