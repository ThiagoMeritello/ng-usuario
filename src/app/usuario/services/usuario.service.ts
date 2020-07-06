import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import { Usuario } from '../models/usuario';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class UsuarioService extends BaseService {


    escolaridades: any = [
        { id: 1, descricao: 'Infantil' },
        { id: 2, descricao: 'Fundamental' },
        { id: 3, descricao: 'Médio' },
        { id: 4, descricao: 'Superior' }
    ]

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.UrlService + "usuarios", this.ObterHeaderJson())
                .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string) : Observable<Usuario> {
        return this.http.get<Usuario>(this.UrlService + "usuarios/" + id, this.ObterHeaderJson())
                .pipe(catchError(super.serviceError));
    }

    adicionar(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.UrlService + "usuarios", usuario, this.ObterHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
    }

    atualizar(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(this.UrlService + "usuarios/" + usuario.id, usuario, this.ObterHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
    }

    deletar(id: string): Observable<Usuario> {
        return this.http.delete<Usuario>(this.UrlService + "usuarios/" + id, this.ObterHeaderJson())
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError));
    }

    obterEscolaridades(): any[] {
        return this.escolaridades;
        //return this.http.get<Escolaridade[]>(this.UrlService + "usuarios", this.ObterHeaderJson());
    }
}